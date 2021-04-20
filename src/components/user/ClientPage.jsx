import React from 'react'
import { Col, Row } from 'antd'
import OrderList from '../order/OrderList'

const ClientPage = (props) => {
  return (
    <Row justify='center'>
      <Col span={22}>
        <h2>Список заказов:</h2>
        <OrderList
          userId={props.userId}
          userType={props.userType}
          currentUser={props.currentUser}
        />
      </Col>
    </Row>
  )
}

export default ClientPage
