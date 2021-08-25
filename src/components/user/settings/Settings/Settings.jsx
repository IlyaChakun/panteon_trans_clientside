import React, { useEffect, useState } from 'react'
import { Typography, Table, Row, Col } from 'antd'
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

const { Title } = Typography
const { Column } = Table;

const Settings = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState({ value: '' })

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

  const handleRepeatPasswordChange = (event) => {
    console.log('pass repeat event', {password, repeatPassword})
    setRepeatPassword({
      value: event.target.value,
      ...validatePasswordRepeat(password.value, event.target.value)
    })
  }

  return (
    <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} >
      <Col span={24} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
      <Title level={2}>Личные данные</Title>
      {currentUser && (
        <Table showHeader={false} pagination={false} dataSource={authData(currentUser)}>
          <Column dataIndex="parameter" key="parameter" />
          <Column
            align={'right'}
            dataIndex="control"
            key="control"
            render={(control) => (<ChangeModal isEmail={control.isEmail} isPassword={control.isPassword}/>)}
          />
        </Table>
      )}
      </Col>
    </Row>
  )
}

export default withRouter(Settings)
