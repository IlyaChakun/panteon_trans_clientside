import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import ProductForm from './ProductForm.jsx'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../../redux/reducers/ProductsSliceReducer'

const AddProductModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const product = {
    id: '',
    dateOfLastUpdate: '',
    flowerType: '',
    flowerLengthCosts: [],
    country: '',
    description: '',
    image: null
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmitButton = (productRequest) => {
    console.log('product request: ' + { ...productRequest })
    dispatch(saveProduct(productRequest))
        props.updateList()
        handleCancel()
  }

  return (
    <div className='pt-3 float-right'>
      <Button type='primary'
              size='large'
              onClick={showModal}
      >
        Добавить продукт
      </Button>

      <Modal
        title='Добавить продукт'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >

        <ProductForm
          product={product}
          action={'Добавить'}
          validateStatus={''}
          shopId={props.shopId}
          handleSubmitButton={handleSubmitButton}
        />

      </Modal>
    </div>
  )
}

export default withRouter(AddProductModal)
