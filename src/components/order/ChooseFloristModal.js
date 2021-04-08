import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../../redux/reducers/ProductsSliceReducer'

const AddFloristToOrderModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)


  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmitButton = (request) => {
    console.log('choose florist request: ' + { ...request })
    dispatch(saveProduct(request))
    props.updateList()
    handleCancel()
  }

  return (
    <>
      <Button type='primary'
              size='large'
              onClick={showModal}
      >
        Выбрать флориста
      </Button>

      <Modal
        title='Выбрать флориста'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >

        тут красиво список флористов

      </Modal>

    </>
  )
}

export default withRouter(AddFloristToOrderModal)
