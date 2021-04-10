import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'

const {Meta} = Card

class OrderProduct extends Component {
    state = {
        id: this.props.orderProduct.id,
        flowerColor: this.props.orderProduct.product.flowerColor.colorName,
        flowerSort: this.props.orderProduct.product.flowerSort.sortNameRu,
        stemLength: this.props.orderProduct.product.flowerLengthCosts[0].stemLength,
        price: this.props.orderProduct.product.flowerLengthCosts[0].price,
        country: this.props.orderProduct.product.country.countryNameRu,
        description: this.props.orderProduct.product.description,
        imageUrl: this.props.orderProduct.product.image === null ? '' : this.props.orderProduct.product.image.imageUrl,
        quantity: this.props.orderProduct.quantity
    }

    render() {

        return (
            <Card
                bodyStyle={{padding: '10px'}}
                hoverable
                extra={'Страна поставщик: ' + this.state.country}
                title={<span>{this.state.flowerType}</span>}
            >

                <Meta
                    style={{padding: "5px"}}
                    avatar={<img alt={this.state.flowerType} src={this.state.imageUrl}/>}
                    title={
                        <Row>
                            <Col span={8}>
                                <p>
                                    Цвет: {this.state.flowerColor}
                                    <br/>
                                    Сорт: {this.state.flowerSort}
                                </p>
                                <div>
                                    <p>
                                        Длина стебля: {this.state.stemLength}
                                        <br/>
                                        Цена: {this.state.price}
                                        <br/>
                                        Кол-во: {this.state.quantity}
                                    </p>
                                </div>
                            </Col>
                            <Col span={8}>
                                Описание: {this.state.description}
                            </Col>
                            <Col span={8}>
                                Стоимость: {this.state.price * this.state.quantity}
                            </Col>
                        </Row>
                    }

                    description={
                        <div></div>
                    }
                />
            </Card>

        )
    }
}

export default OrderProduct
