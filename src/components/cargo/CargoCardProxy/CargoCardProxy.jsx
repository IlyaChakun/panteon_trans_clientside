import React from 'react'
import { Col, Divider, List, Row } from 'antd'

const CargoCardProxy = ({ cargo, history, updateList }) => {
  const truckBodyTypes =
    cargo.truckBodyTypes.map(bodyType => (
      bodyType.truckBodyTypeName + ', '
    )
    )

  const cargoStowageMethod =
    cargo.cargoStowageMethods.map(method => (
      method.stowageMethodName + ', '
    )
    )

  const randomViewCount = Math.floor(Math.random() * (1000 - 1) + 1)

  const priority = cargo.priority === undefined ? ('')
    : (
      <span style={{ color: cargo.priority.color }}>
        {cargo.priority.title}
      </span>
    )

  return (
    <List.Item.Meta
      avatar={
        <>
          <strong>
            {cargo.countryIndexFrom} - {cargo.countryIndexTo}
          </strong>
          <br/>
          {cargo.distance}
          <br/>
        </>
      }
      title={
        <>
          <Row>
            <Col span={5}>
              {cargo.from}
            </Col>

            <Col span={5}>
              {cargo.to}
            </Col>

            <Col span={3}>
              {cargo.cargoType}
              <br/>
              {cargo.dimensions}
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

              <Col span={2}>
                {priority}
              </Col>

              <Col span={8}>
                {cargo.payment}
              </Col>

              <Col span={6}>
                <span>Контакты:</span>
                <br/>
                {cargo.contacts.name}
                <br/>
                {cargo.contacts.phoneNumber}
              </Col>

            </Row>

          </strong>

          < div style={{ textAlign: 'right' }}>
            Дата создания: {cargo.dateOfCreation}
            <br/>
            Просмотров: {randomViewCount}
          </div>

        </>
      }

    />
  )
}
export default CargoCardProxy
