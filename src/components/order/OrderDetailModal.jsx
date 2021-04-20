import React, { useState } from 'react'
import { Button } from 'antd'
import Modal from 'antd/es/modal'
import OrderPage from './OrderPage'
import { withRouter } from 'react-router-dom'


const OrderDetailModal = ({ orderId }) => {

  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  return (
    <>
      <Button type='primary' size='large' onClick={showModal}>
        Подробнее
      </Button>

      <Modal
        title='Подробно о заказе'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText='Отменить'
        onCancel={handleCancel}
        centered
        width={1200}
      >
        <OrderPage orderId={orderId} />
      </Modal>
    </>
  )
}

export default withRouter(OrderDetailModal)
