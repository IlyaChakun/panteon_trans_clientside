import React from 'react'
import { Card, Col, Divider, Row, Table } from 'antd'
import { withRouter } from 'react-router-dom'

const { Column } = Table
const { Meta } = Card

const CargoCard = ({ cargo }) => {

  console.log('cargo: ' + JSON.stringify(cargo))

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

  return (
    <Card
      hoverable
      style={{ width: '100%' }}

      extra={
        <>
          <Row>
            <Col>
              Дата создания: {cargo.dateOfCreation}
            </Col>
          </Row>
          <Row>

          </Row>
        </>
      }

      title={
        <span>{cargo.title}</span>
      }

      cover={
        <Row>
          <Col span={4}>
            <Row>
              <span>{cargo.countryIndexFrom}</span>
              <span>{cargo.countryIndexTo}</span>
            </Row>
          </Col>
          <Col span={6}>
            <Divider/>
            <Row>
              <span>{cargo.from}</span>
            </Row>
            <Divider/>
            <Row>
              <span>{cargo.to}</span>
            </Row>
            <Divider/>
            <Row>
              <span>{cargo.distance}</span>
            </Row>
            <Divider/>
            <Row>
              <span>{cargo.dimensions}</span>
            </Row>
            <Divider/>
          </Col>
          <Col span={8}>
            <Divider/>
            <Row>
              {truckBodyTypes}
            </Row>
            <Divider/>
          </Col>
          <Col span={6}>
            <Row>
              {cargoStowageMethod}
            </Row>
            <Divider/>
          </Col>
        </Row>
      }
    >

      <Meta
        style={{ padding: '5px' }}

        title={
          <>
            <Divider/>
            <Row>
              <Col span={24}>
                Автопарк
              </Col>
            </Row>

            <Row>
              <Col span={24}>

              </Col>
            </Row>
            <Divider/>
          </>
        }

        description={

          <Row>
            <Col span={24}>
              <Row>

              </Row>
              <Row>

              </Row>
            </Col>
          </Row>

        }
      />
    </Card>
  )
}

export default withRouter(CargoCard)
