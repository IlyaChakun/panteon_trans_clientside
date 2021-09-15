import React from 'react'
import { Col, Row, Typography } from 'antd'
import EditFormModal from "../../../modal/EditFormModal/EditFormModal";
import DeleteFormModal from "../../../modal/DeleteFormModal/DeleteFormModal";

const { Text, Title } = Typography

const colStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const cardStyle = {
  padding: '10px 0px',
  width: '100%'
}

const lastColTextStyle = {
  textAlign: 'right'
}

const textStyle = {
  marginBottom: '14px'
}

const DriverCard = ({ driver }) => {

  return (
      <Row style={cardStyle}>
        <Col span={12} style={colStyle}>
          <Title level={5} style={textStyle}>{driver.user.firstName} {driver.user.lastName}</Title>
          <Text>{driver.email}</Text>
        </Col>
        <Col span={12} style={colStyle}>
          <Text style={textStyle} strong>Серия и номер паспорта:</Text>
          <Text>{driver.passportSeries}{driver.passportNumber}</Text>
        </Col>

        <Col span={24} style={{paddingTop: '16px'}}>
          <EditFormModal style={{marginRight: '10px'}} sTransport={true}/>
          <DeleteFormModal driver={driver} isDriver={true}/>
        </Col>
      </Row>
  )
}
export default DriverCard
