import React, { Component } from 'react'
import ShopCard from './ShopCard'
import { withRouter } from 'react-router-dom'
import MapContainer from '../common/map/MapContainer'
import AddShopModal from './AddShopModal'
import { getAllShopsRequest } from '../util/utilsAPI'
import { Col, List, Row } from 'antd'
import Link from 'react-router-dom/Link'
import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined'

class ShopsList extends Component {

    state = {
        shops: [],

        page: 1,
        size: 2,
        pagesCount: 0,

        searchString: '',

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


    loadList = (page, size, minPrice, maxPrice, sortBy, sortType) => {

        const searchCriteria = {
            page: page,
            size: size,

            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: sortBy,
            sortType: sortType,


            currentUser: this.props.currentUser
        };

        const promise = getAllShopsRequest(searchCriteria);
        if (!promise) {
            return;
        }
        this.extractPromise(promise);
    };


    extractPromise = (promise) => {

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {

                this.setState({
                    shops: response.objects.slice(),
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

        const shopElements = this.state.shops
            .map(shop => (
                    <ShopCard key={shop.id}
                              shop={shop}
                              currentUser={this.state.currentUser}
                              firstAction={
                                  <Link
                                      to={'/company/shops/' + shop.id}>
                                      {/*<span className={isAdmin(this.state.currentUser) ? '' : 'custom-hidden'}>*/}
                                      <SettingOutlined style={{fontSize: '25px'}}/>
                                      {/*</span>*/}
                                  </Link>
                              }
                    />
                )
            )

        return (
            <div className="mb-5">
                <div className="contacts_map mb-5">
                    <Row>
                        <Col span={24}>
                            <div id="map-block" style={{height: '550px'}}>
                                <MapContainer
                                    google={this.props.google}
                                    center={{lat: 53.893009, lng: 27.567444}}
                                    height='550px'
                                    zoom={14}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

                <Row justify="center">
                    <Col span={22}>

                        <Row justify="space-between">
                            <Col span={8}>
                                <h1>Наши магазины</h1>
                            </Col>
                            <Col span={4}>
                                <AddShopModal updateList={this.updateList}/>
                            </Col>
                        </Row>

                        <List
                            grid={{
                                gutter: 16,
                                column: 2,
                            }}

                            pagination={{

                                loading: this.state.isLoading,
                                showSizeChanger: true,

                                defaultCurrent: Number(this.state.page),
                                defaultPageSize: Number(this.state.size),

                                pageSizeOptions: ["2", "4"],
                                position: "bottom",

                                total: this.state.totalElements,

                                showQuickJumper: true,
                                onShowSizeChange: this.onSizeChangeHandler,
                                onChange: this.onPageChangeHandler,

                                loadMore: this.loadMore
                            }}

                            dataSource={shopElements}

                            renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
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

export default withRouter(ShopsList)
