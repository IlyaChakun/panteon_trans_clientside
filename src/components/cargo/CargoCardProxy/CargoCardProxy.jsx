import React from 'react'
import { Button, Col, Divider, List, Row } from 'antd'
import MessageModal from '../MessageModal/MessageModal'

const CargoCardProxy = ({ cargo, currentUser, history, updateList }) => {

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
            { cargo.loadingPayload.address.countryId } - { cargo.unloadingPayload.address.countryId }
          </strong>
          <br />
          {cargo.distance}
          <br />
        </Col>
        <Col span={4}>
          Из: { cargo.loadingPayload.address.address }
        </Col>
        <Col span={4}>
          В: { cargo.unloadingPayload.address.address }
        </Col>
        <Col span={4}>
          Описание: { cargo.description }
        </Col>
        {/*<Col span={4}>*/}
        {/*  {cargo.cargoType}*/}
        {/*  <br />*/}
        {/*  {cargo.dimensions}*/}
        {/*</Col>*/}
        {/*<Col span={4}>*/}
        {/*  {truckBodyTypes}*/}
        {/*</Col>*/}
        {/*<Col span={4}>*/}
        {/*  {cargoStowageMethod}*/}
        {/*</Col>*/}
      </Row>
      <Divider />
      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={6}>
          <strong style={{ color: 'black' }}>{cargo.status}</strong>
        </Col>
        {/*<Col span={6}>*/}
        {/*  <strong style={{ color: 'black' }}>{cargo.payment}</strong>*/}
        {/*</Col>*/}
        {/*<Col span={6}>*/}
        {/*  <span>Контакты:</span>*/}
        {/*  <br />*/}
        {/*  {cargo.contacts.name}*/}
        {/*  <br />*/}
        {/*  {cargo.contacts.phoneNumber}*/}
        {/*</Col>*/}
        <Col span={6}>
          <span>Дата создания: {cargo.dateOfCreation}</span>
          <br />
          <span>Просмотров: {randomViewCount}</span>
          <br />
        </Col>
      </Row>
      <Row justify='start' style={{ width: '100%' }}>
        <Col>
          {currentUser && (currentUser.id !== cargo.owner) && (
            <MessageModal cargoOwnerId={cargo.userId} currentUser={currentUser} />
          )}
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default CargoCardProxy
