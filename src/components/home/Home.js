import React from 'react'

import {withRouter} from 'react-router-dom'
import ReviewsList from '../company/review/ReviewsList'
import ShopsBlock from '../shop/ShopsBlock'
import FlowersList from '../products/flower/FlowersList'
import {Col, Row} from 'antd'
import CarouselComponent from '../common/carousel/CarouselComponent'

function Home() {
  return (
      <Row>
        <Col span={24}>
          <div className="mb-5">
            <CarouselComponent/>
          </div>
          <FlowersList/>
          <Row justify="center">
            <Col span={20}>
              <ReviewsList/>
            </Col>
          </Row>
          <ShopsBlock/>
        </Col>
      </Row>
  )
}

export default withRouter(Home)
