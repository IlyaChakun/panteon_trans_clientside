import React, { useState } from 'react'

import s from '../user/profile/Profile.module.css'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { SUCCESS } from '../../constants'

import { withRouter } from 'react-router-dom'
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUserName
} from '../common/validation/ValidationFunctions'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { validateExperience, validateSalary } from './FloristValidation'
import ImageLoader from '../common/image/ImageLoader'
import { useSelector } from 'react-redux'
import { validateId } from '../product/ProductValidation'
import { shopSelector } from '../../redux/reducers/ShopsSliceReducer'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const { Option } = Select

const FloristForm = (props) => {

  const [name, setName] = useState({ value: props.florist.user.name, validateStatus: props.validateStatus })
  const [email, setEmail] = useState({
    value: props.florist.user.email,
    validateStatus: props.validateStatus
  })
  const [experience, setExperience] = useState({
    value: props.florist.experience,
    validateStatus: props.validateStatus
  })
  const [phoneNumber, setPhoneNumber] = useState({
    value: props.florist.user.phoneNumber,
    validateStatus: props.validateStatus
  })
  const [salary, setSalary] = useState({
    value: props.florist.salary,
    validateStatus: props.validateStatus
  })
  const [password, setPassword] = useState({ value: props.florist.user.password, validateStatus: props.validateStatus })
  const [imageUrl, setImageUrl] = useState(props.florist.user.image === undefined ? '' : props.florist.user.image.imageUrl)

  const { shops } = useSelector(shopSelector)

  const [shop, setShop] = useState({
    id: shops[0].id,
    value: shops.find(x => x.id === shops[0].id),
    validateStatus: props.validateStatus
  })

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const isFormInvalid = () => {
    return !(
      name.validateStatus === SUCCESS,
      email.validateStatus === SUCCESS,
      experience.validateStatus === SUCCESS,
      salary.validateStatus === SUCCESS
    )
  }

  const handleSubmit = (values) => {
    console.log('Received values of form:', values)

    const floristRequest = {
      roleType: 'ROLE_FLORIST',
      name: name.value,
      email: email.value,
      imageUrl: imageUrl,
      password: password.value,
      confirmedPassword: password.value,
      experience: experience.value,
      salary: salary.value,
      shopId: shop.id,
      phoneNumber: phoneNumber.value
    }

    console.log('floristRequest request: ', floristRequest)
    props.handleSubmitButton(floristRequest)
  }

  const handleImageUrlChange = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const handleNameChange = (event) => {
    console.log('name event', event.target.value)
    setName({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleEmailChange = (event) => {
    console.log('email event', event.target.value)
    setEmail({
      value: event.target.value,
      ...validateEmail(event.target.value)
    })
  }

  const handleExperienceChange = (event) => {
    console.log('handleExperienceChange event', event.target.value)
    setExperience({
      value: event.target.value,
      ...validateExperience(event.target.value)
    })
  }

  const handlePhoneNumberChange = (event) => {
    console.log('handlePhoneNumberChange event', event.target.value)
    setPhoneNumber({
      value: event.target.value,
      ...validatePhoneNumber(event.target.value)
    })
  }

  const handleSalaryChange = (event) => {
    console.log('handleSalaryChange event', event.target.value)
    setSalary({
      value: event.target.value,
      ...validateSalary(event.target.value)
    })
  }

  const handlePasswordChange = (event) => {
    console.log('password event', event.target.value)
    setPassword({
      value: event.target.value,
      ...validatePassword(event.target.value)
    })
  }

  const shopOptions = shops.map(
    element =>
      <Option key={`${element.id}-${element.contacts.address}`} value={element.id}>
        {element.contacts.address}
      </Option>
  )

  const onChangeShopSelect = (input, option) => {
    setShop({
      id: option.value,
      value: option.value,
      ...validateId(option.key)
    })
  }

  const phoneOption = () => {
    if (props.florist.id === null) {
      return ''
    } else {
      return (
        <>
          <Form.Item
            label={'Телефон'}
            validateStatus={phoneNumber.validateStatus}
            hasFeedback
            onChange={(event) => handlePhoneNumberChange(event)}
            help={phoneNumber.errorMsg}
            rules={[
              {
                required: false,
                message: 'Пожалуйста, введите телефон!'
              }
            ]}
          >
            <Input
              name='phoneNumber'
              value={phoneNumber.value}
              type={'tel'}
              placeholder='Телефон'
              style={{ fontSize: '16px', width: 200 }}
            />
          </Form.Item>
        </>
      )
    }
  }

  const passwordOption = () => {
    if (props.florist.id !== null) {
      return ''
    } else {
      return (
        <>
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
              prefix={<LockOutlined />}
              name='password'
              type='password'
              autoComplete='off'
              placeholder={'Введите пароль'}
              value={password.value}
              maxLength={200}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </>
      )
    }
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
              <ImageLoader
                imageUrl={imageUrl}
                handleImageUrlChange={handleImageUrlChange}
              />
            </Col>

            <Col span={14}>

              <Form.Item
                label='Место работы'
                validateStatus={shop.validateStatus}
                hasFeedback
                help={shop.errorMsg}
              >

                <Select
                  name='shop'
                  value={shop.id}
                  showSearch
                  style={{ width: 200 }}
                  placeholder='Выберите пункт самовывоза'
                  onChange={onChangeShopSelect}
                >
                  {shopOptions}
                </Select>

              </Form.Item>

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
                    message: 'Пожалуйста, введите электронную почту!'
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

              {phoneOption()}

              <Form.Item
                label={'Стаж работы'}
                validateStatus={experience.validateStatus}
                hasFeedback
                onChange={(event) => handleExperienceChange(event)}
                help={experience.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите стаж работы!'
                  }
                ]}
              >
                <Input
                  name='experience'
                  value={experience.value}
                  type={experience}
                  placeholder='Стаж работы'
                  style={{ fontSize: '16px', width: 200 }}
                />
              </Form.Item>

              <Form.Item
                label={'Сумма оклада'}
                validateStatus={salary.validateStatus}
                hasFeedback
                onChange={(event) => handleSalaryChange(event)}
                help={salary.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите сумму оклада!'
                  }
                ]}
              >
                <Input
                  name='salary'
                  value={salary.value}
                  type={salary}
                  placeholder='Сумма оклада'
                  style={{ fontSize: '16px', width: 200 }}
                />
              </Form.Item>

              {passwordOption()}

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
