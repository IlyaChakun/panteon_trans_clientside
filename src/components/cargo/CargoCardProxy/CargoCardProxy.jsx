import React from 'react'
import { Button, Col, Divider, List, Row } from 'antd'

const CargoCardProxy = ({ cargo, currentUser, history, updateList }) => {
  console.log('carrrrgo: ', cargo)
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
    <React.Fragment>
      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={4}>
          <strong>
            { cargo.countryIndexFrom } - { cargo.countryIndexTo }
          </strong>
          <br/>
          { cargo.distance }
          <br/>
        </Col>
        <Col span={4}>
          { cargo.from }
        </Col>
        <Col span={4}>
          { cargo.to }
        </Col>
        <Col span={4}>
          { cargo.cargoType }
          <br/>
          { cargo.dimensions }
        </Col>
        <Col span={4}>
          {truckBodyTypes}
        </Col>
        <Col span={4}>
          {cargoStowageMethod}
        </Col>
      </Row>
      <Divider />
      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={6}>
          <strong style={{ color: 'black' }}>{priority}</strong>
        </Col>
        <Col span={6}>
          <strong style={{ color: 'black' }}>{cargo.payment}</strong>
        </Col>
        <Col span={6}>
          <span>Контакты:</span>
          <br/>
          {cargo.contacts.name}
          <br/>
          {cargo.contacts.phoneNumber}
        </Col>
        <Col span={6}>
          <span>Дата создания: {cargo.dateOfCreation}</span>
          <br/>
          <span>Просмотров: {randomViewCount}</span>
          <br/>
        </Col>
      </Row>
      <Row justify="start" style={{ width: '100%' }}>
        <Col>
          {currentUser && (currentUser.id !== cargo.owner) && (
            <Button type={'primary'}>Написать сообщение</Button>
          )}
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default CargoCardProxy
