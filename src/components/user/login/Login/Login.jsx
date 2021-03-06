import React, { useState, useEffect, Component } from 'react'
import { notification, Row, Col } from 'antd'
import { localizedStrings } from '../../../../util/localization'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { getCurrentUser, login, setIsAuthenticated } from '../../../../redux/actions/auth'

import { Button, Form, Input } from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const auth = useSelector(state => state.authState)

  useEffect(() => {
    if (props.location.state && props.location.state.error) {
      this.showAlertMessage()
    }
  })

  const handleSubmit = () => {
    dispatch(login(email, password)).then(() => {
      props.history.push('/')
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

  if (auth.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Row style={{ height: 'calc(100vh - 64px)' }} align={'middle'}>
      <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 10, offset: 7 }}>
        <Form
          style={{ padding: '25px', backgroundColor: '#fff' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name='email'
            rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
            onChange={handleLoginChange}
          >
            <Input
              prefix={<UserOutlined />}
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
            style={{ marginBottom: '0' }}
          >
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{ width: '100%', marginBottom: '16px' }}
            >
              {localizedStrings.login}
            </Button>
            <Row justify='space-between' align='top'>
              <Col span={12} style={{ textAlign: 'left' }}>
                {localizedStrings.noAccount}
                <Link to='/sign-up'>
                  {localizedStrings.signUp}
                </Link>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Link to='/restore'>
                  {localizedStrings.restorePassword}
                </Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default withRouter(Login)
