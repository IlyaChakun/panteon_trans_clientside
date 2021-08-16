import React, { useState } from 'react'
import { Button, Form, Input, Modal, notification, Rate } from 'antd'
import { localizedStrings } from '../../../../util/localization'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined'
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined'
import MessageOutlined from '@ant-design/icons/lib/icons/MessageOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, addCompanyReview } from '../../../../redux/actions/review'

const layout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
}

const AddReviewModal = ({ isCompany, currentUser, id }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState('')
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const createObjectFromState = () => {
    return {
      userId: currentUser.id,
      name,
      phoneNumber,
      email,
      reviewMessage: text,
      rating
    }
  }

  const handleChangeInput = e => {
    switch (e.target.name) {
      case 'name':
        return setName(e.target.value)
      case 'phoneNumber':
        return setPhoneNumber(e.target.value)
      case 'email':
        return setEmail(e.target.value)
      case 'text':
        return setText(e.target.value)
    }
  }

    const handleSubmit = () => {
      if (isCompany) {
        dispatch(addCompanyReview(id, createObjectFromState())).then((data) => {
          console.log('sent company review data: ', data)
        })
          .catch(error => {
            console.log('review err: ', error)
          })
      }
      else {
        dispatch(addReview(createObjectFromState())).then((data) => {
          console.log('sent data: ', data)
        })
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
          okText='Оставить отзыв'
          onOk={handleSubmit}
        >

          <Form
            {...layout}
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
              onChange={handleChangeInput}
            >
              <Input
                prefix={<UserOutlined />}
                name='name'
                autoComplete='off'
                value={name}
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
              onChange={handleChangeInput}
            >

              <Input
                prefix={<PhoneOutlined />}
                name='phoneNumber'
                autoComplete='off'
                placeholder={'Телефон'}
                value={phoneNumber}
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
              onChange={handleChangeInput}
            >
              <Input
                prefix={<MailOutlined />}
                name='email'
                type='email'
                autoComplete='off'
                value={email}
              />
            </Form.Item>
            <Form.Item
              label={'Ваша оценка'}
              name='rating'
            >
              <Rate
                name='rating'
                onChange={value => setRating(value)}
                value={rating}
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
                value={text}
                onChange={handleChangeInput}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

    )
  }

export default AddReviewModal