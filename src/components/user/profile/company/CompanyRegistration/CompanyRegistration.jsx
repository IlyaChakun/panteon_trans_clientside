import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, Typography } from 'antd'
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

const CompanyRegistration = ({ buttonText }) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const [current, setCurrent] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('')
  const [companyTitle, setCompanyTitle] = useState('')
  const [UNP, setUNP] = useState('')
  const [type, setType] = useState({})
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState({})
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmit = (values) => {
    console.log('Received values of form:', values)
  }

  const onChangeCountrySelect = (input, option) => {}

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
      <Button
        type='primary'
        onClick={showModal}
      >
        {buttonText}
      </Button>
      <Modal
        title='Регистрация компании'
        visible={visible}
        cancelText='Отменить'
        okText={'Зарегистрировать'}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={24}>
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
            </Form>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>

  )
}

export default withRouter(CompanyRegistration)
