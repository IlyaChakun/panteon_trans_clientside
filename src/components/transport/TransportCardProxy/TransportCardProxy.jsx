import React from 'react'
import { Col, Divider, List, Row } from 'antd'

const TransportCardProxy = ({ transport, history, updateList }) => {
  const truckBodyTypes =
    transport.truckBodyTypes.map(bodyType => (
      bodyType.truckBodyTypeName + ', '
    )
    )

  const cargoStowageMethod =
    transport.cargoStowageMethods.map(method => (
      method.stowageMethodName + ', '
    )
    )

  const randomViewCount = Math.floor(Math.random() * (1000 - 1) + 1)

  return (
    <List.Item.Meta
      avatar={
        <>
          <strong>
            {transport.countryIndexFrom} - {transport.countryIndexTo}
          </strong>
        </>
      }
      title={
        <>
          <Row>
            <Col span={5}>
              {transport.from}
            </Col>

            <Col span={5}>
              {transport.to}
            </Col>

            <Col span={3}>
              <br/>
              {transport.dimensions}
            </Col>

            <Col span={5}>
              {truckBodyTypes}
            </Col>

            <Col span={5}>
              {cargoStowageMethod}
            </Col>
          </Row>
          <Divider/>
        </>
      }
      description={
        <>
          <strong style={{ color: 'black' }}>
            <Row>

              <Col span={8}>
                {transport.payment}
              </Col>

              <Col span={6}>
                <span>Контакты:</span>
                <br/>
                {transport.contacts.name}
                <br/>
                {transport.contacts.phoneNumber}
              </Col>

            </Row>

          </strong>

          < div style={{ textAlign: 'right' }}>
            Дата создания: {transport.dateOfCreation}
            <br/>
            Просмотров: {randomViewCount}
          </div>

        </>
      }

    />
  )
}
export default TransportCardProxy
