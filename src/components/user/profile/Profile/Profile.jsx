import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
import CompanyRegistration from '../../../company/CompanyRegistration/CompanyRegistration'
import Settings from '../../settings/Settings/Settings'
import { useSelector } from 'react-redux'

const { SubMenu } = Menu
const { Content, Sider } = Layout

const Profile = (props) => {

  const { isAuthenticated } = useSelector(state => state.authState)

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
          <Menu.Item key="2">мои грузы</Menu.Item>
          <Menu.Item key="3">мой транспорт</Menu.Item>
          <Menu.Item key="/profile/settings"><Link style={{ textDecoration: 'none' }} to={'/profile/settings'}>мои настройки</Link></Menu.Item>
          <Menu.Item key="5">выйти</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#fff'
          }}
        >
          <Switch>
            <Route exact path='/profile' render={() => <Redirect to='/profile/settings' />}/>
            <Route exact path='/profile/company' component={CompanyRegistration}/>
            <Route exact path='/profile/settings' component={Settings}/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(Profile)
