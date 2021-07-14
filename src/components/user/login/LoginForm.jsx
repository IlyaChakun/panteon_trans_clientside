import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { localizedStrings } from '../../util/localization'
import { Link } from 'react-router-dom'
import s from './Login.module.css'
import SocialLogin from './SocialLogin'
import './Login.module.css'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/actions/auth'

const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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
