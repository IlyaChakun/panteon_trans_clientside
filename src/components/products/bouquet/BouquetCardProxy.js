import React, {Component} from 'react'

import {isAdmin} from '../../../app/App'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'

import DeleteBouquetModal from "./DeleteBouquetModal";
import EditBouquetModal from "./EditBouquetModal";
import BouquetCard from "./BouquetCard";
import {addProductToBasketRequest} from "../../util/utilsAPI";
import {localizedStrings} from "../../util/localization";
import {notification} from "antd";
import {USER_ID} from "../../../constants";

class BouquetCardProxy extends Component {
    state = {}

    addToBasket = () => {
        const productBasket = {
            "userId": localStorage.getItem(USER_ID),
            "flowerLengthCostId": this.props.product.flowerLengthCosts[0].id,
            "productId": this.props.product.id,
            "quantity": 1
        };

        addProductToBasketRequest(productBasket)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Продукт добавлен в корзину!',
                });
            }).catch(error => {

            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось добавить продукт в корзину!',
            });
        });
    };

    render() {

        const editAction = (
            <div className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                <EditBouquetModal
                    shopId={this.props.shopId}
                    productId={this.props.productId}
                />
            </div>
        )

        const deleteAction = (
            <div className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                <DeleteBouquetModal
                    productId={this.props.product.id}
                    button={
                        <DeleteOutlined style={{fontSize: '25px'}}/>
                    }/>
            </div>)

        const buyAction = (
            <div className={isAdmin(this.props.currentUser) ? 'custom-hidden' : ''}
                 onClick={() => this.addToBasket()}>
                <i className="fas fa-shopping-cart"></i>
                {/*<PlusCircleOutlined style={{fontSize: '27px', color: '#cc3242'}}/>*/}
            </div>
        )

        return (
            <BouquetCard
                key={this.props.productId}
                product={this.props.product}
                firstAction={editAction}
                secondAction={deleteAction}
                thirdAction={buyAction}
            />
        )
    }
}

export default BouquetCardProxy
