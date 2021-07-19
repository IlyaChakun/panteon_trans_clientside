import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col, Typography } from 'antd'
import {
  validateEmail,
  validatePassword, validatePasswordRepeat,
  validatePhoneNumber,
  validateUserName
} from '../../../../validation/validation'
import { withRouter, Link } from 'react-router-dom'
import { localizedStrings } from '../../../../util/localization'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../../redux/actions/auth'

const { Option } = Select
const { Title } = Typography

const Registration = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState({ value: '' })

  const dispatch = useDispatch()
  const auth = useSelector(state => state.authState);

  useEffect(() => {
    if (props.location.state && props.location.state.error) {
      this.showAlertMessage()
    }
  })

  const handleSubmit = () => {
    dispatch(login({ email, password }))
    props.onLogin()
  }

  const handleLoginChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
  }

  const handleRepeatPasswordChange = (event) => {
    console.log('pass repeat event', {password, repeatPassword})
    setRepeatPassword({
      value: event.target.value,
      ...validatePasswordRepeat(password.value, event.target.value)
    })
  }

  const countryOptions = [
    <Option key={1} value={1}>
      Беларусь
    </Option>,
    <Option key={2} value={2}>
      Россия
    </Option>
  ]

  return (
    <React.Fragment>
      <Title level={2} style={{ padding: '0 20px 0 20px' }}>Изменить личные данные</Title>
      <Row style={{ height: '60vh' }}>
        <Col xs={{ span: 20 }} sm={{ span: 16 }} md={{ span: 10 }}>
          <Form
            style={{padding: '25px', backgroundColor: '#fff'}}
            onFinish={handleSubmit}
          >
            <Form.Item
              name='email'
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
              onChange={handleLoginChange}
            >
              <Input prefix={<UserOutlined />}
                 type={'email'}
                 name='email'
                 placeholder={localizedStrings.email}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
              onChange={handlePasswordChange}
            >
              <Input.Password
                prefix={<LockOutlined />}
                autoComplete={'current-password'}
                name='password'
                type='password'
                placeholder={localizedStrings.password}
              />
            </Form.Item>

            <Form.Item
              name='password_repeat'
              rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
              onChange={handleRepeatPasswordChange}
              validateStatus={repeatPassword.validateStatus}
            >
              <Input.Password
                prefix={<LockOutlined />}
                autoComplete={'current-password'}
                name='password_repeat'
                type='password'
                value={repeatPassword.value}
                placeholder={localizedStrings.repeatPassword}
              />
            </Form.Item>

            <Form.Item
              style={{marginBottom: '0'}}
            >
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                style={{width: '100%', marginBottom: '16px'}}
              >
                Применить
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>

  )
}

export default withRouter(Registration)
