import React, { useState } from 'react'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { notification, Popconfirm } from 'antd'

import ProductCard from '../product/ProductCard'
import { localizedStrings } from '../util/localization'
import { useSelector } from 'react-redux'
import { productSelector } from '../../redux/reducers/ProductsSliceReducer'


const CartProduct = ({ cartProduct, updateProductQuantity, deleteProductFromBasket, history }) => {

  const { products } = useSelector(productSelector)
  const [quantity, setQuantity] = useState(cartProduct.quantity)

  const onQuantityChange = (quantityValue) => {
    if (quantityValue >= 1 && quantityValue <= 99) {
      if (Number(quantityValue) !== 0) {
        const productId = cartProduct.productId
        const productLengthCostId = cartProduct.productLengthCostId

        updateProductQuantity(productLengthCostId, quantityValue, productId)
      }
      setQuantity(quantityValue)
    } else {
      setQuantity(cartProduct.quantity)
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Количество должно быть не менее 0 и не более 99'
      })
    }
  }

  const onDeleteConfirm = () => {
    console.log('want to delete productId=',cartProduct.productId)
    deleteProductFromBasket(cartProduct.productId, cartProduct.productLengthCostId)
  }

  const deleteAction = (
    <div>
      <Popconfirm
        title='Вы уверены, что хотите удалить продукт из корзины?'
        onConfirm={onDeleteConfirm}
        okText='Да'
        cancelText='Нет'>
        <DeleteOutlined style={{ fontSize: '25px' }} />
      </Popconfirm>
    </div>
  )

  const getProduct = products.find(x => x.id === cartProduct.productId)


  return (
    <ProductCard
      history={history}
      key={cartProduct.productId}
      product={getProduct}
      quantity={quantity}
      onQuantityChange={onQuantityChange}
      secondAction={deleteAction}
      lengthId={cartProduct.productLengthCostId}
    />
  )

}

export default CartProduct
