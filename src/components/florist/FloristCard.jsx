import React from 'react'
import { Card, Col, Rate, Row } from 'antd'
import { withRouter } from 'react-router-dom'

const { Meta } = Card

function FloristCard(props) {

  return (
    <Card
      bodyStyle={{ padding: '10px' }}
      hoverable
      title={
        <span>{props.florist.user.name}</span>
      }
    >

      <Meta
        style={{ padding: '5px' }}
        title={
          <>
            <Row>
              <Col span={7}>
                <span>{props.florist.user.email}</span>
              </Col>
              <Col span={7}>
                <span>{props.florist.user.phoneNumber}</span>
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                <span>Количество выполненных заказов: {props.florist.floristStatistic.completedOrdersCount}</span>
              </Col>
              <Col span={7}>
                <span>Рейтинг: </span>
                <Rate disabled value={props.florist.floristStatistic.floristRating} defaultValue={2}/>
              </Col>
            </Row>
          </>
        }
        description={
          <div>
            <div className="">
              Дата создания записи: {props.florist.dateOfCreation}
            </div>
          </div>
        }
      />
    </Card>
  )
}

export default withRouter(FloristCard)
