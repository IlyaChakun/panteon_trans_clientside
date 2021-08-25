import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'antd'

import AddForm from '../../user/modal/AddForm/AddForm'


const AddCargo = () => {

  return (
    <Row style={{ height: 'calc(100vh - 64px)' }} align={'middle'} justify={'center'}>
      <Col span={22} style={{ backgroundColor: '#fff', padding: '16px 32px' }}>
        <AddForm isCargo={true}/>
      </Col>
    </Row>
  )
}

export default withRouter(AddCargo)