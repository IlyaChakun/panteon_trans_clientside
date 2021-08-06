import React, { Component, useState } from 'react'
import { Button, Form, Input, Modal, notification, Rate } from 'antd'
import { useDispatch } from 'react-redux'
import { updateTransport } from '../../../../redux/actions/transport'
import { updateCargo } from '../../../../redux/actions/cargo'

const layout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
}

const ChangeDataModal = ({ isTransport, isCargo, id, carryingCapacity, volume, length, height, addressFrom, addressTo }) => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const createPatchObject = () => {
    let path = ''
    if (isTransport) {
      if (carryingCapacity) {
        path = '/truckDimensions/carryingCapacity'
      }
      if (volume) {
        path = '/truckDimensions/volume'
      }
      if (length) {
        path = '/truckDimensions/length'
      }
      if (height) {
        path = '/truckDimensions/height'
      }
      if (addressFrom) {
        path = '/loadingPayload/address/address'
      }
      if (addressTo) {
        path = '/loadingPayload/address/address'
      }
    }

    return {
      patch: [
        {
          op: "replace",
          path: path,
          value: value
        }
      ]
    }
  }

  const handleSubmit = () => {
    if (value) {
      setLoading(true)
      if (isTransport) {
        dispatch(updateTransport(id, createPatchObject()))
          .then(data => {
            setLoading(false)
            setVisible(false)
            console.log('patch: ' + id, data)
          })
          .catch(error => {
            setLoading(false)
            setVisible(false)
            console.log('err patch: ', error)
          })
      }
      else if (isCargo) {
        dispatch(updateCargo(id, createPatchObject()))
          .then(data => {
            setLoading(false)
            setVisible(false)
            console.log('patch: ' + id, data)
          })
          .catch(error => {
            setLoading(false)
            notification.error({
              message: 'Не удалось обновить груз',
              description: 'При обновлении груза возникла ошибка'
            })
            console.log('err patch: ', error)
          })
      }
    }
  }

  return (
    <div>
      <Button
        type='primary'
        onClick={showModal}
      >
        Изменить
      </Button>
      <Modal
        title={'Изменение данных'}
        visible={visible}
        cancelText='Отменить'
        okText={'Применить'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Form
          {...layout}
        >
          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Введите новые данные'
              }
            ]}
          >
            <Input
              name={'data'}
              autoComplete='off'
              placeholder={'Новые данные'}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )
}

export default ChangeDataModal