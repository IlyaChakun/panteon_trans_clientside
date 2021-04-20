import React, { useState } from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import ClientPage from './ClientPage'

const ClientDetailModal = (props) => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  return (
    <div>
      <Button type='primary' size='large' onClick={showModal}>
        Подробнее
      </Button>

      <Modal
        title='Подробно о заказах'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >
        <ClientPage
          userId={props.userId}
          userType={props.userType}
          currentUser={props.currentUser}
        />
      </Modal>
    </div>
  )
}

export default withRouter(ClientDetailModal)
