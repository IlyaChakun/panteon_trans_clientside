import React, { useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col } from 'antd'

import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUserName
} from '../../../../validation/validation'
import { withRouter, Link } from 'react-router-dom'
import { localizedStrings } from '../../../../util/localization'

const { Step } = Steps
const { Option } = Select

const Registration = (props) => {
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
    // <>
    <Row style={{height: '60vh'}}>
      <Col xs={{span: 20, offset: 2}} sm={{span: 16, offset: 4}} md={{span: 10, offset: 7}}>
        <Form
          style={{padding: '25px', backgroundColor: '#fff'}}
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
            style={{marginBottom: '0'}}
          >
            <Button 
              type='primary' 
              htmlType='submit'
              className='login-form-button'
              style={{width: '100%', marginBottom: '16px'}}
            >
              {'Зрегистрировать'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>

      /* <div className="container-fluid">

        <Form
          {...layout}
          onFinish={handleSubmit}
          name='dynamic_form_nest_item'
          autoComplete='off'
        >

          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title}/>
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Дальше
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Успешная регистрация!')}>
                Регистрация
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Назад
              </Button>
            )}
          </div>

        </Form>
      </div>
    </> */
  )
}

export default withRouter(Registration)
