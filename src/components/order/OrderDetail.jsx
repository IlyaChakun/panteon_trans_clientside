import React from 'react'
import { Button, Card, Col, Row } from 'antd'
import { Link, withRouter } from 'react-router-dom'

const { Meta } = Card

function OrderDetail (props) {
// 1 -> id of Самовывоз
  const deliveryInfo = props.order.orderDeliveryInfo.deliveryType.id === 1 ? '' : (
    <>
      Куда: {props.order.orderDeliveryInfo.address} {props.order.orderDeliveryInfo.floorNumber} {props.order.orderDeliveryInfo.entranceNumber}
    </>
  )
  return (
    <Card
      bodyStyle={{ padding: '10px' }}
      hoverable
      extra={
        <Link to={`/orders/${props.order.id}`}>
          <Button type='primary'
            style={{ background: 'black', color: 'white' }}
            shape='round'
          >
            Подробнее
          </Button>
        </Link>
      }
      title={<span>Заказ №{props.order.id}</span>}
    >

      <Meta
        style={{ padding: '5px' }}
        title={
          <>
            <Row>
              <Col span={7}>
                Комментарий к заказу: {props.order.comment === '' ? 'Отсутствует' : props.order.comment}
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                Статус заказа: {props.order.orderStatus}
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                Общая стоимость заказа: {props.order.orderPriceInfo.totalAmount}<br/>
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                Способ получения: {props.order.orderDeliveryInfo.deliveryType.deliveryTypeName}
              </Col>

              <Col span={14}>
                {deliveryInfo}
              </Col>
            </Row>

          </>
        }

      />
    </Card>
  )
}

export default withRouter(OrderDetail)
