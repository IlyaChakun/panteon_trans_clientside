import React, {PureComponent} from 'react';
import BasketProduct from "./BasketProduct";
import {withRouter} from "react-router-dom";

import {Button, Col, Form, Input, List, notification, Popconfirm, Row} from "antd";
import {
    createOrder,
    deleteProductToBasketRequest,
    getBasketRequest,
    updateProductToBasketRequest
} from "../util/utilsAPI";
import {validateAddress, validateText} from "../common/validation/ValidationFunctions";
import {ERROR, SUCCESS} from "../../constants";
import {localizedStrings} from "../util/localization";

const {TextArea} = Input;


const layout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    },
};

class Basket extends PureComponent {

    state = {
        cartItems: [],
        totalElements: 0,
        totalPrice: 0,

        comment: {
            value: ""
        },
        address: {
            value: ""
        },
        floorNumber: {
            value: ""
        },
        entranceNumber: {
            value: ""
        },

        loading: false
    }

    componentDidMount() {
        this.setBasketState();
    }


    setBasketState = () => {
        this.setState({
            isLoading: true
        });

        const promise = getBasketRequest();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    cartItems: response.cartItems,
                    totalElements: response.totalElements,
                    totalPrice: response.totalPrice,
                });

            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    };


    // handleShippingChange = (e) => {
    //
    //     if (e.target.checked) {
    //         // this.props.addShipping();
    //         console.log('add shipping')
    //     } else {
    //         // this.props.substractShipping();
    //         console.log('remove shipping')
    //     }
    // };

    isFormInvalid = () => {
        return !(
            this.state.comment.validateStatus === SUCCESS &&
            this.state.address.validateStatus === SUCCESS &&
            this.state.floorNumber.validateStatus === SUCCESS &&
            this.state.entranceNumber.validateStatus === SUCCESS
        )
    }

    confirm = () => {
        this.handleSubmitOrder();
    };

    handleSubmitOrder = () => {
        const order = {
            "comment": this.state.comment.value,
            "address": this.state.address.value,
            "floorNumber": this.state.floorNumber.value,
            "entranceNumber": this.state.entranceNumber.value,
            "shopId": this.state.cartItems[0].product.shop.id
        }
        createOrder(order)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Заказ принят!',
                });
                this.props.history.push("/")
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось создать заказ!' + error.message,
            });
        });

        console.log('order request: ' + {...order})
    }


    render() {

        const addedItems = [];

        this.state.cartItems.forEach((productWithQuantity) => {

            addedItems.push(
                <BasketProduct
                    history={this.props.history}
                    currentUserId={this.props.match.params.id}
                    isAuthenticated={this.props.isAuthenticated}
                    key={productWithQuantity.product.id}
                    productWithQuantity={productWithQuantity}
                    deleteProductFromBasket={this.deleteProductFromBasket}
                    updateProductQuantity={this.updateProductQuantity}
                />
            )
        });

        return (
            <div className="pb-5">
                <Row justify="center">
                    <Col span={22}>
                        <Row justify="start">
                            <Col>
                                <h1>Корзина</h1>
                            </Col>
                        </Row>

                        <div className="basket-content mb-5">
                            <List
                                loading={this.state.loading}
                                grid={{
                                    gutter: 16,
                                    column: 3,
                                }}
                                dataSource={addedItems}
                                renderItem={item => (
                                    <List.Item>
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </div>

                        <div className="basket-container-footer">
                            <Form {...layout}
                                  onFinish={this.handleSubmitOrder}>

                                <Form.Item
                                    label={'Комментарий к заказу'}
                                    validateStatus={this.state.comment.validateStatus}
                                    hasFeedback
                                    onChange={(event) => this.handleInputChange(event, validateText)}
                                    help={this.state.comment.errorMsg}
                                >
                                    <TextArea
                                        rows={3}
                                        name="comment"
                                        size="middle"
                                        value={this.state.comment.value}>
                                    </TextArea>
                                </Form.Item>

                                <Form.Item
                                    label={'Адрес'}
                                    validateStatus={this.state.address.validateStatus}
                                    hasFeedback
                                    onChange={(event) => this.handleInputChange(event, validateAddress)}
                                    help={this.state.address.errorMsg}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста, введите адрес!',
                                        },
                                    ]}
                                >
                                    <Input
                                        name="address"
                                        placeholder={'Адрес'}
                                        style={{fontSize: '16px'}}
                                        autosize={{minRows: 3, maxRows: 6}}/>
                                </Form.Item>


                                <Form.Item
                                    label={'Этаж'}
                                    validateStatus={this.state.floorNumber.validateStatus}
                                    hasFeedback
                                    onChange={(event) => this.handleInputChange(event, this.validateFlourNumber)}
                                    help={this.state.floorNumber.errorMsg}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста, введите этаж!',
                                        },
                                    ]}
                                >
                                    <Input
                                        name="floorNumber"
                                        placeholder={'Этаж'}
                                        style={{fontSize: '16px'}}
                                        autosize={{minRows: 3, maxRows: 6}}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Подъезд'}
                                    validateStatus={this.state.entranceNumber.validateStatus}
                                    hasFeedback
                                    onChange={(event) => this.handleInputChange(event, this.validateEntranceNumber)}
                                    help={this.state.entranceNumber.errorMsg}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста, введите подъезд!',
                                        },
                                    ]}
                                >
                                    <Input
                                        name="entranceNumber"
                                        placeholder={'Подъезд'}
                                        style={{fontSize: '16px'}}
                                        autosize={{minRows: 3, maxRows: 6}}/>
                                </Form.Item>

                                <Form.Item wrapperCol={{span: 8, offset: 8}}>
                             <span className="quantity-cost-text">
                                Общая сумма: {this.state.totalPrice} руб. за {this.state.totalElements} товар(ов)
                            </span>
                                </Form.Item>

                                <Form.Item wrapperCol={{span: 8, offset: 8}}>

                                    <div className="buttons-position">
                                        <Popconfirm
                                            title="Вы уверены, что хотите сделать заказ?"
                                            onConfirm={this.confirm}
                                            okText="Да"
                                            cancelText="Нет">
                                            <Button type="primary"
                                                    htmlType="submit"
                                                    size="large"
                                                    disabled={!this.isFormInvalid}
                                            >
                                                Оформить заказ
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }


    deleteProductFromBasket = (productId) => {

        const productBasket = {
            "userId": this.props.currentUser.id,
            "productId": productId
        };

        deleteProductToBasketRequest(productBasket)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Продукт удален из корзины!',
                });
                this.setBasketState();
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось удалить продукт из корзину!',
            });
        });
    };


    updateProductQuantity = (flowerLengthCostId, quantity, productId) => {
        const productBasket = {
            "userId": this.props.currentUser.id,
            "flowerLengthCostId": flowerLengthCostId,
            "productId": productId,
            "quantity": quantity
        };

        updateProductToBasketRequest(productBasket)
            .then(() => {
                this.setBasketState();
            }).catch(error => {

            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось изменить кол-во в корзине!Вы выбрали больше чем доступно!',
            });
        });
    };


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

    validateFlourNumber = (number) => {
        if (!number) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Нужно ввести значение'
            }
        }

        if (number > 100) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Число слишком  большое, не более 100!'
            }
        }

        return {
            validateStatus: SUCCESS,
            errorMsg: null
        }
    }


    validateEntranceNumber = (number) => {
        if (!number) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Нужно ввести значение'
            }
        }

        if (number > 20) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Число слишком  большое, не более 20!'
            }
        }

        return {
            validateStatus: SUCCESS,
            errorMsg: null
        }
    }
}


export default withRouter(Basket);
