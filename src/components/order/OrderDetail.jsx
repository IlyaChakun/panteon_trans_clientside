import React from 'react'
import { Button, Card } from 'antd'
import { Link, withRouter } from 'react-router-dom'

const { Meta } = Card

function OrderDetail(props) {
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

        description={
          <div>
            <p>Комментарий к заказу: {props.order.comment}<br />
              Статус заказа: {props.order.orderStatus}<br />
              Общая стоимость заказа: {props.order.orderPriceInfo.totalAmount}<br />
              Доставка: {props.order.orderDeliveryInfo.address} {props.order.orderDeliveryInfo.floorNumber} {props.order.orderDeliveryInfo.entranceNumber}
            </p>
          </div>
        }
      />
    </Card>
  )
}

export default withRouter(OrderDetail)
