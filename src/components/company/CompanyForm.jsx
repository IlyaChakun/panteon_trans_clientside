import React, { Component } from 'react'
import { localizedStrings } from '../util/localization'

import s from './Company.module.css'
import { Button, Col, Form, Input, notification, Row } from 'antd'


import { SUCCESS } from '../../constants'

import { getCurrentCompanyRequest, saveCompanyRequest, updateCompanyInfoRequest } from '../util/utilsAPI'
import {
  validateAddress,
  validateCity,
  validateEmail,
  validatePhoneNumber,
  validateText
} from '../common/validation/ValidationFunctions'
import {
  validateBankName,
  validateCheckingAccount,
  validateIBAN,
  validateLicenceNumber,
  validateName,
  validatePayerAccountNumber,
  validatePostalCode
} from './CompanyValidationFunctions'

const { TextArea } = Input

const layout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
}

class CompanyForm extends Component {

  state = {
    shopAdmin: '',

    id: '',
    name: {
      value: ''
    },
    description: {
      value: ''
    },
    licenceNumber: {
      value: ''
    },

    firstPhoneNumber: {
      value: ''
    },
    secondPhoneNumber: {
      value: ''
    },
    email: {
      value: ''
    },
    city: {
      value: ''
    },
    address: {
      value: ''
    },
    payerAccountNumber: {
      value: ''
    },
    checkingAccount: {
      value: ''
    },
    bankName: {
      value: ''
    },
    bankCode: {
      value: ''
    },
    postalCode: {
      value: ''
    },
    bankAddress: {
      value: ''
    },
    shops: [],

    isEditing: false,
    isExist: false
  }


  componentDidMount() {
    this.resolveCompany()
  }

