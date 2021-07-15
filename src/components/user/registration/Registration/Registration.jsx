import React, { useState } from 'react'
import { notification, Row, Col } from 'antd'
import { localizedStrings } from '../../../../util/localization'
import { Button, Form, Input, message } from 'antd'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import {
  validateEmail,
  validatePassword,
  validatePasswordRepeat
} from '../../../../validation/validation'
import { withRouter, Link} from 'react-router-dom'

const Registration = (props) => {

  const [email, setEmail] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })
  const [repeatPassword, setRepeatPassword] = useState({ value: '' })

  const handleSubmit = (values) => {
    console.log('Received values of form:', values)
  }

  const handlePasswordChange = (event) => {
    console.log('password event', event.target.value)
    setPassword({
      value: event.target.value,
      ...validatePassword(event.target.value)
    })
  }

  const handleEmailChange = (event) => {
    console.log('email event', email)
    setEmail({
      value: event.target.value,
      ...validateEmail(event.target.value)
    })
  }

  const handleRepeatPasswordChange = (event) => {
    console.log('pass repeat event', {password, repeatPassword})
    setRepeatPassword({
      value: event.target.value,
      ...validatePasswordRepeat(password.value, event.target.value)
    })
  }

  return (
    <Row style={{height: '60vh'}}>
      <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 10, offset: 7}}>
        <Form
          style={{padding: '25px', backgroundColor: '#fff'}}
          onFinish={handleSubmit}
        >
          <Form.Item
            name='email'
            rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
            onChange={handleEmailChange}
            validateStatus={email.validateStatus}
          >
            <Input prefix={<UserOutlined />}
              // type={'email'}
              value={email.value}
              name='email'
              placeholder={localizedStrings.email}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
            onChange={handlePasswordChange}
            validateStatus={password.validateStatus}
          >
            <Input.Password
              prefix={<LockOutlined />}
              autoComplete={'current-password'}
              name='password'
              type='password'
              value={password.value}
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
              {localizedStrings.signUp}
            </Button>
            {localizedStrings.alreadyHaveAccount}
            <Link to='/login'>
              {localizedStrings.login}
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default withRouter(Registration)
