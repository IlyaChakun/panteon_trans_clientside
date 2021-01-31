import React from 'react';
import {Button, Form, Input, Modal, notification} from 'antd';
import {localizedStrings} from '../../util/localization'
import {ERROR, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, SUCCESS} from "../../../constants";
import {changeUserPassword} from "../../util/utilsAPI";

class ChangePasswordModal extends React.Component {
    state = {
        visible: false,

        currentUserId: this.props.currentUserId,

        currentPassword: {
            value: ''
        },
        newPassword: {
            value: ''
        },
        confirmedPassword: {
            value: ''
        },

    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);

        const changeUserPasswordRequest = {
            currentUserId: this.state.currentUserId,
            currentPassword: this.state.currentPassword.value,
            newPassword: this.state.newPassword.value,
        }

        changeUserPassword(changeUserPasswordRequest)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertSuccessfulUserUpdate,
                })
                this.props.history.push('/profile/me')
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: error.message || localizedStrings.alertException
            })
        })

        this.clearInputs();
    };

    handleCancel = e => {
        console.log(e);
        this.clearInputs();
    };

    clearInputs = () => {
        this.setState({
            visible: false,
            currentPassword: {
                value: ''
            },
            newPassword: {
                value: ''
            },
            confirmedPassword: {
                value: ''
            },
        });
    }

    render() {
        return (
            <div className=" float-right">
                <Button
                    type="primary"
                    style={{background: "black", color: "white"}}
                    shape="round"
                    onClick={this.showModal}
                >
                    Изменить пароль
                </Button>

                <Modal
                    title={localizedStrings.changePassword}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item
                            label={localizedStrings.currentPassword}
                            validateStatus={this.state.currentPassword.validateStatus}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                            help={this.state.currentPassword.errorMsg}
                        >
                            <Input
                                name="currentPassword"
                                size="middle"
                                type="password"
                                value={this.state.currentPassword.value}>
                            </Input>
                        </Form.Item>

                        <Form.Item
                            label={localizedStrings.newPassword}
                            validateStatus={this.state.newPassword.validateStatus}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                            help={this.state.newPassword.errorMsg}>
                            <Input
                                name="newPassword"
                                size="middle"
                                type="password"
                                value={this.state.newPassword.value}>
                            </Input>
                        </Form.Item>

                        <Form.Item
                            label={localizedStrings.confPassword}
                            validateStatus={this.state.confirmedPassword.validateStatus}
                            onChange={(event) => this.handleInputChange(event, this.validateConfirmedPassword)}
                            help={this.state.confirmedPassword.errorMsg}>
                            <Input
                                name="confirmedPassword"
                                size="middle"
                                type="password"
                                value={this.state.confirmedPassword.value}>
                            </Input>
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        console.log(target)
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        })

        if (inputName === 'newPassword') {
            if (this.state.confirmedPassword.value !== inputValue) {
                this.setState({
                    confirmedPassword: {
                        validateStatus: ERROR,
                        errorMsg: (this.state.confirmedPassword.errorMsg ?
                            this.state.confirmedPassword.errorMsg
                            :
                            localizedStrings.alertBadConfirmedPasswordNotEqual)
                    }
                })
                // this.state.confirmedPassword.validateStatus = ERROR
                // this.state.confirmedPassword.errorMsg = (this.state.confirmedPassword.errorMsg ? this.state.confirmedPassword.errorMsg :
                //     localizedStrings.alertBadConfirmedPasswordNotEqual)
            } else {

                this.setState({
                    confirmedPassword: {
                        validateStatus: SUCCESS,
                        errorMsg: null
                    }
                })


                // this.state.confirmedPassword.validateStatus = SUCCESS
                // this.state.confirmedPassword.errorMsg = null
            }
        }

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

        if (confirmedPassword !== this.state.newPassword.value) {
            return {
                validateStatus: ERROR,
                errorMsg: (validRes.errorMsg ? validRes.errorMsg : '') + localizedStrings.alertBadConfirmedPasswordNotEqual
            }
        } else {
            return {
                validateStatus: (validRes.errorMsg ? ERROR : SUCCESS),
                errorMsg: (validRes.errorMsg ? validRes.errorMsg : null),
            }
        }
    }


}


export default ChangePasswordModal