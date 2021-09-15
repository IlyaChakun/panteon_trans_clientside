import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Typography } from 'antd'

import AddForm from '../../../modal/AddForm/AddForm'

const { Title } = Typography

const AddTransport = () => {

  return (
    <Row style={{ minHeight: 'calc(100vh - 64px)', margin: ' 20px 0' }} align={'middle'} justify={'center'}>
      <Col span={20} style={{ backgroundColor: '#fff', padding: '16px 32px' }}>
        <Title style={{ marginBottom: '30px' }} level={3}>Добавление Вашего транспорта</Title>
        <AddForm isTransport={true}/>
      </Col>
    </Row>

  )
}

export default withRouter(AddTransport)