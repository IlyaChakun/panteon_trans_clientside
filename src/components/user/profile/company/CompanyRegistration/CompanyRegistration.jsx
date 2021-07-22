import React, { useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col, Typography } from 'antd'
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUserName
} from '../../../../../validation/validation'
import { withRouter, Link } from 'react-router-dom'
import { localizedStrings } from '../../../../../util/localization'

const { Option } = Select
const { Title } = Typography

const CompanyRegistration = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const [phoneNumber, setPhoneNumber] = useState('')
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('')
  const [companyTitle, setCompanyTitle] = useState('')
  const [UNP, setUNP] = useState('')
  const [type, setType] = useState({})
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState({})

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const handleSubmit = (values) => {
    console.log('Received values of form:', values)
  }

  const onChangeCountrySelect = (input, option) => {

  }

  const handleCompanyTitle = (event) => {
    console.log('handleCompanyTitle event', event.target.value)
    setCompanyTitle({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleUNP = (event) => {
    console.log('handleUNP event', event.target.value)
    setUNP({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handlePhoneNumber = (event) => {
    console.log('handlePhoneNumber event', event.target.value)
    setPhoneNumber({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleAdditionalPhoneNumber = (event) => {
    console.log('handleAdditionalPhoneNumber event', event.target.value)
    setAdditionalPhoneNumber({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleAddress = (event) => {
    console.log('handleAddress', event.target.value)
    setAddress({
      value: event.target.value,
      ...validateUserName(event.target.value)
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
      <Title level={2} style={{ padding: '0 20px 0 20px' }}>Ваша компания ещё не зарегистрирована. Пожалуйста, пройдите регистрацию</Title>
      <Row>
        <Col xs={{ span: 20 }} sm={{ span: 16 }} md={{ span: 10 }}>
          <Form
            style={{ padding: '25px', backgroundColor: '#fff' }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name='companyTitle'
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
              onChange={handleCompanyTitle}
            >
              <Input
                value={companyTitle}
                name='companyTitle'
                placeholder={'Наименование организации'}
              />
            </Form.Item>

            <Form.Item
              name='UNP'
              rules={[{ required: true, message: localizedStrings.alertBadPassword }]}
              onChange={handleUNP}
            >
              <Input
                name='UNP'
                value={UNP}
                placeholder={'УНП/ИНН'}
              />
            </Form.Item>

            <Form.Item
              hasFeedback
            >

              <Select
                name='country'
                value={country.id}
                showSearch
                placeholder='Страна'
                onChange={onChangeCountrySelect}
              >
                {countryOptions}
              </Select>
            </Form.Item>

            <Form.Item
              hasFeedback
              onChange={(event) => handleAddress(event)}
              rules={[{
                required: true,
                message: 'Пожалуйста, введите Адрес!'
              }
              ]}
            >
              <Input
                name='address'
                value={address}
                placeholder='Юридический адрес'
              />
            </Form.Item>

            <Form.Item
              hasFeedback
              onChange={(event) => handlePhoneNumber(event)}
              rules={[{
                required: true,
                message: 'Пожалуйста, введите номер телефона!'
              }
              ]}
            >
              <Input
                name='phoneNumber'
                value={phoneNumber}
                placeholder='Номер телефона'
              />
            </Form.Item>

            <Form.Item
              hasFeedback
              onChange={(event) => handleAdditionalPhoneNumber(event)}
            >
              <Input
                name='additionalPhoneNumber'
                value={additionalPhoneNumber}
                placeholder='Номер телефона(доп.)'
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
                {'Зрегистрировать'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>

  )
}

export default withRouter(CompanyRegistration)
