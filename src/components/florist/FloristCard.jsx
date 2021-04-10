import React from 'react'
import { Card, Col, Rate, Row } from 'antd'
import { withRouter } from 'react-router-dom'

const { Meta } = Card

const FloristCard = ({ florist, firstAction }) => {
  return (
    <Card
      bodyStyle={{ padding: '10px' }}
      hoverable
      cover={
        <Row>
          <Col span={12}>
            <img alt={florist.user.name}
                 src={florist.user.image === null ? ''
                   : florist.user.image.imageUrl}
            />
          </Col>
          <Col span={12}>
            <Row>
              <span>E-mail: {florist.user.email}</span>
            </Row>
            <Row>
              <span>Тел: {florist.user.phoneNumber}</span>
            </Row>
          </Col>
        </Row>
      }
      actions={[
        firstAction
      ]}
      title={
        <span>{florist.user.name.toUpperCase()}</span>
      }
    >

      <Meta
        style={{ padding: '5px' }}
        title={
          <Row>
            <Col span={24}>
              <Row>
                <span>Количество выполненных заказов: {florist.floristStatistic.completedOrdersCount}</span>
              </Row>
              <Row>
                <span>Рейтинг: </span>
                <Rate disabled value={florist.floristStatistic.floristRating} defaultValue={2} />
              </Row>
            </Col>
          </Row>

        }
        description={
          <div>
            Дата создания записи: {florist.dateOfCreation}
          </div>
        }
      />
    </Card>
  )
}

export default withRouter(FloristCard)
