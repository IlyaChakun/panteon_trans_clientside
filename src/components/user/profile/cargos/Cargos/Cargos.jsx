import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Steps, Row, Col, Typography, Divider } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import CargoCardProxy from '../../../../cargo/CargoCardProxy/CargoCardProxy'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileCargos } from '../../../../../redux/actions/profile'

const { Option } = Select
const { Title } = Typography

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
      <Button type="primary" style={{marginBottom: '40px'}}>Добавить груз</Button>
      {cargos.length &&
        cargos.map((cargo) => (
          <React.Fragment>
            <Row>
              <CargoCardProxy cargo={cargo}/>
            </Row>
            <Row>
              <Button>Редактировать</Button>
              <Button>Удалить</Button>
            </Row>
            <Divider />
          </React.Fragment>
          )
        )
      }
    </div>
  )
}

export default withRouter(Cargos)
