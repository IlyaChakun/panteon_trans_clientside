import React from 'react'

import './ProductCard.css'
import { isAdmin } from '../../../app/App'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import { addProductToBasketRequest } from '../../util/utilsAPI'
import { Button, notification, Row } from 'antd'
import { localizedStrings } from '../../util/localization'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../redux/reducers/AuthSliceReducer'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import ProductCard from './ProductCard'


const ProductCardProxy = ({ product, productId, history }) => {

  const { currentUser } = useSelector(authSelector)

  const addToBasket = () => {
    const productBasket = {
      'userId': currentUser.id,
      // 'userId': 1,
      'flowerLengthCostId': product.productLengthCost[0].id,
      'productId': product.id,
      'quantity': 1
    }

    console.log(productBasket)

    addProductToBasketRequest(productBasket)
      .then(() => {
        notification.success({
          message: localizedStrings.alertAppName,
          description: 'Продукт добавлен в корзину!'
        })
      }).catch(error => {

      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось добавить продукт в корзину!'
      })
    })
  }


  const editAction = (
    <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
      <EditProductModal
        productId={productId}
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
      key={productId}
      product={product}
      editAction={editAction}
      deleteAction={deleteAction}
      buyAction={buyAction}
      oneClickAction={oneClickAction}
    />
  )

}

export default ProductCardProxy
