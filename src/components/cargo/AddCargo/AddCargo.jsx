import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Typography } from 'antd'

import AddForm from '../../user/modal/AddForm/AddForm'

const { Title } = Typography

const AddCargo = () => {

  return (
    <Row style={{ minHeight: 'calc(100vh - 64px)' }} align={'middle'} justify={'center'}>
      <Col span={22} style={{ backgroundColor: '#fff', padding: '16px 32px' }}>
        <Title style={{ marginBottom: '30px' }} level={3}>Ваша новая заявка</Title>
        <AddForm isCargo={true}/>
      </Col>
    </Row>
  )
}

export default withRouter(AddCargo)