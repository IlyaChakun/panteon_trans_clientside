import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import ProductForm from './ProductForm.jsx'

import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined'

import { useDispatch, useSelector } from 'react-redux'
import { productSelector, updateProduct } from '../../redux/reducers/ProductsSliceReducer'
import { SUCCESS } from '../../constants'

const EditProductModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const { products } = useSelector(productSelector)
  const product = products.find(x => x.id === props.productId)

  // console.log('json: ' + JSON.stringify(product))
  // console.log('product.value.id: ' + product.id)
  // console.log('product.value.title: ' + product.title)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  const handleSubmitButton = (updateProductRequest) => {
    console.log('update product request: ', updateProductRequest)
    dispatch(updateProduct(updateProductRequest.id, updateProductRequest))
    props.updateList()
    handleCancel()
  }

  //className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}
  return (
    <div>
      <span>
        <SettingOutlined style={{ fontSize: '25px' }} onClick={showModal} />
      </span>

      <Modal
        title='Изменить продукт'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText='Отменить'
        onCancel={handleCancel}
        centered
        width={1200}
      >
        <ProductForm
          product={product}
          action={'Изменить'}
          validateStatus={SUCCESS}
          shopId={props.shopId}
          handleSubmitButton={handleSubmitButton}
        />
      </Modal>
    </div>
  )
}

export default withRouter(EditProductModal)
