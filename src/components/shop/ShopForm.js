import React, {Component} from 'react'
import {localizedStrings} from '../util/localization'

import s from "../user/profile/Profile.module.css";
import {Button, Form, Input} from "antd";

import {ERROR, SUCCESS,} from "../../constants";

import ImageLoader from "../common/image/ImageLoader";
import {
    validateAddress,
    validateCity,
    validateEmail,
    validatePhoneNumber
} from "../common/validation/ValidationFunctions";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

class ShopForm extends Component {


    state = {
        id: this.props.shop.id,

        firstPhoneNumber: {
            value: this.props.shop.contacts.firstPhoneNumber,
            validateStatus: this.props.validateStatus
        },
        secondPhoneNumber: {
            value: this.props.shop.contacts.secondPhoneNumber,
            validateStatus: this.props.validateStatus
        },
        email: {
            value: this.props.shop.contacts.email,
            validateStatus: this.props.validateStatus
        },
        city: {
            value: this.props.shop.contacts.city,
            validateStatus: this.props.validateStatus
        },
        address: {
            value: this.props.shop.contacts.address,
            validateStatus: this.props.validateStatus

        },
        workingHours: {
            value: this.props.shop.workingHours.hours,
            validateStatus: this.props.validateStatus
        },

        imageUrl: this.props.shop.image === null ? '' : this.props.shop.image.imageUrl

    }


    isFormInvalid = () => {

        return !(
            this.state.firstPhoneNumber.validateStatus === SUCCESS &&
            this.state.secondPhoneNumber.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.city.validateStatus === SUCCESS &&
            this.state.address.validateStatus === SUCCESS &&
            this.state.workingHours.validateStatus === SUCCESS
        )
    }

    handleSubmit = () => {
        const shopRequest = {
            "id": this.state.id,

            "contacts": {
                "firstPhoneNumber": this.state.firstPhoneNumber.value,
                "secondPhoneNumber": this.state.secondPhoneNumber.value,
                "email": this.state.email.value,
                "city": this.state.city.value,
                "address": this.state.address.value,
            },
            "workingHours": {
                "hours": this.state.workingHours.value
            },
            "image": {
                "imageUrl": this.state.imageUrl
            }
        }

        console.log('shop request: ' + shopRequest)

        this.props.handleSubmitButton(shopRequest);
    }


    render() {

        return (

            <div>
                <div>
                    <div>
                        <Form {...layout}
                              onFinish={this.handleSubmit}
                              initialValues={{
                                  'city': this.state.city.value,
                                  'firstPhoneNumber': this.state.firstPhoneNumber.value,
                                  'secondPhoneNumber': this.state.secondPhoneNumber.value,
                                  'email': this.state.email.value,
                                  'address': this.state.address.value,
                                  'workingHours': this.state.workingHours.value
                              }}
                        >

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ImageLoader
                                            imageUrl={this.state.imageUrl}
                                            handleImageUrlChange={this.handleImageUrlChange}
                                        />
                                    </div>

                                    <div className="col-sm-6">

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Город'}
                                            validateStatus={this.state.city.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, validateCity)}
                                            help={this.state.city.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите город магазина!',
                                                },
                                            ]}
                                            name="city"
                                        >
                                            <Input
                                                name="city"
                                                placeholder={'Город'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Адрес магазина'}
                                            validateStatus={this.state.address.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, validateAddress)}
                                            help={this.state.address.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите адрес магазина!',
                                                },
                                            ]}
                                            name="address"
                                        >
                                            <Input
                                                name="address"
                                                placeholder={'Адрес'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Номер телефона'}
                                            validateStatus={this.state.firstPhoneNumber.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, validatePhoneNumber)}
                                            help={this.state.firstPhoneNumber.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите контакный номер!',
                                                },
                                            ]}
                                            name="firstPhoneNumber"
                                        >
                                            <Input
                                                name="firstPhoneNumber"
                                                placeholder={'Номер телефона'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Второй номер телефона'}
                                            validateStatus={this.state.secondPhoneNumber.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, validatePhoneNumber)}
                                            help={this.state.secondPhoneNumber.errorMsg}
                                            name="secondPhoneNumber"
                                        >
                                            <Input
                                                name="secondPhoneNumber"
                                                placeholder={'Второй номер телефона'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Емаил магазина'}
                                            validateStatus={this.state.email.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, validateEmail)}
                                            help={this.state.email.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите электронную почту!',
                                                },
                                            ]}
                                            name="email"
                                        >
                                            <Input
                                                name="email"
                                                placeholder={'Электронная почта'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Рабочее время магазина'}
                                            validateStatus={this.state.workingHours.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, this.validateWorkingHours)}
                                            help={this.state.workingHours.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите рабочее время магазина!',
                                                },
                                            ]}
                                            name="workingHours"
                                        >

                                            <Input
                                                name="workingHours"
                                                placeholder={'рабочее время'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8"></div>
                                    <div className="col-4">
                                        <Form.Item className={s.formItem}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                className={s.button}
                                                disabled={this.isFormInvalid()}>
                                                {this.props.action}
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>


                </div>

            </div>


        )
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        console.log('handle input change')
        console.log('inputName= ' + inputName)
        console.log('inputValue= ' + inputValue)

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        })
    }

    handleImageUrlChange = (imageUrl) => {
        this.setState({
            imageUrl: imageUrl
        })
    }

    validateWorkingHours = (hours) => {

        console.log('hours for validation : ' + hours)

        if (hours === undefined) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertCompanyLicenceNumberTooLong
            }
        }

        return {
            validateStatus: SUCCESS,
            errorMsg: null
        }
    }

}

export default ShopForm
