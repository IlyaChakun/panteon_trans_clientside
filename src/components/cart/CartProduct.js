import React, { useState } from 'react'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { Button, notification, Popconfirm } from 'antd'

import ProductCard from '../product/ProductCard'
import { localizedStrings } from '../util/localization'
import { useSelector } from 'react-redux'
import { productSelector } from '../../redux/reducers/ProductsSliceReducer'


const CartProduct = (props) => {

  const { products } = useSelector(productSelector)
  const [quantity, setQuantity] = useState(props.cartProduct.quantity)

  const onQuantityChange = (quantityValue) => {
    if (quantityValue >= 1 && quantityValue <= 99) {
      if (Number(quantityValue) !== 0) {
        const productId = props.cartProduct.productId
        const productLengthCostId = props.cartProduct.productLengthCostId

        props.updateProductQuantity(productLengthCostId, quantityValue, productId)
      }
      setQuantity(quantityValue)
    } else {
      setQuantity(props.cartProduct.quantity)
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Количество должно быть не менее 0 и не более 99'
      })
    }
  }

  const deleteAction = (
    <div>
      <Popconfirm
        title='Вы уверены, что хотите удалить продукт из корзины?'
        onConfirm={props.deleteProductFromBasket(props.cartProduct.productId)}
        okText='Да'
        cancelText='Нет'>
        <DeleteOutlined style={{ fontSize: '25px' }} />
      </Popconfirm>
    </div>
  )

  const getProduct = () => {
    return products.find(x => x.id === props.cartProduct.productId)
  }

  return (
    <ProductCard
      history={props.history}
      key={props.cartProduct.productId}
      product={getProduct()}
      quantity={quantity}
      onQuantityChange={onQuantityChange}
      secondAction={deleteAction}
      lengthId={props.cartProduct.productLengthCostId}
    />
  )

}

export default CartProduct
