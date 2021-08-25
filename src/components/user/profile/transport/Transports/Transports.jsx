import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col, Typography, Divider, Tabs } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import TransportCardProxy from '../../../../transport/TransportCardProxy/TransportCardProxy'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileTransports } from '../../../../../redux/actions/profile'
import EditFormModal from '../../../modal/EditFormModal/EditFormModal'
import DeleteFormModal from '../../../modal/DeleteFormModal/DeleteFormModal'

const { TabPane } = Tabs

const Cargos = (props) => {
  const dispatch = useDispatch()
  const { transports } = useSelector(state => state.profileState)
  const { currentUser } = useSelector(state => state.authState)

  useEffect(() => {
    if (currentUser) {
      dispatch(getProfileTransports(currentUser.id)).then((data) => {
        console.log('cargos data: ', data)
      })
    }
    console.log('curr user ', currentUser)
    console.log('curr transports ', transports)
  }, [currentUser])

  return (
    <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} >
      <Col span={24} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Мой автопарк" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Водители" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
      {transports.length &&
      transports.map((transport) => (
          <Row style={{ backgroundColor: '#fff', marginBottom: '20px', padding: '15px' }}>
            <Row>
              <TransportCardProxy transport={transport}/>
            </Row>
            <Row>
              <EditFormModal style={{marginRight: '10px'}} transport={transport} isTransport={true} />
              <DeleteFormModal transport={transport} isTransport={true} />
            </Row>
          </Row>
        )
      )}
      </Col>
    </Row>
  )
}

export default withRouter(Cargos)