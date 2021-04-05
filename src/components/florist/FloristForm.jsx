import React, { useState } from 'react'

import s from '../user/profile/Profile.module.css'
import { Button, Col, Form, Input, Row } from 'antd'
import { SUCCESS } from '../../constants'

import { withRouter } from 'react-router-dom'
import { validateEmail, validateUserName } from '../common/validation/ValidationFunctions'
import { localizedStrings } from '../util/localization'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { validatePassoword } from './FloristValidation'

const FloristForm = (props) => {

  const [name, setName] = useState({ value: props.florist.user.name, validateStatus: props.validateStatus })
  const [email, setEmail] = useState({
    value: props.florist.user.email,
    validateStatus: props.validateStatus
  })
  const [password, setPassword] = useState({ value: props.florist.user.password, validateStatus: props.validateStatus })

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const isFormInvalid = () => {
    return !(
      name.validateStatus === SUCCESS,
      email.validateStatus === SUCCESS
    )
  }

  const handleSubmit = (values) => {
    console.log('Received values of form:', values)

    const flowerRequest = {

      userSignUpRequest: {
        roleType: 'ROLE_FLORIST',
        name: name.value,
        email: email.value,
        password: password.value,
        confirmedPassword: password.value
      },
      experience: 1,
      shopId: 1
    }

    console.log('flowerRequest request: ', flowerRequest)
    props.handleSubmitButton(flowerRequest)
  }

  const handleNameChange = (event) => {
    console.log('name event', event)
    setName({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleEmailChange = (event) => {
    console.log('email event', event)
    setEmail({
      value: event.target.value,
      ...validateEmail(event.target.value)
    })
  }

  const handlePasswordChange = (event) => {
    console.log('password event', event)
    setPassword({
      value: event.target.value,
      ...validatePassoword(event.target.value)
    })
  }

  return (
    <Form {...layout}
          onFinish={handleSubmit}
          name='dynamic_form_nest_item'
          autoComplete='off'
    >
      <Row>
        <Col span={24}>
          <Row>
            <Col span={10}>

            </Col>

            <Col span={14}>

              <Form.Item
                label={'Имя'}
                validateStatus={name.validateStatus}
                hasFeedback
                onChange={(event) => handleNameChange(event)}
                help={name.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите имя флориста!'
                  }
                ]}
              >
                <Input
                  name='name'
                  value={name.value}
                  placeholder='Имя'
                  style={{ fontSize: '16px', width: 200 }}
                />
              </Form.Item>

              <Form.Item
                label={'Электронная почта'}
                validateStatus={email.validateStatus}
                hasFeedback
                onChange={(event) => handleEmailChange(event)}
                help={email.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите электронная почта!'
                  }
                ]}
              >
                <Input
                  name='email'
                  value={email.value}
                  type={email}
                  placeholder='Электронная почта'
                  style={{ fontSize: '16px', width: 200 }}
                />
              </Form.Item>

              <Form.Item
                label={'Пароль'}
                validateStatus={password.validateStatus}
                hasFeedback
                onChange={(event) => handlePasswordChange(event)}
                help={password.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите пароль!'
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined/>}
                  name='password'
                  type='password'
                  autoComplete='off'
                  placeholder={localizedStrings.helpForPass}
                  value={password.value}
                />
              </Form.Item>

            </Col>
          </Row>
          <Row>
            <Col span={4} offset={20}>
              <Form.Item className={s.formItem}>
                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  className={s.button}
                  disabled={isFormInvalid()}>
                  {props.action}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default withRouter(FloristForm)
