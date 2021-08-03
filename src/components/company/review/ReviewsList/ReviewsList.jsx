import React, { useEffect, useState } from 'react'

import ReviewCard from '../ReviewCard/ReviewCard'
import AddReviewModal from '../AddReview/AddReviewModal'
import { Col, Row, List, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getReviews } from '../../../../redux/actions/review'
import { useQueryParam, NumberParam } from 'use-query-params';

const { Title } = Typography

const ReviewsList = (props) => {
  const dispatch = useDispatch()
  const { reviews, totalElements } = useSelector(state => state.reviewState)

  const [page, setPage] = useQueryParam('page', NumberParam)
  const [size, setPageSize] = useQueryParam('size', NumberParam)

  const [pagesCount, setPagesCount] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadList(page, size)
  }, [page, size])

  const loadList = (page, size) => {
    const searchCriteria = {
      page: page,
      size: size
    }
    dispatch(getReviews(searchCriteria))
  }

  const onSizeChangeHandler = (page, size) => {
    setPage(page)
    setPageSize(size)
  }

  const onPageChangeHandler = (pageNumber) => {
    setPage(pageNumber)
  }

  const reviewList = reviews.map(review => (
      <ReviewCard
        key={review.id}
        review={review}
      />
    )
  )

  return (
    <Row justify="center" style={{ padding: '30px', minHeight: 'calc(100vh - 60px)' }}>
      <Col span={20}>
        <Row style={{width: '100%'}}>
          <Title level={1}>Отзывы</Title>
        </Row>
        <Row style={{ width: '100%', marginBottom: '20px' }}>
          <AddReviewModal isCompany={false}/>
        </Row>
        <Row>
          {reviews.length && (
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
                showSizeChanger: true,
                defaultCurrent: page || 1,
                defaultPageSize: size || 3,
                pageSizeOptions: ["3", "6", "9"],
                position: "bottom",
                total: totalElements,
                showQuickJumper: true,
                onShowSizeChange: onSizeChangeHandler,
                onChange: onPageChangeHandler,
              }}
              dataSource={reviewList}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default ReviewsList
