import React, { useEffect, useState } from 'react'
import CartProduct from './CartProduct'
import { withRouter } from 'react-router-dom'

import { Button, Col, Form, Input, List, Popconfirm, Radio, Row, Select } from 'antd'
import { validateAddress, validateText } from '../common/validation/ValidationFunctions'
import { SUCCESS } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector, deleteItemFromCart, getCart, updateItemInCart } from '../../redux/reducers/CartsSliceReducer'
import { authSelector } from '../../redux/reducers/AuthSliceReducer'
import { validateEntranceNumber, validateFlourNumber } from './CartValidation'
import { placeOrder } from '../../redux/reducers/OrdersSliceReducer'
import { productSelector } from '../../redux/reducers/ProductsSliceReducer'
import { validateId } from '../product/ProductValidation'
import LoadingIndicator from '../common/util/LoadingIndicator'

const { TextArea } = Input
const { Option, OptGroup } = Select

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

const Cart = (props) => {

  const dispatch = useDispatch()
  const { loading, cart } = useSelector(cartSelector)
  const { currentUser } = useSelector(authSelector)
  const { shops } = useSelector(productSelector)

  const [shop, setShop] = useState({
    id: shops.objects[0].id,
    value: shops.objects.find(x => x.id === shops.objects[0].id),
    validateStatus: props.validateStatus
  })
  const [comment, setComment] = useState({ value: '', validateStatus: '' })
  const [address, setAddress] = useState({ value: '', validateStatus: '' })
  const [floorNumber, setFloorNumber] = useState({ value: '', validateStatus: '' })
  const [entranceNumber, setEntranceNumber] = useState({ value: '', validateStatus: '' })

  const [delivery, setDelivery] = useState(1)


  useEffect(() => {
    dispatch(getCart(currentUser.id))
  }, [dispatch])

  const isFormInvalid = () => {
    return !(
      comment.validateStatus === SUCCESS &&
      address.validateStatus === SUCCESS &&
      floorNumber.validateStatus === SUCCESS &&
      entranceNumber.validateStatus === SUCCESS
    )
  }

  const handleSubmitOrder = () => {

    const orderProducts = []

    cart.cartItems.forEach(cartItem => {
      orderProducts.push({
        'productId': cartItem.id,
        'quantity': cartItem.quantity
      })
    })

    const order = {
      '@type': 'UsualOrder',
      'orderProducts': orderProducts,
      'comment': comment.value,
      'orderDeliveryInfo': {
        'address': address.value,
        'floorNumber': floorNumber.value,
        'entranceNumber': entranceNumber.value,
        'deliveryType': {
          'id': delivery
        }
      }
    }

    dispatch(placeOrder(order))
    props.history.push('/')

    console.log('order request:', order)
  }

  const deleteProductFromCart = (productId) => {
    const productCart = {
      'userId': currentUser.id,
      'productId': productId
    }
    dispatch(deleteItemFromCart(productCart))
  }

  const updateProductQuantity = (productLengthCostId, quantity, productId) => {
    const cartItem = {
      'userId': currentUser.id,
      'productLengthCostId': productLengthCostId,
      'productId': productId,
      'quantity': quantity
    }

    dispatch(updateItemInCart(cartItem))
  }

  const handleTextChange = (event) => {
    const inputValue = event.target.value
    setComment({
      value: inputValue,
      ...validateText(inputValue)
    })
  }

  const handleAddressChange = (event) => {
    const inputValue = event.target.value
    setAddress({
      value: inputValue,
      ...validateAddress(inputValue)
    })
  }

  const handleFlourNumberChange = (event) => {
    const inputValue = event.target.value
    setFloorNumber({
      value: inputValue,
      ...validateFlourNumber(inputValue)
    })
  }

  const handleEntranceNumberChange = (event) => {
    const inputValue = event.target.value

    setEntranceNumber({
      value: inputValue,
      ...validateEntranceNumber(inputValue)
    })
  }


  if (loading) {
    return <LoadingIndicator />
  }

  let cartProducts = []
  console.log('cart', cart)

  cart.cartItems.forEach((cartProduct) => {
    cartProducts.push(
      <CartProduct
        history={props.history}
        key={cartProduct.productId}
        cartProduct={cartProduct}
        deleteProductFromBasket={deleteProductFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    )
  })

  const shopOptions = shops.objects.map(
    element =>
      <Option key={`${element.id}-${element.contacts.address}`} value={element.id}>
        {element.contacts.address}
      </Option>
  )

  const onChangeShopSelect = (input, option) => {
    setShop({
      id: option.value,
      value: option.value,
      ...validateId(option.key)
    })

  }

  const onChangeDelivery = (e) => {
    setDelivery(e.target.value)
  }

  const deliveryOptions = () => {
    if (delivery == 1) {
      return (
        <Form.Item
          label='Пункт самовывоза'
          validateStatus={shop.validateStatus}
          hasFeedback
          help={shop.errorMsg}
        >

          <Select
            name='category'
            value={shop.id}
            showSearch
            style={{ width: 200 }}
            placeholder='Выберите пункт самовывоза'
            onChange={onChangeShopSelect}
          >
            {shopOptions}
          </Select>

        </Form.Item>
      )
    }

    if (delivery == 2) {
      return (
        <>
          <Form.Item
            label={'Комментарий к заказу'}
            validateStatus={comment.validateStatus}
            hasFeedback
            onChange={(event) => handleTextChange(event)}
            help={comment.errorMsg}
          >
            <TextArea
              rows={3}
              name='comment'
              size='middle'
              value={comment.value}>
            </TextArea>
          </Form.Item>

          <Form.Item
            label={'Адрес'}
            validateStatus={address.validateStatus}
            hasFeedback
            onChange={(event) => handleAddressChange(event)}
            help={address.errorMsg}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите адрес!'
              }
            ]}
          >
            <Input
              name='address'
              placeholder={'Адрес'}
              style={{ fontSize: '16px' }}
              autosize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          <Form.Item
            label={'Этаж'}
            validateStatus={floorNumber.validateStatus}
            hasFeedback
            onChange={(event) => handleFlourNumberChange(event)}
            help={floorNumber.errorMsg}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите этаж!'
              }
            ]}
          >
            <Input
              name='floorNumber'
              placeholder={'Этаж'}
              style={{ fontSize: '16px' }}
              autosize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          <Form.Item
            label={'Подъезд'}
            validateStatus={entranceNumber.validateStatus}
            hasFeedback
            onChange={(event) => handleEntranceNumberChange(event)}
            help={entranceNumber.errorMsg}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите подъезд!'
              }
            ]}
          >
            <Input
              name='entranceNumber'
              placeholder={'Подъезд'}
              style={{ fontSize: '16px' }}
              autosize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
        </>
      )
    }
  }

  return (
    <div className='pb-5'>
      <Row justify='center'>
        <Col span={22}>
          <Row justify='start'>
            <Col>
              <h1>Корзина</h1>
            </Col>
          </Row>

          <div className='cart-content mb-5'>
            <List
              loading={loading}
              grid={{
                gutter: 16,
                column: 3
              }}
              dataSource={cartProducts}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </div>

          <div className='cart-container-footer'>
            <Form {...layout}
                  onFinish={handleSubmitOrder}>

              <Form.Item
                label='Тип доставки'
              >
                <Radio.Group onChange={onChangeDelivery} value={delivery}>
                  <Radio value={1}>Самовывоз</Radio>
                  <Radio value={2}>Доставка курьером</Radio>
                </Radio.Group>
              </Form.Item>

              {deliveryOptions()}

              <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                             <span className='quantity-cost-text'>
                                Общая сумма: {cart.totalPrice} руб. за {cart.totalElements} товар(ов)
                            </span>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 8, offset: 8 }}>

                <div className='buttons-position'>
                  <Popconfirm
                    title='Вы уверены, что хотите сделать заказ?'
                    onConfirm={handleSubmitOrder}
                    okText='Да'
                    cancelText='Нет'>
                    <Button type='primary'
                            htmlType='submit'
                            size='large'
                            disabled={!isFormInvalid}
                    >
                      Оформить заказ
                    </Button>
                  </Popconfirm>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}


export default withRouter(Cart)
