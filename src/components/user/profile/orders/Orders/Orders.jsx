import React, { useState } from 'react'
import { Row, Col, Tabs } from 'antd'
import { withRouter } from 'react-router-dom'

const { TabPane } = Tabs

const Orders = (props) => {

  return (
    <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} >
      <Col span={24} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="На согласовании" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="В исполнении" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Выполненные" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Отменённые" key="4">
            Content of Tab Pane 4
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default withRouter(Orders)
