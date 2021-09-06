import React from 'react'
import { Col, Row, Typography } from 'antd'
import EditFormModal from "../../user/modal/EditFormModal/EditFormModal";
import DeleteFormModal from "../../user/modal/DeleteFormModal/DeleteFormModal";
import transport from "../../../redux/reducers/transport";

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

const TransportCardProxy = ({ transport, currentUser }) => {

  return (
    <Row style={cardStyle}>
      <Col span={6} style={colStyle}>
        <Title level={5} style={textStyle}>{transport.countryIndexFrom} - {transport.countryIndexTo}</Title>
        <Text>{transport.date}</Text>
        <Text>&mdash;</Text>
        <Text style={textStyle}>{transport.date}</Text>
        <Text style={textStyle}>{transport.time}</Text>
      </Col>
      <Col span={6} style={colStyle}>
        <Text style={textStyle} strong>Откуда:</Text>
        {transport.addressesFrom !== [] && (
            transport.addressesFrom.map((item, index) => (
                <Text>{item.address}</Text>
            ))
        )}
      </Col>
      <Col span={6} style={colStyle}>
        <Text style={textStyle} strong>Куда:</Text>
        {transport.addressesTo !== [] && (
            transport.addressesTo.map(item => (
                <Text>{item.address}</Text>
            ))
        )}
      </Col>
      <Col span={6} style={{...colStyle}}>
        <Text style={{...lastColTextStyle, ...textStyle, color: '#40a9ff'}} strong>{transport.cost} USD</Text>
        <Text style={{...lastColTextStyle, ...textStyle, color: '#40a9ff'}} strong>{transport.payment}</Text>
      </Col>
      <Col span={6} style={{ paddingTop: '14px'}}>
        <Text strong>Транспорт: </Text>
        <Text>{transport.transportType}</Text>
      </Col>
      <Col span={6} style={{ paddingTop: '14px'}}>
        <Text strong>Описание: </Text>
        <Text>{transport.description}</Text>
      </Col>
      {currentUser.id === transport.ownerId && (
        <Col span={24} style={{paddingTop: '10px'}}>
          <EditFormModal style={{marginRight: '10px'}} transport={transport} isTransport={true}/>
          <DeleteFormModal transport={transport} isTransport={true}/>
        </Col>
      )}
    </Row>
  )
}
export default TransportCardProxy
