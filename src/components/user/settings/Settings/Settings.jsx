import React, { useEffect, useState } from 'react'
import {Typography, Table, Row, Col, Form, Input, Button} from 'antd'
import {
  validateEmail,
  validatePassword, validatePasswordRepeat,
  validatePhoneNumber,
  validateUserName
} from '../../../../validation/validation'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../../redux/actions/auth'
import ChangeModal from '../ChangeModal/ChangeModal'
import {localizedStrings} from "../../../../util/localization";

const { Title } = Typography
const { Column } = Table;

const Settings = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState({ value: '' })

  const [isDisabled, setIsDisabled] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)

  const { currentUser } = useSelector(state => state.authState)

  const toggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false)
      setIsDisabled(true)
    }
    else {
      setIsEditMode(true)
      setIsDisabled(false)
    }
  }

  const authData = (user) => [
    {
      key: '1',
      parameter: user.email,
      control: {
        isEmail: true,
        isName: false,
        isSurname: false,
        isLastname: false
      }
    },
    {
      key: '2',
      parameter: 'Имя',
      control: {
        isEmail: false,
        isName: true,
        isSurname: false,
        isLastname: false
      }
    },
    {
      key: '3',
      parameter: 'Фамилия',
      control: {
        isEmail: false,
        isName: false,
        isSurname: true,
        isLastname: false
      }
    },
    {
      key: '4',
      parameter: 'Отчество',
      control: {
        isEmail: false,
        isName: false,
        isSurname: false,
        isLastname: true
      }
    }
  ];

  const handleRepeatPasswordChange = (event) => {
    console.log('pass repeat event', {password, repeatPassword})
    setRepeatPassword({
      value: event.target.value,
      ...validatePasswordRepeat(password.value, event.target.value)
    })
  }

  return (
    <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} align={"top"} justify={"start"}>
      <Col span={18} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
      {currentUser && (
        <React.Fragment>
          <Title level={2}>Здравствуйте, Глеб Андреев!</Title>
          <Title level={3}>Ваши учётные данные:</Title>
          <Form
            layout="vertical"
          >
            <Form.Item
              name='name'
              label={'Ваше имя: '}
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
            >
              <Input
                name='name'
                disabled={isDisabled}
                placeholder={'Имя'}
              />
            </Form.Item>
            <Form.Item
              name='lastName'
              label={'Ваша фамилия:'}
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
            >
              <Input
                name='lastName'
                disabled={isDisabled}
                placeholder={'Фамилия'}
              />
            </Form.Item>
            <Form.Item
              name='email'
              label={'Ваш E-Mail:'}
              rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
            >
              <Input
                name='email'
                disabled={isDisabled}
                placeholder={'E-Mail'}
              />
            </Form.Item>
            <Form.Item>
              {isEditMode ? (
                  <React.Fragment>
                    <Button
                        onClick={toggleEditMode}
                        type={'primary'}
                        style={{ marginRight: '16px' }}
                    >
                      Применить
                    </Button>
                    <Button onClick={toggleEditMode}>Отмена</Button>
                  </React.Fragment>
              ) : (
                  <React.Fragment>
                    <Button
                        onClick={toggleEditMode}
                        type={'primary'}
                        style={{ marginRight: '16px' }}
                    >
                      Редактировать
                    </Button>
                    <ChangeModal isPassword={true} >
                      Изменить пароль
                    </ChangeModal>
                  </React.Fragment>
              )}
            </Form.Item>
          </Form>
        </React.Fragment>
      )}
      </Col>
    </Row>
  )
}

export default withRouter(Settings)
