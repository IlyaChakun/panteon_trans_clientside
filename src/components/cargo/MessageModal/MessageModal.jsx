import React, { Component, useState } from 'react'
import { Button, Form, Input, Modal, notification, Rate } from 'antd'
import ChatService from '../../../service/ChatService'

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
}

const MessageModal = ({ cargoOwnerId, title, currentUser }) => {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmit = () => {
    if (cargoOwnerId) {
      ChatService.getUserName(cargoOwnerId).then((response) => {
        console.log({ title: title, userCreator: currentUser, userCompanion: response })
        ChatService.createDialog({ title: title, userCreator: currentUser, userCompanion: response, message: text }).then(() => {
          console.log('Super!')
        })
      })
    }
  }

  return (
    <div>
      <Button
        type='primary'
        onClick={showModal}
      >
        Написать сообщение
      </Button>
      <Modal
        title='Написать сообщение'
        visible={visible}
        cancelText='Отменить'
        okText={'Отправить'}
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
                message: 'Введите текст'
              }
            ]}
          >
            <Input
              name='message'
              autoComplete='off'
              placeholder={'Ваше сообщение'}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )
}

export default MessageModal