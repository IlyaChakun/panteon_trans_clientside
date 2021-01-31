import React, {Component} from 'react'
import s from './SignUp.module.css'
import {checkLoginAvailabilityRequest, signUpRequest} from '../../util/utilsAPI'
import {ERROR, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, SUCCESS} from '../../../constants'
import {Button, Col, Form, Input, notification, Row, Select} from 'antd'
import {localizedStrings} from '../../util/localization'
import {Link} from 'react-router-dom'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import {validateEmail, validateUserName} from "../../common/validation/ValidationFunctions";

const {Option} = Select;

class Signup extends Component {

    state = {
        name: {
            value: ''
        },
        email: {
            value: ''
        },
        password: {
            value: ''
        },
        confirmedPassword: {
            value: ''
        }
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

    handleSubmit = () => {

        if (this.state.password.value !== this.state.confirmedPassword.value) {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Введенный пароль не совпал с подтверждающим'
            })
        } else {

            const signupRequest = {
                roleType: 'ROLE_CLIENT',
                name: this.state.name.value,
                email: this.state.email.value,
                password: this.state.password.value,
                confirmedPassword: this.state.confirmedPassword.value
            }

            console.log(signupRequest)

            signUpRequest(signupRequest)
                .then(() => {
                    notification.success({
                        message: localizedStrings.alertAppName,
                        description: localizedStrings.alertSuccessRegister,
                    })
                    this.props.history.push('/profile/me')
                }).catch(error => {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: error.message || localizedStrings.alertException
                })
            })
        }
    }

    isFormInvalid = () => {
        return !(this.state.name.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.password.validateStatus === SUCCESS &&
            this.state.confirmedPassword.validateStatus === SUCCESS
        )
    }


    render() {
        return (
            <div className={s.container}>
                <h1 className={s.title}>{localizedStrings.signUp}</h1>
                <div className={s.content}>
                    <Row>
                        <Col>
                            <Form {...layout}
                                  onFinish={this.handleSubmit} className={s.form}>

                                <Form.Item
                                    className={s.formItem}
                                    label={localizedStrings.name}
                                    hasFeedback
                                    validateStatus={this.state.name.validateStatus}
                                    help={this.state.name.errorMsg}>
                                    <Input
                                        prefix={<UserOutlined/>}
                                        name="name"
                                        autoComplete="off"
                                        placeholder={localizedStrings.name}
                                        value={this.state.name.value}
                                        onChange={(event) => this.handleInputChange(event, validateUserName)}/>
                                </Form.Item>
                                <Form.Item
                                    className={s.formItem}
                                    label={localizedStrings.email}
                                    hasFeedback
                                    validateStatus={this.state.email.validateStatus}
                                    help={this.state.email.errorMsg}>
                                    <Input
                                        prefix={<UserOutlined/>}
                                        name="email"
                                        type="text"
                                        autoComplete="off"
                                        placeholder={localizedStrings.emailField}
                                        value={this.state.email.value}
                                        onBlur={this.validateEmailAvailability}
                                        onChange={(event) => this.handleInputChange(event, validateEmail)}/>
                                </Form.Item>
                                <Form.Item
                                    className={s.formItem}
                                    label={localizedStrings.password}
                                    validateStatus={this.state.password.validateStatus}
                                    help={this.state.password.errorMsg}>
                                    <Input.Password
                                        prefix={<LockOutlined/>}
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder={localizedStrings.helpForPass}
                                        value={this.state.password.value}
                                        onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                                </Form.Item>
                                <Form.Item
                                    className={s.formItem}
                                    label={localizedStrings.confPassword}
                                    validateStatus={this.state.confirmedPassword.validateStatus}
                                    help={this.state.confirmedPassword.errorMsg}>
                                    <Input.Password
                                        prefix={<LockOutlined/>}
                                        name="confirmedPassword"
                                        type="password"
                                        autoComplete="off"
                                        placeholder={localizedStrings.helpForPass}
                                        value={this.state.confirmedPassword.value}
                                        onChange={(event) => this.handleInputChange(event, this.validateConfirmedPassword)}/>
                                </Form.Item>
                                <Form.Item className={s.formItem} wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        className={s.button}
                                        disabled={this.isFormInvalid()}>
                                        {localizedStrings.signUp}
                                    </Button>
                                    <br/>
                                    {localizedStrings.alreadyRegister}
                                    <Link
                                        to="/login">{localizedStrings.signUpFromLoginNow}
                                    </Link>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }


    validateEmailAvailability = () => {
        const emailValue = this.state.email.value
        const emailValidation = validateEmail(emailValue)

        if (emailValidation.validateStatus === ERROR) {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            })
            return
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        })

        checkLoginAvailabilityRequest(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: SUCCESS,
                            errorMsg: null
                        }
                    })
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: ERROR,
                            errorMsg: localizedStrings.alertLoginAlreadyRegistred
                        }
                    })
                }
            }).catch(() => {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: SUCCESS,
                    errorMsg: null
                }
            })
        })

        this.setState({
            email: {
                value: emailValue,
                validateStatus: SUCCESS,
                errorMsg: null
            }
        })
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadPasswordTooShort
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: ERROR,
                errorMsg: localizedStrings.alertBadPasswordTooLong
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            }
        }
    }

    validateConfirmedPassword = (confirmedPassword) => {
        const validRes = this.validatePassword(confirmedPassword)

        if (validRes.validateStatus !== SUCCESS && this.state.confirmedPassword !== this.state.password) {
            return {
                validateStatus: ERROR,
                errorMsg: (validRes.errorMsg ? validRes.errorMsg : '') + localizedStrings.alertBadConfirmedPasswordNotEqual
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            }
        }
    }
}

const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 15,
    },
}

export default Signup
