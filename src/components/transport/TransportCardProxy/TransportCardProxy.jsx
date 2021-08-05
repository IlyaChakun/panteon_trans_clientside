import React from 'react'
import { Col, Divider, List, Row } from 'antd'

const TransportCardProxy = ({ transport }) => {
  // const truckBodyTypes =
  //   transport.truckBodyTypes.map(bodyType => (
  //     bodyType.truckBodyTypeName + ', '
  //   )
  //   )
  //
  // const cargoStowageMethod =
  //   transport.cargoStowageMethods.map(method => (
  //     method.stowageMethodName + ', '
  //   )
  //   )

  const randomViewCount = Math.floor(Math.random() * (1000 - 1) + 1)

  return (
    <React.Fragment>
      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={4}>
          <strong>
            {transport.loadingPayload.address.countryId} - {transport.unloadingPayload.address.countryId}
          </strong>
        </Col>
        <Col span={4}>
          { transport.loadingPayload.address.address }
        </Col>
        <Col span={4}>
          { transport.unloadingPayload.address.address }
        </Col>
        {/*<Col span={4}>*/}
        {/*  { transport.dimensions }*/}
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
          <strong style={{ color: 'black' }}>{transport.payment}</strong>
        </Col>
        <Col span={6}>
          <strong style={{ color: 'black' }}>{transport.payment}</strong>
        </Col>
        {/*<Col span={6}>*/}
        {/*  <span>Контакты:</span>*/}
        {/*  <br/>*/}
        {/*  {transport.contacts.name}*/}
        {/*  <br/>*/}
        {/*  {transport.contacts.phoneNumber}*/}
        {/*</Col>*/}
        <Col span={6}>
          <span>Дата создания: {transport.dateOfCreation}</span>
          <br/>
          <span>Просмотров: {randomViewCount}</span>
          <br/>
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default TransportCardProxy
