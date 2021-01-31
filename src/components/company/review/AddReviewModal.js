import React, {Component} from 'react'
import {Button, Form, Input, Modal, notification, Rate} from 'antd';
import s from "../../user/signup/SignUp.module.css";
import {localizedStrings} from "../../util/localization";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {SUCCESS} from "../../../constants";
import {saveReviewRequest} from "../../util/utilsAPI";
import PhoneOutlined from "@ant-design/icons/lib/icons/PhoneOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import MessageOutlined from "@ant-design/icons/lib/icons/MessageOutlined";
import {
    validateEmail,
    validatePhoneNumber,
    validateText,
    validateUserName
} from "../../common/validation/ValidationFunctions";


const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 15,
    },
}

class AddReviewModal extends Component {
    state = {
        name: {
            value: ''
        },
        phoneNumber: {
            value: ''
        },
        email: {
            value: ''
        },
        text: {
            value: ''
        },
        rating: {
            value: 1
        },
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleSubmit = () => {
        const reviewRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            phoneNumber: this.state.phoneNumber.value,
            text: this.state.text.value,
            rating: this.state.rating.value
        }

        console.log(reviewRequest)

        saveReviewRequest(reviewRequest)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Отзыв сохранен! Пасиба большое!',
                })

                this.props.loadMore()

                this.handleCancel()
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Чет пошло не так. сорян'
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary"
                        style={{background: "black", color: "white"}}
                        shape="round"
                        onClick={this.showModal}
                >
                    Оставить отзыв
                </Button>

                <Modal
                    title="Оставить отзыв"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    okButtonProps={{style: {display: 'none'}}}
                >

                    <Form {...layout}
                          onFinish={this.handleSubmit} className={s.form}>
                        <Form.Item
                            className={s.formItem}
                            label={localizedStrings.name}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите имя!',
                                },
                            ]}
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
                            label={'Телефон'}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите телефон!',
                                },
                            ]}
                            validateStatus={this.state.phoneNumber.validateStatus}
                            help={this.state.phoneNumber.errorMsg}>

                            <Input
                                prefix={<PhoneOutlined/>}
                                name="phoneNumber"
                                autoComplete="off"
                                placeholder={'Телефон'}
                                value={this.state.phoneNumber.value}
                                onChange={(event) => this.handleInputChange(event, validatePhoneNumber)}/>
                        </Form.Item>
                        <Form.Item
                            className={s.formItem}
                            label={localizedStrings.email}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите мыло!',
                                },
                            ]}
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                prefix={<MailOutlined/>}
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder={localizedStrings.emailField}
                                value={this.state.email.value}
                                onBlur={this.validateLoginAvailability}
                                onChange={(event) => this.handleInputChange(event, validateEmail)}/>
                        </Form.Item>
                        <Form.Item
                            className={s.formItem}
                            label={'Ваша оценка'}
                        >
                            <Rate
                                name="rating"
                                onChange={this.handleRatingChange}
                                value={this.state.rating.value}/>
                        </Form.Item>
                        <Form.Item
                            className={s.formItem}
                            label={'Текст отзыва:'}
                            validateStatus={this.state.text.validateStatus}
                            help={this.state.text.errorMsg}>
                            <Input.TextArea
                                prefix={<MessageOutlined/>}
                                name="text"
                                type="text"
                                autoComplete="off"
                                placeholder={'Текст отзыва'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите текст отзыва!',
                                    },
                                ]}
                                value={this.state.text.value}
                                onChange={(event) => this.handleInputChange(event, validateText)}/>
                        </Form.Item>
                        <Form.Item className={s.formItem} wrapperCol={{...layout.wrapperCol, offset: 8}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className={s.button}
                                disabled={this.isFormInvalid()}>
                                Отправить
                            </Button>
                        </Form.Item>
                    </Form>


                </Modal>
            </div>

        );
    }


    isFormInvalid = () => {
        return !(this.state.name.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.phoneNumber.validateStatus === SUCCESS &&
            this.state.text.validateStatus === SUCCESS
        )
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        console.log('inputName: ' + inputName)
        console.log('inputValue: ' + inputValue)

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        })
    }

    handleRatingChange = inputValue => {
        console.log('handleRatingChange: ' + inputValue)

        this.setState({
            rating: {
                value: inputValue,
                validateStatus: SUCCESS,
                errorMsg: null
            }
        });
    }


}

export default AddReviewModal


