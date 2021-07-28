import React, { Component } from 'react'

import ReviewCard from '../ReviewCard/ReviewCard'
import { getAllReviewsRequest } from '../../../../util/utilsAPI'
import AddReviewModal from '../AddReview/AddReview'
import { Col, List, Row, Typography } from 'antd'
import { getAllReviews } from '../../../../service/ReviewService'

const { Title } = Typography

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
                    <ReviewCard
                      key={review.id}
                      review={review}
                    />
                )
            )

        return (
          <Row justify="center" style={{ padding: '30px' }}>
            <Col span={20}>
              <Row style={{width: '100%'}}>
                <Title level={1}>Отзывы</Title>
              </Row>
              <Row style={{ width: '100%', marginBottom: '20px' }}>
                <AddReviewModal loadMore={this.loadMore}/>
              </Row>
              <Row>
                <List
                  grid={{
                    gutter: 16,
                    column: 3,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3
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
              </Row>
            </Col>
          </Row>
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
