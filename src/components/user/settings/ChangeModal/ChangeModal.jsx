import React, { Component, useState } from 'react'
import { Button, Form, Input, Modal, notification, Rate } from 'antd'

const layout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
}

const ChangeModal = ({ isEmail, isPassword }) => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmit = () => {}

  return (
    <div>
      <Button
        type='primary'
        onClick={showModal}
      >
        Изменить
      </Button>
      <Modal
        title={'Изменение ' + (isEmail ? 'адреса электронной почты' : 'пароля')}
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
                message: isEmail ? 'Введите новый адрес' : 'Введите новый пароль'
              }
            ]}
          >
            <Input
              name={isEmail ? 'email' : 'password'}
              autoComplete='off'
              placeholder={isEmail ? 'Новый адрес электронной почты' : 'Новый пароль'}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )
}

export default ChangeModal