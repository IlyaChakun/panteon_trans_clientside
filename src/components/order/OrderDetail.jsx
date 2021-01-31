import React, {Component} from 'react'
import {Button, Card} from 'antd'
import {Link, withRouter} from 'react-router-dom'

const { Meta } = Card

class OrderDetail extends Component {
  render () {
    return (
      <Card
        bodyStyle={{ padding: '10px' }}
        hoverable
        extra={
          <Link to={`/orders/${this.props.order.id}`}>
            <Button type="primary"
              style={{ background: 'black', color: 'white' }}
              shape="round"
            >
                  Подробнее
            </Button>
          </Link>
        }
        title={<span>Заказ №{this.props.order.id}</span>}
      >

        <Meta
          style={{ padding: '5px' }}

          description={
            <div>
              <p>Комментарий к заказу: {this.props.order.comment === undefined ? '' : this.props.order.comment}<br/>
              Статус заказа: {this.props.order.orderStatus}<br/>
              Общая стоимость заказа: {this.props.order.totalAmount}<br/>
              Доставка: {this.props.order.address} {this.props.order.floorNumber} {this.props.order.entranceNumber}
              </p>
            </div>
          }
        />
      </Card>
    )
  }
}

export default withRouter(OrderDetail)
