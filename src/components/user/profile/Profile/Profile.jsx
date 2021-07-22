import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
import Company from '../company/Company/Company'
import Settings from '../../settings/Settings/Settings'
import Cargos from '../cargos/Cargos/Cargos'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/actions/auth'
import Transports from '../transport/Transports/Transports'
import Dialogs from '../dialogs/Dialogs/Dialogs'

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
          <Menu.Item key="/profile/company"><Link style={{ textDecoration: 'none' }} to={'/profile/company'}>моя компания</Link></Menu.Item>
          <Menu.Item key="/profile/cargos"><Link style={{ textDecoration: 'none' }} to={'/profile/cargos'}>мои грузы</Link></Menu.Item>
          <Menu.Item key="/profile/transports"><Link style={{ textDecoration: 'none' }} to={'/profile/transports'}>мой транспорт</Link></Menu.Item>
          <Menu.Item key="/profile/dialogs"><Link style={{ textDecoration: 'none' }} to={'/profile/dialogs'}>мои диалоги</Link></Menu.Item>
          <Menu.Item key="/profile/settings"><Link style={{ textDecoration: 'none' }} to={'/profile/settings'}>мои настройки</Link></Menu.Item>
          <Menu.Item key="5" onClick={logOut}>выйти</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#fff',
            overflow: 'auto'
          }}
        >
          <Switch>
            <Route exact path='/profile' render={() => <Redirect to='/profile/settings' />}/>
            <Route exact path='/profile/company' component={Company}/>
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
