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
    <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} >
      <Col span={24} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
      <Title level={2}>Личные данные</Title>
      {currentUser && (
        <React.Fragment>
          <Table
              showHeader={false}
              pagination={false}
              dataSource={authData(currentUser)}
              style={{ marginBottom: '25px' }}
          >
            <Column dataIndex="parameter" key="parameter" />
            <Column
                align={'right'}
                dataIndex="control"
                key="control"
                render={(control) => (<ChangeModal
                    isEmail={control.isEmail}
                    isName={control.isName}
                    isSurname={control.isSurname}
                    isLastname={control.isLastname}
                />)}
            />
          </Table>
          <ChangeModal isPassword={true} >
            Изменить пароль
          </ChangeModal>
        </React.Fragment>
      )}
      </Col>
    </Row>
  )
}

export default withRouter(Settings)
