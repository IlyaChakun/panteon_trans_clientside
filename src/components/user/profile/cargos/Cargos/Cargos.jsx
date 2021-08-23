import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col, Typography, Divider } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import CargoCardProxy from '../../../../cargo/CargoCardProxy/CargoCardProxy'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileCargos } from '../../../../../redux/actions/profile'
import AddFormModal from '../../../modal/AddForm/AddForm'
import EditFormModal from '../../../modal/EditFormModal/EditFormModal'
import DeleteFormModal from '../../../modal/DeleteFormModal/DeleteFormModal'

const Cargos = (props) => {
  const dispatch = useDispatch()
  const { cargos } = useSelector(state => state.profileState)
  const { currentUser } = useSelector(state => state.authState)

  useEffect(() => {
    if (currentUser) {
      dispatch(getProfileCargos(currentUser.id)).then((data) => {
        console.log('cargos data: ', data)
      })
    }
    console.log('curr user ', currentUser)
    console.log('curr cargos ', cargos)
  }, [currentUser])

  return (
    <div>
      <AddFormModal isCargo={true} style={{ marginBottom: '20px'}} />
      {cargos.length &&
        cargos.map((cargo) => (
            <Row style={{ backgroundColor: '#fff', marginBottom: '20px', padding: '15px' }}>
              <Row>
                <CargoCardProxy cargo={cargo}/>
              </Row>
              <Row>
                <EditFormModal style={{marginRight: '10px'}} cargo={cargo} isCargo={true} />
                <DeleteFormModal cargo={cargo} isCargo={true}/>
              </Row>
            </Row>
          )
        )
      }
    </div>
  )
}

export default withRouter(Cargos)
