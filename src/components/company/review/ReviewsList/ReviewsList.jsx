import React, { useEffect, useState } from 'react'

import ReviewCard from '../ReviewCard/ReviewCard'
import AddReviewModal from '../AddReview/AddReview'
import { Col, List, Row, Typography } from 'antd'
import { getAllReviews } from '../../../../service/ReviewService'

const { Title } = Typography

const ReviewsList = (props) => {
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(3)
  const [pagesCount, setPagesCount] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadList(page, size)
  })

  const loadList = (page, size) => {
    const promise = getAllReviews()
    if (!promise) {
      return
    }
    // setReviews(promise.objects)
    // setTotalPages(promise.totalPages)
    // setTotalElements(promise.totalElements)
  }

  const onSizeChangeHandler = (page, size) => {
    setPage(page)
    setSize(size)
    loadList(page, size);
  }

  const onPageChangeHandler = (pageNumber) => {
    setPage(pageNumber)
    loadList(pageNumber, size)
  }

  const reviewList = reviews.map(review => (
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
          <AddReviewModal />
        </Row>
        <Row>
          {/*<List*/}
          {/*  grid={{*/}
          {/*    gutter: 16,*/}
          {/*    column: 3,*/}
          {/*    xs: 1,*/}
          {/*    sm: 1,*/}
          {/*    md: 2,*/}
          {/*    lg: 3*/}
          {/*  }}*/}
          {/*  pagination={{*/}
          {/*    showSizeChanger: true,*/}
          {/*    defaultCurrent: Number(page),*/}
          {/*    defaultPageSize: Number(size),*/}
          {/*    pageSizeOptions: ["3", "6", "9"],*/}
          {/*    position: "bottom",*/}
          {/*    total: totalElements,*/}
          {/*    onShowSizeChange: onSizeChangeHandler,*/}
          {/*    onChange: onPageChangeHandler,*/}
          {/*  }}*/}
          {/*  dataSource={reviewList}*/}
          {/*  renderItem={item => (*/}
          {/*    <List.Item>*/}
          {/*      {item}*/}
          {/*    </List.Item>*/}
          {/*  )}*/}
          {/*/>*/}
        </Row>
      </Col>
    </Row>
  )
}

export default ReviewsList