  resolveCompany() {
    const company = getCurrentCompanyRequest()
    company
      .then(response => {

        this.setState({
          id: response.id,
          name: {
            value: response.name,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          description: {
            value: response.description,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          licenceNumber: {
            value: response.licenceNumber,
            validateStatus: SUCCESS,
            errorMsg: null
          },

          firstPhoneNumber: {
            value: response.contacts.firstPhoneNumber,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          secondPhoneNumber: {
            value: response.contacts.secondPhoneNumber,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          email: {
            value: response.contacts.email,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          city: {
            value: response.contacts.city,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          address: {
            value: response.contacts.address,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          payerAccountNumber: {
            value: response.companyLegalAddress.payerAccountNumber,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          checkingAccount: {
            value: response.companyLegalAddress.checkingAccount,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          bankName: {
            value: response.companyLegalAddress.bankInformation.bankName,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          bankCode: {
            value: response.companyLegalAddress.bankInformation.bankCode,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          postalCode: {
            value: response.companyLegalAddress.bankInformation.postalCode,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          bankAddress: {
            value: response.companyLegalAddress.bankInformation.address,
            validateStatus: SUCCESS,
            errorMsg: null
          },
          shops: { ...response.shops },

          isEditing: false,
          isExist: true
        })
      }).catch(error => {

      this.setState({
        isEditing: false
      })
      notification.error({
        message: 'Цветочный магазин',
        description: 'У вас еще нет компании! А ну ка создайте!'
      })
    })
  }

  handleInputChange = (event, validationFun) => {
    const target = event.target
    const inputName = target.name
    const inputValue = target.value

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    })
  }


  editCompany = () => {
    if (this.state.isEditing === false) {
      this.setState({
        isEditing: true
      })
    } else {
      this.setState({
        isEditing: false
      })
    }
  }


  handleSubmit = () => {
    const companyRequest = {
      'name': this.state.name.value,
      'description': this.state.description.value,
      'licenceNumber': this.state.licenceNumber.value,
      'contacts': {
        'firstPhoneNumber': this.state.firstPhoneNumber.value,
        'secondPhoneNumber': this.state.secondPhoneNumber.value,
        'email': this.state.email.value,
        'city': this.state.city.value,
        'address': this.state.address.value
      },
      'companyLegalAddress': {
        'payerAccountNumber': this.state.payerAccountNumber.value,
        'checkingAccount': this.state.checkingAccount.value,
        'bankInformation': {
          'bankName': this.state.bankName.value,
          'bankCode': this.state.bankCode.value,
          'postalCode': this.state.postalCode.value,
          'address': this.state.bankAddress.value
        }
      }
    }

    if (this.state.isExist) {
      updateCompanyInfoRequest(this.state.id, companyRequest)
        .then(() => {
          notification.success({
            message: 'Цветочный магазин',
            description: 'Компания обновлена!'
          })

        }).catch(error => {
        notification.error({
          message: 'Цветочный магазин',
          description: 'Чет пошло не так, провепрьте данные '
        })
      })
    } else {
      saveCompanyRequest(companyRequest)
        .then(() => {
          notification.success({
            message: 'Цветочный магазин',
            description: 'Компания сохранена!'
          })

        }).catch(error => {
        notification.error({
          message: 'Цветочный магазин',
          description: 'Чет пошло не так. сорян'
        })
      })
    }
  }


  isFormInvalid = () => {
    return !(
      this.state.name.validateStatus === SUCCESS &&
      this.state.licenceNumber.validateStatus === SUCCESS &&
      this.state.firstPhoneNumber.validateStatus === SUCCESS &&
      this.state.secondPhoneNumber.validateStatus === SUCCESS &&
      this.state.email.validateStatus === SUCCESS &&
      this.state.city.validateStatus === SUCCESS &&
      this.state.address.validateStatus === SUCCESS &&
      this.state.payerAccountNumber.validateStatus === SUCCESS &&
      this.state.checkingAccount.validateStatus === SUCCESS &&
      this.state.bankName.validateStatus === SUCCESS &&
      this.state.bankCode.validateStatus === SUCCESS &&
      this.state.postalCode.validateStatus === SUCCESS &&
      this.state.bankAddress.validateStatus === SUCCESS &&
      this.state.isEditing === true
    )
  }

  render() {
    return (
      <Form {...layout}
            onFinish={this.handleSubmit}
            initialValues={{
              'name': this.state.name.value,
              'description': this.state.description.value,
              'city': this.state.city.value,
              'address': this.state.address.value,
              'firstPhoneNumber': this.state.firstPhoneNumber.value,
              'secondPhoneNumber': this.state.secondPhoneNumber.value,
              'email': this.state.email.value,
              'bankName': this.state.bankName.value,
              'bankCode': this.state.bankCode.value,
              'checkingAccount': this.state.checkingAccount.value,
              'bankAddress': this.state.bankAddress.value,
              'postalCode': this.state.postalCode.value
            }}
      >
        <div className='mb-5'>
          <Row>
            <Col span={12}>
              <Form.Item
                className={s.formItem}
                label={'Название компании'}
                validateStatus={this.state.name.validateStatus}
                // hasFeedback
                onChange={(event) => this.handleInputChange(event, validateName)}
                help={this.state.name.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите название компании!'
                  }
                ]}
                // name='name'
              >
                <Input
                  name='name'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.name.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'УНП'}
                validateStatus={this.state.payerAccountNumber.validateStatus}
                onChange={(event) => this.handleInputChange(event, validatePayerAccountNumber)}
                help={this.state.payerAccountNumber.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите Учетный номер плательщика!'
                  }
                ]}
                // name='payerAccountNumber'
              >
                <Input
                  name='payerAccountNumber'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.payerAccountNumber.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={localizedStrings.companyLicenceNumber}
                validateStatus={this.state.licenceNumber.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateLicenceNumber)}
                help={this.state.licenceNumber.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите номер вашей лицензии!'
                  }
                ]}
                // name='licenceNumber'
              >
                <Input
                  name='licenceNumber'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.licenceNumber.value}>
                </Input>
              </Form.Item>
            </Col>
            <Col span={12}>

              <Form.Item
                className={s.formItem}
                label={localizedStrings.companyDescription}
                validateStatus={this.state.description.validateStatus}
                // hasFeedback
                onChange={(event) => this.handleInputChange(event, validateText)}
                help={this.state.description.errorMsg}
              >
                <TextArea
                  rows={5}
                  name='description'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.description.value}>
                </TextArea>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className='mb-5'>
          <Row>
            <Col span={12}>
              <Form.Item
                className={s.formItem}
                label={'Город'}
                validateStatus={this.state.city.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateCity)}
                help={this.state.city.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите город компании!'
                  }
                ]}
                // name='city'
              >
                <Input
                  name='city'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.city.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'Адрес компании'}
                validateStatus={this.state.address.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateAddress)}
                help={this.state.address.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите адрес компании!'
                  }
                ]}
                // name='address'
              >
                <Input
                  name='address'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.address.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'Номер телефона'}
                validateStatus={this.state.firstPhoneNumber.validateStatus}
                onChange={(event) => this.handleInputChange(event, validatePhoneNumber)}
                help={this.state.firstPhoneNumber.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите контакный номер!'
                  }
                ]}
                // name='firstPhoneNumber'
              >
                <Input
                  name='firstPhoneNumber'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.firstPhoneNumber.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'Второй номер телефона'}
                validateStatus={this.state.secondPhoneNumber.validateStatus}
                // hasFeedback
                onChange={(event) => this.handleInputChange(event, validatePhoneNumber)}
                help={this.state.secondPhoneNumber.errorMsg}
                // name='secondPhoneNumber'
              >
                <Input
                  name='secondPhoneNumber'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.secondPhoneNumber.value}>
                </Input>
              </Form.Item>


              <Form.Item
                className={s.formItem}
                label={'Емаил конторы'}
                validateStatus={this.state.email.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateEmail)}
                help={this.state.email.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите электронную почту!'
                  }
                ]}
                // name='email'
              >
                <Input
                  name='email'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.email.value}>
                </Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className={s.formItem}
                label={'Банк'}
                validateStatus={this.state.bankName.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateBankName)}
                help={this.state.bankName.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите полное название банка!'
                  }
                ]}
                // name='bankName'
              >
                <Input
                  name='bankName'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.bankName.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'Код банка'}
                validateStatus={this.state.bankCode.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateIBAN)}
                help={this.state.bankCode.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите код банка!'
                  }
                ]}
                // name='bankCode'
              >
                <Input
                  name='bankCode'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.bankCode.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'Расчетный счет'}
                validateStatus={this.state.checkingAccount.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateCheckingAccount)}
                help={this.state.checkingAccount.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите расчетный счет!'
                  }
                ]}
                // name='checkingAccount'
              >
                <Input
                  name='checkingAccount'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.checkingAccount.value}>
                </Input>
              </Form.Item>


              <Form.Item
                className={s.formItem}
                label={'Адрес банка'}
                validateStatus={this.state.bankAddress.validateStatus}
                onChange={(event) => this.handleInputChange(event, validateAddress)}
                help={this.state.bankAddress.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите адрес банка!'
                  }
                ]}
                // name='bankAddress'
              >
                <Input
                  name='bankAddress'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.bankAddress.value}>
                </Input>
              </Form.Item>

              <Form.Item
                className={s.formItem}
                label={'Почтовый индекс банка'}
                validateStatus={this.state.postalCode.validateStatus}
                onChange={(event) => this.handleInputChange(event, validatePostalCode)}
                help={this.state.postalCode.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите почтовый индекс банка!'
                  }
                ]}
                // name='postalCode'
              >
                <Input
                  name='postalCode'
                  size='middle'
                  disabled={!this.state.isEditing}
                  value={this.state.postalCode.value}>
                </Input>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className='mb-5'>
          <Row justify='end'>
            <Col span={6}>
              <Button
                type='primary'
                onClick={this.editCompany}
                size='large'
              >
                Редактировать компанию
              </Button>

            </Col>
            <Col span={6}>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                disabled={this.isFormInvalid()}
              >
                Сохранить компанию
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }
}

export default CompanyForm
