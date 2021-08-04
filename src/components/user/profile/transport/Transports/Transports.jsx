import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col, Typography, Divider } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import TransportCardProxy from '../../../../transport/TransportCardProxy/TransportCardProxy'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileTransports } from '../../../../../redux/actions/profile'
import AddFormModal from '../../../modal/AddFormModal/AddFormModal'
import EditFormModal from '../../../modal/EditFormModal/EditFormModal'
import DeleteFormModal from '../../../modal/DeleteFormModal/DeleteFormModal'

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
    <div>
      <AddFormModal isTransport={true} style={{ marginBottom: '20px'}}/>
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
      )
      }
    </div>
  )
}

export default withRouter(Cargos)