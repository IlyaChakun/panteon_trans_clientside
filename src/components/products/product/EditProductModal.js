import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import ProductForm from './ProductForm.jsx'

import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined'

import { useDispatch, useSelector } from 'react-redux'
import {
  productSelector, updateProduct

} from '../../../redux/reducers/ProductsSliceReducer'

const EditProductModal = (props) => {
  const dispatch = useDispatch()

  const {
    products
  } = useSelector(productSelector)

  const [product, setProduct] = useState({
    id: props.productId,
    value: products.payload.find(x => x.id === props.productId)
  })

  console.log('json: ' + JSON.stringify(product))
  console.log('product.value.id: ' + product.value.id)
  console.log('product.value.title: ' + product.value.title)

  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  const handleSubmitButton = (productRequest) => {
    console.log('product request: ' + { ...productRequest })

    dispatch(updateProduct(productRequest.id, productRequest))
    props.updateList()
    handleCancel()
  }

  //className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}
  return (
    <div>
      <span>
        <SettingOutlined style={{ fontSize: '25px' }} onClick={showModal}/>
      </span>

      <Modal
        title="Изменить продукт"
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >
        <ProductForm
          product={product.value}
          action={'Изменить'}
          validateStatus={''}
          shopId={props.shopId}
          handleSubmitButton={handleSubmitButton}
        />
      </Modal>
    </div>
  )
}

export default withRouter(EditProductModal)
