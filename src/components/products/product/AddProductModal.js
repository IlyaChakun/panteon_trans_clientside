import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import ProductForm from './ProductForm.jsx'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../../../redux/reducers/ProductsSliceReducer'

const AddProductModal = (props) => {

  const [product, setProduct] = useState({
    id: '',
    dateOfLastUpdate: '',
    flowerType: '',
    flowerColor: '',
    flowerLengthCosts: [],
    flowerSort: '',
    country: '',
    description: '',
    availableAmountOnStock: '',
    image: null
  })


  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    console.log(e)
    setVisible(false)
  }


  const handleSubmitButton = (productRequest) => {

    console.log('product request: ' + { ...productRequest })

    dispatch(saveProduct(productRequest))
        props.updateList()
        handleCancel()


    // saveProductRequest(productRequest)
    //   .then(() => {
    //     notification.success({
    //       message: localizedStrings.alertAppName,
    //       description: 'Продукт сохранен!'
    //     })
    //
    //     props.updateList()
    //
    //     handleCancel()
    //
    //   }).catch(error => {
    //   notification.error({
    //     message: localizedStrings.alertAppName,
    //     description: 'Чет пошло не так. сорян'
    //   })
    // })
  }

  return (
    <div className='pt-3 float-right'>
      <Button type='primary'
              style={{ background: 'black', color: 'white' }}
              shape='round'
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
