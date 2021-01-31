import React, {Component} from 'react'
import {localizedStrings} from '../../util/localization'
import {Button, Form, Input, notification, Tabs} from "antd";
import s from './Profile.module.css'

import ChangePasswordModal from "../modal/ChangePasswordModal";

import {SUCCESS} from "../../../constants";
import {updateUserProfileRequest} from "../../util/utilsAPI";
import {validatePhoneNumber, validateUserName} from "../../common/validation/ValidationFunctions";
import ImageLoader from "../../common/image/ImageLoader";
import {withRouter} from "react-router-dom";
import OrderList from "../../order/OrderList";
import LoadingIndicator from "../../common/util/LoadingIndicator";

const {TabPane} = Tabs;


const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 15,
    },
}

class Profile extends Component {

    state = {
        currentUser: this.props.currentUser,

        name: {
            value: this.props.currentUser.name,
            validateStatus: SUCCESS,
            errorMsg: null
        },
        email: {
            value: this.props.currentUser.email,
            validateStatus: SUCCESS
        },
        phoneNumber: {
            value: this.props.currentUser.phoneNumber,
            validateStatus: SUCCESS,
            errorMsg: null
        },

        imageUrl: this.props.currentUser.image === null ? '' : this.props.currentUser.image.imageUrl
    }


    handleSubmit = () => {
        const updateUserRequest = {
            id: this.state.currentUser.id,
            name: this.state.name.value,
            phoneNumber: this.state.phoneNumber.value,
            image: {
                imageUrl: this.state.imageUrl
            }
        }

        console.log(updateUserRequest)

        updateUserProfileRequest(updateUserRequest)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertSuccessfulUserUpdate,
                })
                // this.props.history.push('/profile')
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: error.message || localizedStrings.alertException
            })
        })
    }


    render() {

        const loadingIndicatorOrReadyOrderListForm = this.state.currentUser === null ?
            (
                <LoadingIndicator/>
            ) : (
                <OrderList currentUser={this.props.currentUser}/>
            );

        return (
            <div className="container py-5 px-3 mb-5">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Личный кабинет" key="1">
                        <div className="col-sm-12 mb-5">
                            <Form {...layout}
                                  onFinish={this.handleSubmit} className={s.form}>

                                <div className="row mb-5">
                                    <div className="col-sm-6">
                                        <ImageLoader
                                            imageUrl={this.state.imageUrl}
                                            handleImageUrlChange={this.handleImageUrlChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Form.Item
                                            className={s.formItem}
                                            label='Ваше имя'
                                            validateStatus={this.state.name.validateStatus}
                                            hasFeedback={!this.isFormInvalid()}
                                            onChange={(event) => this.handleInputChange(event, validateUserName)}
                                            help={this.state.name.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите ваше имя!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                name="name"
                                                type=""
                                                size="middle"
                                                value={this.state.name.value}>
                                            </Input>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label='Email'
                                            validateStatus={this.state.email.validateStatus}
                                        >
                                            <Input
                                                type="email"
                                                name="email"
                                                size="middle"
                                                disabled={true}
                                                value={this.state.email.value}>
                                            </Input>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label='Номер телефона'
                                            validateStatus={this.state.phoneNumber.validateStatus}
                                            hasFeedback={!this.isFormInvalid()}
                                            onChange={(event) => this.handleInputChange(event, validatePhoneNumber)}
                                            help={this.state.phoneNumber.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите ваш телефон!',
                                                },
                                            ]}
                                        >

                                            <Input
                                                name="phoneNumber"
                                                size="middle"
                                                value={this.state.phoneNumber.value}>
                                            </Input>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="row mb-5 d-flex justify-content-end">
                                    <div className="col-3">
                                        <Form.Item className={s.formItem}>
                                            <Button
                                                htmlType="submit"
                                                type="primary"
                                                style={{background: "black", color: "white"}}
                                                shape="round"
                                                disabled={this.isFormInvalid()}
                                            >
                                                Изменить профиль
                                            </Button>
                                        </Form.Item>
                                    </div>
                                    <div className="col-3">
                                        <ChangePasswordModal currentUserId={this.state.currentUser.id}/>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </TabPane>
                    <TabPane tab="Ваши заказы" key="2">
                        {loadingIndicatorOrReadyOrderListForm}
                    </TabPane>
                </Tabs>
            </div>
        )
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

    isFormInvalid = () => {
        return !(
            this.state.name.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.phoneNumber.validateStatus === SUCCESS
        )
    }


    handleImageUrlChange = (imageUrl) => {
        this.setState({
            imageUrl: imageUrl
        })
    }

}

export default withRouter(Profile)

