import React, {Component} from 'react'
import {Row, Col, Button, Card, Dropdown, Menu, message} from 'antd'
import './FlowerCard.css'
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";

const {Meta} = Card

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

class FlowerCard extends Component {

    state = {
        dateOfLastUpdate: this.props.product.dateOfLastUpdate,
        // flowerType: this.props.product.flowerType.flowerType,
        flowerColor: this.props.product.flowerColor,
        flowerSort: this.props.product.flowerSort,
        flowerLengthCosts: this.props.product.flowerLengthCosts,
        country: this.props.product.country.countryNameRu,
        description: this.props.product.description,
        availableAmountOnStock: this.props.product.availableAmountOnStock,
        shopAddress: this.props.product.shop.contacts.address,
        shopCity: this.props.product.shop.contacts.city,
        shopFirstPhoneNumber: this.props.product.shop.contacts.firstPhoneNumber,
        imageUrl: this.props.product.image === null ? '' : this.props.product.image.imageUrl,
    }

    render() {

        const flowerLengthCosts = this.state.flowerLengthCosts
            .map(lengthCost => (
                <Menu.Item
                    key={lengthCost.id}
                >
                    Длина стебля: {lengthCost.stemLength}
                    <br/>
                    Стоимость: {lengthCost.price}
                </Menu.Item>
            ))
        const flowerLengthCostsMenu = (
            <Menu onClick={handleMenuClick}>
                {flowerLengthCosts}
            </Menu>
        )
        const flowerLengthCostsDropdown = (
            <Dropdown overlay={flowerLengthCostsMenu}
                      overlayStyle={{width: '100px'}}>
                <Button>
                    Стоимость и длина <DownOutlined/>
                </Button>
            </Dropdown>
        )

        return (
            <div className="site-card-wrapper">
                <Card
                    bodyStyle={{padding: '10px'}}
                    hoverable
                    extra={'Страна поставщик: ' + this.state.country}
                    title={<span>{this.state.flowerType}</span>}
                    actions={[
                        this.props.firstAction,
                        this.props.secondAction,
                        this.state.availableAmountOnStock > 0 ? this.props.thirdAction : ''
                    ]}>

                    <Meta
                        style={{padding: "5px"}}
                        avatar={<img alt={this.state.flowerType} src={this.state.imageUrl}/>}
                        title={
                            <Row>
                                <Col span={24}>
                                    <p>
                                        {this.state.flowerColor.colorName}
                                        <br/>
                                        {this.state.flowerSort.sortName}
                                    </p>
                                    <div>
                                        {flowerLengthCostsDropdown}
                                    </div>
                                </Col>
                            </Row>
                        }

                        description={
                            <div>
                                <div className="product-content-body">
                                    <p>В наличии: {this.state.availableAmountOnStock} штук
                                        <br/>
                                        В магазине по адресу: {this.state.shopCity}, {this.state.shopAddress}
                                        <br/>
                                        Телефон: {this.state.shopFirstPhoneNumber}</p>
                                </div>

                                <div className="product-rating-footer mb-4">
                                    Последнее обновление: {this.state.dateOfLastUpdate}
                                </div>
                            </div>
                        }
                    />
                </Card>
            </div>
        )
    }
}

export default FlowerCard
