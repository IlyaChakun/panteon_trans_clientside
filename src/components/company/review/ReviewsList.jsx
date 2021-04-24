import React, { Component } from 'react'

import ReviewCard from './ReviewCard'
import { getAllReviewsRequest } from '../../util/utilsAPI'
import AddReviewModal from './AddReviewModal'
import './ReviewsBlock.css'
import { Col, List, Row } from 'antd'
import { getAllReviews } from '../../../service/ReviewService'


class ReviewsList extends Component {
    state = {
        reviews: [],

        page: 1,
        size: 3,
        pagesCount: 0,

        searchString: '',

        totalPages: 0,
        totalElements: 0,

        isLoading: false
    }


    componentDidMount() {
        this.loadList(this.state.page, this.state.size)
    }

    loadList = (page, size) => {

        const searchCriteria = {
            page: page,
            size: size
        };

        // const promise = getAllReviewsRequest(searchCriteria);
        const promise = getAllReviews();

        console.log(JSON.stringify(promise))
        if (!promise) {
            return;
        }

        this.setState({
            reviews: promise.objects,
            totalPages: promise.totalPages,
            totalElements: promise.totalElements,
        });

        // this.extractPromise(promise);
    };


    extractPromise = (promise) => {

        this.setState({
            isLoading: true
        });

        // promise
        //     .then(response => {

                this.setState({
                    reviews: promise.objects.slice(),
                    totalPages: promise.totalPages,
                    totalElements: promise.totalElements,
                });

            // }).catch(() => {
            this.setState({
                isLoading: false
            });
        // });
    };


    render() {
        const reviews = this.state.reviews
            .map(review => (
                    <ReviewCard key={review.id}
                                review={review}
                    />
                )
            )

        return (
            <div className="review-block">
                <Row justify="center">
                    <Col span={22}>
                        <Row justify="space-between">
                            <Col span={4}>
                                <h1>Отзывы</h1>
                            </Col>
                            <Col span={4}>
                                <AddReviewModal loadMore={this.loadMore}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className="reviews">
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

                            pageSizeOptions: ["3", "6", "9"],
                            position: "bottom",

                            total: this.state.totalElements,

                            onShowSizeChange: this.onSizeChangeHandler,
                            onChange: this.onPageChangeHandler,

                            loadMore: this.loadMore
                        }}

                        dataSource={reviews}

                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>
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

export default ReviewsList
