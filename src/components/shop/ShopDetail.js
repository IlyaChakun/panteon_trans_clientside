import React, { Component } from 'react'

import { notification, Tabs } from 'antd'

import { getShopByIdRequest, updateShopRequest } from '../util/utilsAPI'

import ShopForm from './ShopForm'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { SUCCESS } from '../../constants'
import { localizedStrings } from '../util/localization'
import { withRouter } from 'react-router-dom'
import OrderList from '../order/OrderList'
import ProductList from '../product/ProductList'

const {TabPane} = Tabs;

class ShopDetail extends Component {

    state = {
        shop: null
    }


    componentDidMount() {
        const promise = getShopByIdRequest(this.props.match.params.id);

        promise
            .then(response => {
                    this.setState({
                        shop: response
                    })
                }
            )
    }


    handleUpdateSubmit = (shopRequest) => {

        console.log('shopRequest request: ' + shopRequest)

        updateShopRequest(shopRequest, shopRequest.id).then(() => {
            notification.success({
                message: localizedStrings.alertAppName,
                description: 'Магазин обновлен!',
            })
            this.props.history.push("/company/shops/" + shopRequest.id);

        }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Чет пошло не так, провепрьте данные '
            })
        })
    }


    render() {

        const loadingIndicatorOrReadyShopForm = this.state.shop === null ?
            (
                <LoadingIndicator/>
            ) : (
                <ShopForm
                    currentUser={this.props.currentUser}
                    shop={this.state.shop}
                    action={'Изменить'}
                    validateStatus={SUCCESS}
                    handleSubmitButton={this.handleUpdateSubmit}
                />
            );

        const loadingIndicatorOrReadyFlowersListForm = this.state.shop === null ?
            (
                <LoadingIndicator/>
            ) : (
                <ProductList
                    currentUser={this.props.currentUser}
                    shopId={this.state.shop.id}/>
            );



        const loadingIndicatorOrReadyOrderListForm = this.state.shop === null ?
            (
                <LoadingIndicator/>
            ) : (
                <OrderList
                    currentUser={this.props.currentUser}
                    shopId={this.state.shop.id}/>
            );

        return (
            <div className="container-fluid">

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Изменить магазин" key="1">

                        <div>
                            {loadingIndicatorOrReadyShopForm}
                        </div>
                    </TabPane>


                    <TabPane tab="Каталог цветов" key="2">
                        <div className="container-fluid">
                            {loadingIndicatorOrReadyFlowersListForm}
                        </div>
                    </TabPane>


                    <TabPane tab="Список заказов" key="4">
                        <div className="container-fluid">
                            {loadingIndicatorOrReadyOrderListForm}
                        </div>
                    </TabPane>

                </Tabs>

            </div>

        )
    }

}


export default withRouter(ShopDetail)
