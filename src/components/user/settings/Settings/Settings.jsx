import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Row, Col, Typography, Table, Tag, Space } from 'antd'
import {
  validateEmail,
  validatePassword, validatePasswordRepeat,
  validatePhoneNumber,
  validateUserName
} from '../../../../validation/validation'
import { withRouter, Link } from 'react-router-dom'
import { localizedStrings } from '../../../../util/localization'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../../redux/actions/auth'
import ChangeModal from '../ChangeModal/ChangeModal'

const { Option } = Select
const { Title } = Typography
const { Column, ColumnGroup } = Table;

const Registration = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState({ value: '' })

  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.authState);

  useEffect(() => {
    if (props.location.state && props.location.state.error) {
      this.showAlertMessage()
    }
  })

  const authData = (user) => [
    {
      key: '1',
      parameter: user.email,
      control: {
        isEmail: true,
        isPassword: false
      }
    },
    {
      key: '2',
      parameter: 'Пароль скрыт',
      control: {
        isEmail: false,
        isPassword: true
      }
    },
  ];

  const handleSubmit = () => {
    dispatch(login({ email, password }))
    props.onLogin()
  }

  const handleLoginChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
  }

  const handleRepeatPasswordChange = (event) => {
    console.log('pass repeat event', {password, repeatPassword})
    setRepeatPassword({
      value: event.target.value,
      ...validatePasswordRepeat(password.value, event.target.value)
    })
  }

  return (
    <React.Fragment>
      <Title level={2} style={{ padding: '0 20px 0 20px' }}>Личные данные</Title>
      {currentUser && (
        <Table showHeader={false} pagination={false} dataSource={authData(currentUser)}>
          <Column dataIndex="parameter" key="parameter" />
          <Column
            dataIndex="control"
            key="control"
            render={(control) => (<ChangeModal isEmail={control.isEmail} isPassword={control.isPassword}/>)}
          />
        </Table>
      )}
    </React.Fragment>

  )
}

export default withRouter(Registration)
