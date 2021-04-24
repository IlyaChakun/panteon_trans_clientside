import React, { useState } from 'react'
import { Button, Form, Input, message, Select, Steps } from 'antd'
import s from '../profile/Profile.module.css'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUserName
} from '../../common/validation/ValidationFunctions'
import { SUCCESS } from '../../../constants'
import { withRouter } from 'react-router-dom'
import { validateId } from '../../product/ProductValidation'

const { Step } = Steps
const { Option } = Select

const Registration = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const [firstName, setFirstName] = useState({ value: '' })
  const [lastName, setLastName] = useState({ value: '' })
  const [email, setEmail] = useState({ value: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })

  const [companyTitle, setCompanyTitle] = useState({ value: '' })
  const [UNP, setUNP] = useState({ value: '' })
  const [address, setAddress] = useState({ value: '' })
  const [country, setCountry] = useState({})

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const isFormInvalid = () => {
    return !(
      firstName.validateStatus === SUCCESS,
      lastName.validateStatus === SUCCESS,
      email.validateStatus === SUCCESS
    )
  }

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

  const onChangeCountrySelect = (input, option) => {
    setCountry({
      value: option.value,
      ...validateId(option.key)
    })
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

  const handleAddress = (event) => {
    console.log('handleAddress', event.target.value)
    setAddress({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleFirstNameChange = (event) => {
    console.log('name event', event.target.value)
    setFirstName({
      value: event.target.value,
      ...validateUserName(event.target.value)
    })
  }

  const handleLastNameChange = (event) => {
    console.log('last event', event.target.value)
    setLastName({
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

  const handlePhoneNumberChange = (event) => {
    console.log('handlePhoneNumberChange event', event.target.value)
    setPhoneNumber({
      value: event.target.value,
      ...validatePhoneNumber(event.target.value)
    })
  }

  const userDataForm = (<>
    <Form.Item
      label={'Имя'}
      validateStatus={firstName.validateStatus}
      hasFeedback
      onChange={(event) => handleFirstNameChange(event)}
      help={firstName.errorMsg}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите имя !'
        }
      ]}
    >
      <Input
        name="firstName"
        value={firstName.value}
        placeholder='Имя'
        style={{ fontSize: '16px', width: 350 }}
      />
    </Form.Item>

    <Form.Item
      label={'Фамилия'}
      validateStatus={lastName.validateStatus}
      hasFeedback
      onChange={(event) => handleLastNameChange(event)}
      help={lastName.errorMsg}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите фамилию!'
        }
      ]}
    >
      <Input
        name='surname'
        value={lastName.value}
        placeholder='Фамилия'
        style={{ fontSize: '16px', width: 350 }}
      />
    </Form.Item>

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
        style={{ fontSize: '16px', width: 350 }}
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
        style={{ fontSize: '16px', width: 350 }}
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
        placeholder={'Введите пароль'}
        value={password.value}
        style={{ fontSize: '16px', width: 350 }}
        maxLength={350}
        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
      />
    </Form.Item>

  </>)


  const countryOptions = [
    <Option key={1} value={1}>
      Беларусь
    </Option>,
    <Option key={2} value={2}>
      Россия
    </Option>
  ]

  // const submitButtonForm = (
  //   <Form.Item className={s.formItem}>
  //     <Button
  //       type='primary'
  //       htmlType='submit'
  //       size='large'
  //       className={s.button}
  //       disabled={isFormInvalid()}>
  //       Регистрация
  //     </Button>
  //   </Form.Item>
  // )

  const organizationData = (
    <>
      <Form.Item
        label={'Наименование организации'}
        validateStatus={companyTitle.validateStatus}
        hasFeedback
        onChange={(event) => handleCompanyTitle(event)}
        help={companyTitle.errorMsg}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите Наименование организации!'
          }
        ]}
      >
        <Input
          name='companyTitle'
          value={companyTitle.value}
          type={companyTitle}
          placeholder='Наименование организации'
          style={{ fontSize: '16px', width: 350 }}
        />
      </Form.Item>

      <Form.Item
        label={'УНП/ИНН'}
        validateStatus={UNP.validateStatus}
        hasFeedback
        onChange={(event) => handleUNP(event)}
        help={UNP.errorMsg}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите УНП/ИНН!'
          }
        ]}
      >
        <Input
          name='UNP'
          value={UNP.value}
          type={UNP}
          placeholder='УНП/ИНН'
          style={{ fontSize: '16px', width: 350 }}
        />
      </Form.Item>

      <Form.Item
        label='Страна'
        validateStatus={country.validateStatus}
        hasFeedback
        help={country.errorMsg}
      >

        <Select
          name='country'
          value={country.id}
          showSearch
          style={{ width: 200 }}
          placeholder='Страна'
          onChange={onChangeCountrySelect}
        >
          {countryOptions}
        </Select>

      </Form.Item>

      <Form.Item
        label={'Адрес'}
        validateStatus={address.validateStatus}
        hasFeedback
        onChange={(event) => handleAddress(event)}
        help={UNP.errorMsg}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите Адрес!'
          }
        ]}
      >
        <Input
          name='address'
          value={address.value}
          type={address}
          placeholder='Адрес'
          style={{ fontSize: '16px', width: 350 }}
        />
      </Form.Item>


      {/*<Form.Item*/}
      {/*  className={s.formItem}*/}
      {/*  style={{ marginTop: '50px', width: 250 }}*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    type='primary'*/}
      {/*    htmlType='submit'*/}
      {/*    size='large'*/}
      {/*    className={s.button}*/}
      {/*    disabled={isFormInvalid()}>*/}
      {/*    Регистрация*/}
      {/*  </Button>*/}
      {/*</Form.Item>*/}

    </>
  )

  const steps = [
    {
      title: 'Данные пользователя',
      content: userDataForm
    },
    {
      title: 'Данные организации',
      content: organizationData
    }
  ]

  return (
    <>
      <div className="container-fluid">

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
    </>
  )
}

export default withRouter(Registration)
