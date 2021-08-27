import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
import Company from '../company/Company/Company'
import Settings from '../../settings/Settings/Settings'
import Cargos from '../cargos/Cargos/Cargos'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/actions/auth'
import Transports from '../transport/Transports/Transports'
import Dialogs from '../dialogs/Dialogs/Dialogs'
import Orders from '../orders/Orders/Orders'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const Profile = (props) => {

  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.authState)

  const logOut = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <Layout style={{ height: 'calc(100vh - 64px)' }}>
      <Sider width={200}>
        <Menu
          mode="inline"
          selectedKeys={[props.location.pathname]}
          style={{ height: '100%', borderRight: 0, textTransform: 'uppercase', fontWeight: 500, paddingTop: '10%' }}
        >
          <Menu.Item key="/profile/orders"><Link style={{ textDecoration: 'none' }} to={'/profile/orders'}>заказы</Link></Menu.Item>
          <Menu.Item key="/profile/docs"><Link style={{ textDecoration: 'none' }} to={'/profile/docs'}>документы</Link></Menu.Item>
          <Menu.Item key="/profile/company"><Link style={{ textDecoration: 'none' }} to={'/profile/company'}>компания</Link></Menu.Item>
          <Menu.Item key="/profile/cargos"><Link style={{ textDecoration: 'none' }} to={'/profile/cargos'}>заявки</Link></Menu.Item>
          <Menu.Item key="/profile/transports"><Link style={{ textDecoration: 'none' }} to={'/profile/transports'}>транспорт</Link></Menu.Item>
          <Menu.Item key="/profile/dialogs"><Link style={{ textDecoration: 'none' }} to={'/profile/dialogs'}>диалоги</Link></Menu.Item>
          <Menu.Item key="/profile/settings"><Link style={{ textDecoration: 'none' }} to={'/profile/settings'}>профиль</Link></Menu.Item>
          <Menu.Item key="5" onClick={logOut}>выйти</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content
          className="site-layout-background"
          style={{
            margin: 0,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <Switch>
            <Route exact path='/profile' render={() => <Redirect to='/profile/settings' />}/>
            <Route exact path='/profile/company' component={Company}/>
            <Route exact path='/profile/orders' component={Orders}/>
            <Route exact path='/profile/cargos' component={Cargos}/>
            <Route exact path='/profile/transports' component={Transports}/>
            <Route exact path='/profile/dialogs' component={Dialogs}/>
            <Route exact path='/profile/settings' component={Settings}/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(Profile)
