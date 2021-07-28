import React, { Component, useState } from 'react'
import { Button, Form, Input, Modal, notification, Rate } from 'antd'
import { localizedStrings } from '../../../../util/localization'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined'
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined'
import MessageOutlined from '@ant-design/icons/lib/icons/MessageOutlined'
import {
  validateEmail,
  validatePhoneNumber,
  validateText,
  validateUserName
} from '../../../../validation/validation'


const layout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
}

const AddReviewModal = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState('')
  const [visible, setVisible] = useState('')

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleInputChange = (event, validationFun) => {

  }

  const handleSubmit = () => {
    const reviewRequest = {
      name,
      email,
      phoneNumber,
      text,
      rating
    }
  }

    return (
      <div>
        <Button
          type='primary'
          onClick={showModal}
        >
          Оставить отзыв
        </Button>

        <Modal
          title='Оставить отзыв'
          visible={visible}
          cancelText='Отменить'
          onCancel={handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
        >

          <Form
            {...layout}
            onFinish={handleSubmit}
          >
            <Form.Item
              label={localizedStrings.name}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите имя!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                name='name'
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item
              label={'Телефон'}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите телефон!'
                }
              ]}
            >

              <Input
                prefix={<PhoneOutlined />}
                name='phoneNumber'
                autoComplete='off'
                placeholder={'Телефон'}
              />
            </Form.Item>
            <Form.Item
              label={localizedStrings.email}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите мыло!'
                }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                name='email'
                type='email'
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item
              label={'Ваша оценка'}
            >
              <Rate
                name='rating'
              />
            </Form.Item>
            <Form.Item
              label={'Текст отзыва:'}
            >
              <Input.TextArea
                prefix={<MessageOutlined />}
                name='text'
                type='text'
                autoComplete='off'
                placeholder={'Текст отзыва'}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите текст отзыва!'
                  }
                ]}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    )
  }

export default AddReviewModal


