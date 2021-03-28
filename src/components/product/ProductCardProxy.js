import React, { useState } from 'react'

import { isAdmin } from '../../app/App'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/AuthSliceReducer'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import ProductCard from './ProductCard'
import { addToCart } from '../../redux/reducers/CartsSliceReducer'


const ProductCardProxy = ({ product, history, updateList }) => {

  const dispatch = useDispatch()
  const { currentUser } = useSelector(authSelector)
  const [quantity, setQuantity] = useState(1)
  const [lengthId, setLengthId] = useState(product.productLengthCost[0].id)

  const onQuantityChange = (value) => {
    setQuantity(value)
  }

  const onProductLengthChange = (value) => {
    setLengthId(value)
  }

  const addToBasket = () => {
    const productToCart = {
      'clientId': currentUser.id,
      'productId': product.id,
      'productLengthCostId': product.productLengthCost.find(x => x.id === lengthId).id,
      'quantity': quantity
    }
    console.log('productToCart', productToCart)
    dispatch(addToCart(productToCart))
  }

  const editAction = (
    <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
      <EditProductModal
        productId={product.id}
        updateList={updateList}
      />
    </div>
  )

  const deleteAction = (
    <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
      <DeleteProductModal
        productId={product.id}
        button={
          <DeleteOutlined style={{ fontSize: '25px' }} />
        } />
    </div>
  )

  const buyAction = (
    <Button className={isAdmin(currentUser) ? 'custom-hidden' : 'one-click-buy cart-buy'}
            style={{ color: 'white' }}
            onClick={() => addToBasket()}
    >
      Добавить в корзину
    </Button>
  )

  const oneClickAction = (
    <Button className={isAdmin(currentUser) ? 'custom-hidden' : 'one-click-buy'}
            onClick={() => {
              addToBasket()
              history.push('/cart')
            }}
    >
      Купить в один клик
    </Button>
  )

  return (
    <ProductCard
      key={product.id}
      product={product}
      quantity={quantity}
      onQuantityChange={onQuantityChange}
      onProductLengthChange={onProductLengthChange}
      firstAction={editAction}
      secondAction={deleteAction}
      thirdAction={buyAction}
      oneClickAction={oneClickAction}
      lengthId={lengthId}
    />
  )

}

export default ProductCardProxy
