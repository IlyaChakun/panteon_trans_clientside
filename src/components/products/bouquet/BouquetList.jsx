import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Col, List, Row} from 'antd'
import {getBouquetsByShopIdRequest, getBouquetsRequest} from "../../util/utilsAPI";
import AddBouquetModal from "./AddBouquetModal";
import BouquetCardProxy from "./BouquetCardProxy";


class BouquetList extends Component {

    state = {

        shopId: this.props.shopId,

        bouquets: [],

        page: 1,
        size: 6,
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


    // loadSearchList = (productName, minPrice, maxPrice, sortBy, sortType, checkedBrands) => {
    //     this.loadList(this.state.page, this.state.size, productName, minPrice, maxPrice, sortBy, sortType, checkedBrands);
    // };


    loadList = (page, size, minPrice, maxPrice, sortBy, sortType) => {


        const searchCriteria = {
            page: page,
            size: size,

            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: sortBy,
            sortType: sortType
        };

        if (!this.state.shopId) {
            const promise = getBouquetsRequest(searchCriteria);
            if (!promise) {
                return;
            }
            this.extractPromise(promise);
        } else {
            const promise = getBouquetsByShopIdRequest(searchCriteria, this.state.shopId);
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
                    bouquets: response.objects.slice(),
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
        const addProductButton = this.props.shopId === undefined ? '' :
            (
                <AddBouquetModal shopId={this.props.shopId}
                                 updateList={this.updateList}
                />

            )

        const bouquets = this.state.bouquets
            .map(bouquet => (
                    <BouquetCardProxy
                        history={this.props.history}
                        currentUser={this.props.currentUser}
                        isAuthenticated={this.props.isAuthenticated}
                        key={bouquet.id}

                        product={bouquet}
                        productId={bouquet.id}
                        shopId={bouquet.shop.id}
                    />
                )
            )

        return (
            <div className="pb-5">
                <Row justify="center">
                    <Col span={22}>
                        <Row justify="space-between">
                            <Col span={4}>
                                <h1>Букеты</h1>
                            </Col>
                            <Col span={4}>
                                {addProductButton}
                            </Col>
                        </Row>

                        <List
                            grid={{
                                gutter: 16,
                                column: 3,
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

                            dataSource={bouquets}

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

        console.log('onPageChangeHandler')
        console.log('pageNumber', pageNumber)
        console.log('totalElements', this.state.totalElements)
        console.log('totalPages', this.state.totalPages)

        this.setState({
            page: pageNumber
        });


        this.loadList(pageNumber, this.state.size);
    };

    loadMore = () => {

        console.log('LOAD MORE WORKS')

        this.loadList(this.state.page + 1, this.state.size);
    }

}

export default withRouter(BouquetList)

