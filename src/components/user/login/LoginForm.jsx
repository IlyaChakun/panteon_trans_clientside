import React, { Component, useState } from 'react'
import { Button, Form, Input, notification } from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { localizedStrings } from '../../util/localization'
import { Link } from 'react-router-dom'
import s from './Login.module.css'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../constants'
import { loginRequest } from '../../util/utilsAPI'
import SocialLogin from './SocialLogin'
import './Login.module.css'

const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    const emailRequest = {
      email: email,
      password: password
    }
    loginRequest(emailRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken)
        localStorage.setItem(REFRESH_TOKEN, response.refreshToken)

        props.onLogin()
      }).catch(() => {
      notification.error({
        message: localizedStrings.alertAppName,
        description: localizedStrings.alertWrongEmailOrPassword
      })
    })
  }

  const handleLoginChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
  }

    return (
      <Form
        className={s.form}
        onFinish={handleSubmit}>
        <Form.Item
          name='email'
          rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
          onChange={handleLoginChange}>

          <Input prefix={<UserOutlined />}
                 size='large'
                 type={'email'}
                 name='email'
                 placeholder={localizedStrings.email} />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
          onChange={handlePasswordChange}>

          <Input.Password
            prefix={<LockOutlined />}
            autoComplete={'current-password'}
            size='large'
            name='password'
            type='password'
            placeholder={localizedStrings.password} />
        </Form.Item>

        <SocialLogin />

        <Form.Item>
          <Button type='primary' htmlType='submit'
                  size='large' className='login-form-button'>
            {localizedStrings.login}
          </Button>
          {localizedStrings.or}
          <Link to='/sign-up'>
            {localizedStrings.loginFormRegisterNow}
          </Link>
        </Form.Item>
      </Form>
    )
}

export default LoginForm
