import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {getClientOrders, getOrdersByShopIdRequest} from "../util/utilsAPI";
import { List, Tabs } from 'antd'
import OrderDetail from "./OrderDetail";

const { TabPane } = Tabs;

class OrderList extends Component {

    state = {

        orders: [],

        page: 1,
        size: 6,
        pagesCount: 0,

        totalPages: 0,
        totalElements: 0,

        isLoading: false
    }

    componentDidMount() {
        this.updateList()
    }

    updateList = () => {
        this.loadList(this.state.page, this.state.size)
    }

    loadList = (page, size) => {

        const searchCriteria = {
            page: page,
            size: size
        };

        if (!this.props.shopId) {
            const promise = getClientOrders(searchCriteria);
            if (!promise) {
                return;
            }
            this.extractPromise(promise);
        } else {
            const promise = getOrdersByShopIdRequest(searchCriteria, this.props.shopId);
            if (!promise) {
                return;
            }
            this.extractPromise(promise);
        }
    };


    extractPromise = (promise) => {

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                this.setState({
                    orders: response.objects.slice(),
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                });

            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    };

    render() {

        const orders = this.state.orders
            .map(order => (
                    <OrderDetail
                        key={order.id}
                        order={order}
                    />
                )
            )

        return (

          <>

              <Tabs defaultActiveKey="1" centered>
                  <TabPane tab="Активные заказы" key="1">
                      Content of Tab Pane 1
                  </TabPane>
                  <TabPane tab="Завершенные заказы" key="2">
                      Content of Tab Pane 2
                  </TabPane>
              </Tabs>


              <List
                grid={{
                    gutter: 16,
                    column: 1,
                }}

                pagination={{

                    loading: this.state.isLoading,
                    showSizeChanger: true,

                    defaultCurrent: Number(this.state.page),
                    defaultPageSize: Number(this.state.size),

                    pageSizeOptions: ["6", "9", "12"],
                    position: "bottom",

                    total: this.state.totalElements,

                    showQuickJumper: true,
                    onShowSizeChange: this.onSizeChangeHandler,
                    onChange: this.onPageChangeHandler,

                    loadMore: this.loadMore
                }}

                dataSource={orders}

                renderItem={item => (
                  <List.Item>
                      {item}
                  </List.Item>
                )}
              />
          </>
        )
    }


    onSizeChangeHandler = (page, size) => {

        this.setState({
            page: page,
            size: size
        });
        this.loadList(page, size);
    };

    onPageChangeHandler = (pageNumber) => {
        this.setState({
            page: pageNumber
        });


        this.loadList(pageNumber, this.state.size);
    };

    loadMore = () => {
        this.loadList(this.state.page + 1, this.state.size);
    }

}

export default withRouter(OrderList)
