import React from 'react'

import './FlowerCard.css'
import {isAdmin} from '../../../app/App'
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import {addProductToBasketRequest} from "../../util/utilsAPI";
import {notification} from 'antd'
import {localizedStrings} from "../../util/localization";
import {useSelector} from "react-redux";
import {authSelector} from "../../../redux/reducers/AuthSliceReducer";


const ProductCardProxy = () => {

    const {currentUser, isAuthenticated} = useSelector(authSelector)

    const addToBasket = () => {
        const productBasket = {
            "userId": currentUser.id,
            "flowerLengthCostId": this.props.product.flowerLengthCosts[0].id,
            "productId": this.props.product.id,
            "quantity": 1,
            "shopId": this.props.shopId
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


    const editAction = (
        <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
            <EditFlowerModal
                shopId={this.props.shopId}
                productId={this.props.productId}
            />
        </div>
    )
    const deleteAction = (
        <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
            <DeleteFlowerModal
                productId={this.props.product.id}
                button={
                    <DeleteOutlined style={{fontSize: '25px'}}/>
                }/>
        </div>)

    const buyAction = (
        <div className={isAdmin(currentUser) ? 'custom-hidden' : ''}
             onClick={() => this.addToBasket()}>
            <i className="fas fa-shopping-cart"></i>
        </div>
    )

    return (
        <FlowerCard
            key={this.props.productId}
            product={this.props.product}
            firstAction={editAction}
            secondAction={deleteAction}
            thirdAction={buyAction}
        />
    )

}

export default ProductCardProxy
