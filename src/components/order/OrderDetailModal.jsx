import React, { useState } from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import OrderPage from './OrderPage'


const OrderDetailModal = (props) => {

  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  return (
    <div>
      <Button type='primary' size='large' onClick={showModal}>
        Подробнее
      </Button>

      <Modal
        title='Подробно о заказе'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >
        <OrderPage
          orderId={props.orderId}
        />
      </Modal>
    </div>
  )
}

export default withRouter(OrderDetailModal)
