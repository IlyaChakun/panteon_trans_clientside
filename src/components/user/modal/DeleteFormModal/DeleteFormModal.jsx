import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, notification } from 'antd'
import { addCargo, deleteCargo } from '../../../../redux/actions/cargo'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTransport } from '../../../../redux/actions/transport'

const DeleteFormModal = ({isCargo, isTransport, cargo, transport, style}) => {
  const dispatch = useDispatch()

  const [isLoading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmit = () => {
    if (isCargo) {
      setLoading(true)
      dispatch(deleteCargo(cargo.id)).then((data) => {
        console.log('data: ', data)
        setVisible(false)
      })
    }
    else {
      dispatch(deleteTransport(transport.id)).then((data) => {
        console.log('transport: ', data)
        setVisible(false)
      })
    }
  }

  return (
    <React.Fragment>
      <Button
        onClick={showModal}
        style={style}
        danger
      >
        {'Удалить'}
      </Button>
      <Modal
        title={isCargo ? 'Удалить груз' : 'Удалить транспорт'}
        visible={visible}
        cancelText='Отменить'
        okText={'Удалить'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        okButtonProps={{ danger: true }}
      >
        <Row>
          <p>Вы уверены, что хотите удалить {isCargo ? 'груз' : 'транспорт'}?</p>
        </Row>
      </Modal>
    </React.Fragment>

  )
}

export default DeleteFormModal