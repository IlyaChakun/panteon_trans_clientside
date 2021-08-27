import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { localizedStrings } from '../../../../util/localization'
import { Button, Form, Input } from 'antd'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import {
  validateEmail,
  validatePassword,
  validatePasswordRepeat
} from '../../../../validation/validation'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {registration} from "../../../../redux/actions/auth";

const Registration = (props) => {

  const [email, setEmail] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })
  const [repeatPassword, setRepeatPassword] = useState({ value: '' })

  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.authState)

  const handleSubmit = (values) => {
    dispatch(registration(values))
        .then((data) => {
          console.log('got data:', data)
        })
        .catch(error => {
          console.log('error:', error)
        })
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

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Row style={{ height: 'calc(100vh - 64px)' }} align={'middle'}>
      <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 10, offset: 7 }}>
        <Form
          style={{ padding: '25px', backgroundColor: '#fff' }}
          onFinish={handleSubmit}
          layout={"vertical"}
        >
          <Form.Item
            name='email'
            label={'E-mail:'}
            rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
            onChange={handleEmailChange}
            validateStatus={email.validateStatus}
            help={email.errorMsg}
          >
            <Input
              value={email.value}
              name='email'
              placeholder={'Ваш E-mail'}
            />
          </Form.Item>
          <Form.Item
              name='firstName'
              label={'Имя:'}
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
              onChange={handleEmailChange}
              validateStatus={email.validateStatus}
              help={email.errorMsg}
          >
            <Input
               value={email.value}
               name='firstName'
               placeholder={'Ваше имя'}
            />
          </Form.Item>
          <Form.Item
              name='lastName'
              label={'Фамилия:'}
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
              onChange={handleEmailChange}
              validateStatus={email.validateStatus}
              help={email.errorMsg}
          >
            <Input
               value={email.value}
               name='lastName'
               placeholder={'Ваша фамилия'}
            />
          </Form.Item>

          <Form.Item
            name='password'
            label={'Пароль:'}
            rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
            onChange={handlePasswordChange}
            validateStatus={password.validateStatus}
            help={password.errorMsg}
          >
            <Input.Password
              autoComplete={'current-password'}
              name='password'
              type='password'
              value={password.value}
              placeholder={'Придумайте пароль'}
            />
          </Form.Item>

          <Form.Item
            name='password_repeat'
            label={'Повторите пароль:'}
            rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
            onChange={handleRepeatPasswordChange}
            validateStatus={repeatPassword.validateStatus}
            help={repeatPassword.errorMsg}
          >
            <Input.Password
              autoComplete={'current-password'}
              name='password_repeat'
              type='password'
              value={repeatPassword.value}
              placeholder={'Повторите пароль:'}
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
