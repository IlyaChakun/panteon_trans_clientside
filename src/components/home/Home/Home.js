import React from 'react'

import { withRouter } from 'react-router-dom'
import ReviewsList from '../../company/review/ReviewsList/ReviewsList'
import { Col, Row, Tabs } from 'antd'
import CompanyList from '../../company/CompanyList/CompanyList'
import TransportList from '../../transport/TransportList/TransportList'
import CargoList from '../../cargo/CargoList/CargoList'

const { TabPane } = Tabs

function Home () {
  return (
    <Row>
      <Col span={24}>

        <Row justify="center">
          <Col span={20}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Компании" key="1">
                <CompanyList />
              </TabPane>
              <TabPane tab="Транспорт" key="2">
                <TransportList />
              </TabPane>
              <TabPane tab="Грузы" key="3">
                <CargoList />
              </TabPane>
            </Tabs>

          </Col>
        </Row>

        <Row justify="center">
          <Col span={20}>
            <ReviewsList />
          </Col>
        </Row>

      </Col>
    </Row>
  )
}

export default withRouter(Home)
