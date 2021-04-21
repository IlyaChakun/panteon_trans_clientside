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
import { placeBuyNowOrder, placeOrder } from '../../redux/reducers/OrdersSliceReducer'
import { validateId } from '../product/ProductValidation'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { fetchShops, shopSelector } from '../../redux/reducers/ShopsSliceReducer'
import s from '../user/signup/SignUp.module.css'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined'
import { localizedStrings } from '../util/localization'
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined'

const { TextArea } = Input
const { Option } = Select

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
  const { shops } = useSelector(shopSelector)

  const [shop, setShop] = useState({
    // id: shops[0].id,
    // value: shops.find(x => x.id === shops[0].id),
    // validateStatus: props.validateStatus
  })

  const [comment, setComment] = useState({ value: '', validateStatus: '' })
  const [address, setAddress] = useState({ value: '', validateStatus: '' })
  const [floorNumber, setFloorNumber] = useState({ value: '', validateStatus: '' })
  const [entranceNumber, setEntranceNumber] = useState({ value: '', validateStatus: '' })

  const [delivery, setDelivery] = useState(1)

  const [name, setName] = useState({ value: '', validateStatus: '' })
  const [email, setEmail] = useState({ value: '', validateStatus: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: '', validateStatus: '' })

  useEffect(() => {
    dispatch(fetchShops())
    dispatch(getCart(
      localStorage.getItem('temporaryClientId') !==null  ? localStorage.getItem('temporaryClientId')
        : currentUser.id))
  }, [dispatch])

  if (cart === null) {
    return (
      <>
        Ваша корзина пуста, сначала добавьте продукты в корзину!
      </>
    )
  }

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
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        productLengthCostId: cartItem.productLengthCostId
      })
    })

    if (localStorage.getItem('temporaryClientId') !== null) {
      const order = {

        clientId: localStorage.getItem('temporaryClientId'),
        orderProducts: orderProducts,
        comment: comment.value,
        orderPriceInfo: {
          totalAmount: cart.totalPrice
        },
        orderDeliveryInfo: {
          address: address.value,
          floorNumber: floorNumber.value,
          entranceNumber: entranceNumber.value,
          deliveryType: {
            id: delivery
          }
        },

        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value
      }

      console.log('order request:', order)
      console.log('place order with order=', order)
      dispatch(placeBuyNowOrder(order))

      localStorage.removeItem('temporaryClientId')
    } else {
      const order = {
        clientId: currentUser.id,
        orderProducts: orderProducts,
        comment: comment.value,
        orderPriceInfo: {
          totalAmount: cart.totalPrice
        },
        orderDeliveryInfo: {
          address: address.value,
          floorNumber: floorNumber.value,
          entranceNumber: entranceNumber.value,
          deliveryType: {
            id: delivery
          }
        }
      }
      console.log('order request:', order)
      console.log('place order with order=', order)
      dispatch(placeOrder(order))
    }

    props.history.push('/')
  }

  const deleteProductFromCart = (productId, productLengthCostId) => {
    const clientId = localStorage.getItem('temporaryClientId') !== null ? localStorage.getItem('temporaryClientId')
      : currentUser.id

    const productCart = {
      clientId: clientId,
      productId: productId,
      productLengthCostId: productLengthCostId
    }
    dispatch(deleteItemFromCart(productCart))
  }

  const updateProductQuantity = (productLengthCostId, quantity, productId) => {
    const clientId = localStorage.getItem('temporaryClientId') !== null ? localStorage.getItem('temporaryClientId')
      : currentUser.id

    const cartItem = {
      clientId: clientId,
      productLengthCostId: productLengthCostId,
      productId: productId,
      quantity: quantity
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

  const handleNameChange = (event) => {
    const inputValue = event.target.value
    setName({
      value: inputValue,
      ...validateText(inputValue)
    })
  }

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value
    setPhoneNumber({
      value: inputValue,
      ...validateText(inputValue)
    })
  }

  const handleEmailChange = (event) => {
    const inputValue = event.target.value
    setEmail({
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
    return <LoadingIndicator/>
  }

  const cartProducts = []
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

  const shopOptions = shops.map(
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

  const forBuyNow = localStorage.getItem('temporaryClientId') !== null ? (
    <>
      <Form.Item
        className={s.formItem}
        label={'Ваше имя'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите имя!'
          }
        ]}
        onChange={(event) => handleNameChange(event)}
        validateStatus={name.validateStatus}
        help={name.errorMsg}>

        <Input
          prefix={<UserOutlined/>}
          name='name'
          placeholder={'Имя'}
          value={name.value}
          style={{ fontSize: '16px' }}
          autosize={{ minRows: 3, maxRows: 6 }}/>
      </Form.Item>
      <Form.Item
        className={s.formItem}
        label={'Телефон'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите телефон!'
          }
        ]}
        onChange={(event) => handlePhoneNumberChange(event)}
        validateStatus={phoneNumber.validateStatus}
        help={phoneNumber.errorMsg}>

        <Input
          prefix={<PhoneOutlined/>}
          name='phoneNumber'
          autoComplete='off'
          placeholder={'Телефон'}
          value={phoneNumber.value}
        />
      </Form.Item>
      <Form.Item
        className={s.formItem}
        label={'Почта'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите мыло!'
          }
        ]}
        validateStatus={email.validateStatus}
        onChange={(event) => handleEmailChange(event)}
        help={email.errorMsg}>
        <Input
          prefix={<MailOutlined/>}
          name='email'
          type='email'
          autoComplete='off'
          placeholder={localizedStrings.emailField}
          value={email.value}
        />
      </Form.Item>
    </>
  ) : ''

  const deliveryOptions = () => {
    if (delivery === 1) {
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
    if (delivery === 2) {
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
              autosize={{ minRows: 3, maxRows: 6 }}/>
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
              autosize={{ minRows: 3, maxRows: 6 }}/>
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
              autosize={{ minRows: 3, maxRows: 6 }}/>
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

              {forBuyNow}
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
