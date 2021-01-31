import React, {Component} from 'react'
import {Button, Form, Input, notification} from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import {localizedStrings} from '../../util/localization'
import {Link} from 'react-router-dom'
import s from './Login.module.css'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../constants'
import {loginRequest} from '../../util/utilsAPI'
import SocialLogin from './SocialLogin'
import "./Login.module.css"

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = () => {
        const emailRequest = {
            email: this.state.email,
            password: this.state.password
        }
        loginRequest(emailRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken)
                localStorage.setItem(REFRESH_TOKEN, response.refreshToken)

                this.props.onLogin()
            }).catch(() => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: localizedStrings.alertWrongEmailOrPassword
            })
        })
    }

    handleLoginChange = (event) => {
        const value = event.target.value
        this.setState({
            email: value
        })
    }

    handlePasswordChange = (event) => {
        const value = event.target.value
        this.setState({
            password: value
        })
    }

    render() {
        return (
            <Form
                className={s.form}
                onFinish={this.handleSubmit}>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: localizedStrings.alertBadEmail}]}
                    onChange={this.handleLoginChange}>

                    <Input prefix={<UserOutlined/>}
                           size="large"
                           type={"email"}
                           name="email"
                           placeholder={localizedStrings.email}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: localizedStrings.alertBadPassword}]}
                    onChange={this.handlePasswordChange}>

                    <Input.Password
                        prefix={<LockOutlined/>}
                        autoComplete={"current-password"}
                        size="large"
                        name="password"
                        type="password"
                        placeholder={localizedStrings.password}/>
                </Form.Item>

                <SocialLogin/>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">
                        {localizedStrings.login}
                    </Button>
                    {localizedStrings.or}
                    <Link to="/sign-up">
                        {localizedStrings.loginFormRegisterNow}
                    </Link>
                </Form.Item>

            </Form>

        )
    }
}

export default LoginForm
