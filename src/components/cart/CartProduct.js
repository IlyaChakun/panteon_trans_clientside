import React, { useState } from 'react'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { InputNumber, notification, Popconfirm } from 'antd'

import ProductCard from '../product/ProductCard'
import { localizedStrings } from '../util/localization'
import { useSelector } from 'react-redux'
import { productSelector } from '../../redux/reducers/ProductsSliceReducer'


const CartProduct = (props) => {

  const { products } = useSelector(productSelector)

  const [quantity, setQuantity] = useState(props.productWithQuantity.quantity)

  const confirm = () => {
    props.deleteProductFromBasket(props.productWithQuantity.product.id)
  }

  const updateProductCount = (quantity) => {
    if (quantity >= 1 && quantity < 99) {
      if (Number(quantity) !== 0) {
        const productId = props.productWithQuantity.product.id
        const productLengthCostId = props.productWithQuantity.productLengthCost.id

        props.updateProductQuantity(productLengthCostId, quantity, productId)
      }
      setQuantity(quantity)
    } else {
      setQuantity(props.productWithQuantity.quantity)
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Количество должно быть не менее 0 и не более 99'
      })
    }
  }

  const customFormatter = (value) => {
    return value < 1 || value > 99 ? quantity : value
  }

  const deleteAction = (
    <div>
      <Popconfirm
        title='Вы уверены, что хотите удалить продукт из корзины?'
        onConfirm={confirm}
        okText='Да'
        cancelText='Нет'>
        <DeleteOutlined style={{ fontSize: '25px' }} />
      </Popconfirm>
    </div>
  )

  const getProduct = () => {
    return products.find(x => x.id === props.productWithQuantity.productId)
  }

  const countAction = (
    <div>
      <InputNumber
        key={'quantityPicker'}
        defaultValue={quantity}
        value={quantity}
        type={'number'}
        min={1}
        max={props.productWithQuantity.product.availableAmount}
        formatter={customFormatter}
        onChange={updateProductCount}
      />

      <span className='quantity-cost-text'>
        Стоимость:
        {Number(props.productWithQuantity.quantity *
          getProduct().productLengthCost
            .find(x => x.id === props.productWithQuantity.productLengthCostId)
            .price)
        }
      </span>
    </div>
  )

  return (
    <ProductCard
      history={props.history}
      key={props.productWithQuantity.productId}
      product={getProduct()}
      secondAction={deleteAction}
      thirdAction={countAction}
    />
  )

}

export default CartProduct
