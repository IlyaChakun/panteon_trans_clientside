import React, {Component} from 'react';
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {InputNumber, notification, Popconfirm} from "antd";

import ProductCard from "../product/ProductCard";
import {localizedStrings} from "../util/localization";


class BasketProduct extends Component {

    state = {
        quantity: this.props.productWithQuantity.quantity
    };

    confirm = (e) => {
        this.props.deleteProductFromBasket(this.props.productWithQuantity.product.id)
    };


    updateProductCount = (quantity) => {
        if (quantity >= 1 && quantity < 99) {
            if (Number(quantity) !== 0) {
                const productId = this.props.productWithQuantity.product.id;
                const flowerLengthCostId = this.props.productWithQuantity.flowerLengthCost.id

                this.props.updateProductQuantity(flowerLengthCostId, quantity, productId);
            }
            this.setState({
                quantity: quantity
            });
        } else {
            this.setState({
                quantity: this.props.productWithQuantity.quantity
            });
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Количество должно быть не менее 0 и не более 99',
            });
        }
    };


    customFormatter = (value) => {
        return value < 1 || value > 99 ? this.state.quantity : value;
    };


    render() {

        const deleteAction = (
            <div>
                <Popconfirm
                    title="Вы уверены, что хотите удалить продукт из корзины?"
                    onConfirm={this.confirm}
                    okText="Да"
                    cancelText="Нет">
                    <DeleteOutlined style={{fontSize: '25px'}}/>
                </Popconfirm>
            </div>);

        const countAction = (
            <div>
                <InputNumber
                    key={"quantityPicker"}
                    defaultValue={this.state.quantity}
                    value={this.state.quantity}
                    type={'number'}
                    min={1}
                    max={this.props.productWithQuantity.product.availableAmountOnStock}
                    formatter={this.customFormatter}
                    onChange={this.updateProductCount}
                />

                <span className="quantity-cost-text">
                    Стоимость:
                    {Number(this.props.productWithQuantity.quantity * this.props.productWithQuantity.flowerLengthCost.price)}
                </span>
            </div>
        );


        return (
                <ProductCard
                    history={this.props.history}
                    currentUserId={this.props.currentUserId}
                    isAuthenticated={this.props.isAuthenticated}
                    key={this.props.productWithQuantity.product.id}
                    product={this.props.productWithQuantity.product}
                    secondAction={deleteAction}
                    thirdAction={countAction}
                />
        );
    }
}


export default BasketProduct;
