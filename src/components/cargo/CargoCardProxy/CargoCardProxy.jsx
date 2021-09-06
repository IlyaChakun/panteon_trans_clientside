import React from 'react'
import { Col, Row, Typography } from 'antd'
import MessageModal from '../MessageModal/MessageModal'

const { Text, Title } = Typography

const colStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const cardStyle = {
  padding: '20px 30px 30px 30px',
  width: '100%'
}

const lastColTextStyle = {
  textAlign: 'right'
}

const textStyle = {
  marginBottom: '14px'
}

const CargoCardProxy = ({ cargo, currentUser }) => {

  return (
    <Row style={cardStyle}>
      <Col span={8} style={colStyle}>
        <Title level={5} style={textStyle}>{cargo.countryIndexFrom} - {cargo.countryIndexTo}</Title>
        <Text style={textStyle}>{cargo.date}</Text>
        <Text style={textStyle}>{cargo.time}</Text>
      </Col>
      <Col span={8} style={colStyle}>
        <Text style={textStyle}>{cargo.addressFrom} &mdash; {cargo.addressTo}</Text>
        <Text style={textStyle}>Транспорт: {cargo.transportType}</Text>
        <Text style={textStyle}>{cargo.description}</Text>
      </Col>
      <Col span={8} style={{...colStyle}}>
        <Text style={{...lastColTextStyle, ...textStyle}}>{cargo.distance} км</Text>
        <Text style={{...lastColTextStyle, ...textStyle, color: '#40a9ff'}} strong>{cargo.cost} USD</Text>
        <Text style={{...lastColTextStyle, ...textStyle, color: '#40a9ff'}} strong>{cargo.payment}</Text>
      </Col>
      {currentUser && (
          <Col span={24} style={{ paddingTop: '10px' }}>
            <MessageModal currentUser={currentUser} />
          </Col>
      )}
    </Row>
  )
}
export default CargoCardProxy
