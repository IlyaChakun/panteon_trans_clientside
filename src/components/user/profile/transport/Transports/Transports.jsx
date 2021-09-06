import React, { useEffect } from 'react'
import { Row, Col, Tabs, Menu} from 'antd'
import {withRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileTransports } from '../../../../../redux/actions/profile'
import Trucks from "../Trucks/Trucks";
import Drivers from "../Drivers/Drivers";

const { TabPane } = Tabs

const Transports = (props) => {
  const dispatch = useDispatch()
  const { transports } = useSelector(state => state.profileState)
  const { currentUser } = useSelector(state => state.authState)

  console.log("transports path: ", props.location.pathname)

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
        <Menu
            mode="horizontal"
            selectedKeys={[props.location.pathname]}
            style={{ marginBottom: '20px' }}
        >
          <Menu.Item key="/profile/transports/trucks"><Link style={{ textDecoration: 'none' }} to={'/profile/transports/trucks'}>Мой автопарк</Link></Menu.Item>
          <Menu.Item key="/profile/transports/drivers"><Link style={{ textDecoration: 'none' }} to={'/profile/transports/drivers'}>Водители</Link></Menu.Item>
        </Menu>
        <React.Fragment>
          <Switch>
            <Route exact path='/profile/transports' render={() => <Redirect to='/profile/transports/trucks' />}/>
            <Route exact path='/profile/transports/trucks' component={Trucks}/>
            <Route exact path='/profile/transports/drivers' component={Drivers}/>
          </Switch>
        </React.Fragment>
      </Col>
     </Row>
  )
}

export default withRouter(Transports)