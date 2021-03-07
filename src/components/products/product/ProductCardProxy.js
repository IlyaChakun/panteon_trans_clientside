import React from 'react'

import { isAdmin } from '../../../app/App'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../../redux/reducers/AuthSliceReducer'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import ProductCard from './ProductCard'
import { addToCart } from '../../../redux/reducers/CartsSliceReducer'


const ProductCardProxy = ({ product, history }) => {

  const dispatch = useDispatch()
  const { currentUser } = useSelector(authSelector)

  const addToBasket = (productState) => {
    const productToCart = {
      'clientId': currentUser.payload.id,
      'productId': product.id,
      'productLengthCostId': product.productLengthCost.find(x => x.id === productState.lengthId).id,
      'quantity': productState.amount
    }
    console.log('currentUser',currentUser)
    console.log('product',product)
    console.log('productToCart',productToCart)
    console.log('productState',productState )
    dispatch(addToCart(productToCart))
  }


  const editAction = (
    <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
      <EditProductModal
        productId={product.id}
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
    </div>)

  const buyAction = (productState) => (
    <Button className={isAdmin(currentUser) ? 'custom-hidden' : 'one-click-buy cart-buy'}
            style={{ color: 'white' }}
            onClick={() => {
              console.log('buyAction', productState)
              addToBasket(productState)
            }}
    >
      Добавить в корзину
    </Button>
  )

  const oneClickAction = (productState) => (
    <Button className={isAdmin(currentUser) ? 'custom-hidden' : 'one-click-buy'}
            onClick={() => {
              console.log('oneClickAction', productState)
              addToBasket(productState)
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
      editAction={editAction}
      deleteAction={deleteAction}
      buyAction={buyAction}
      oneClickAction={oneClickAction}
    />
  )

}

export default ProductCardProxy
