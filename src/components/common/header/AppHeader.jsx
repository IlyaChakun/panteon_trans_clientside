import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Button, Divider, Dropdown, Layout, Menu, Row, Col } from 'antd'
import { getAvatarColor } from '../../../util/colors'
import { localizedStrings } from '../../../util/localization'

import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import CaretDownOutlined from '@ant-design/icons/lib/icons/CaretDownOutlined'
import LoginOutlined from '@ant-design/icons/lib/icons/LoginOutlined'
import UserAddOutlined from '@ant-design/icons/lib/icons/UserAddOutlined'
import { isAdmin, isUserFlorist } from '../../../app/App'
import ShoppingCartOutlined from '@ant-design/icons/lib/icons/ShoppingCartOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/actions/auth'

const Header = Layout.Header

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.authState)

  const logOut = () => {
    dispatch(logout())
  }

  useEffect(() => {}, [props.location.pathname, isAuthenticated])

  const dropdownUserMenu = () => {
    return (
      <Menu className='profile-dropdown-menu'>
        <Menu.Item key='company' className='dropdown-item'>
          <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
            <Link to={'/profile/company'} style={{ textDecoration: 'none', color: '#000' }}>Моя компания</Link>
          </Button>
        </Menu.Item>
        <Menu.Item key='cargos' className='dropdown-item'>
          <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
            <Link to={'/profile/cargos'} style={{ textDecoration: 'none', color: '#000' }}>Мои грузы</Link>
          </Button>
        </Menu.Item>
        <Menu.Item key='transports' className='dropdown-item'>
          <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
            <Link to={'/profile/transports'} style={{ textDecoration: 'none', color: '#000' }}>Мой транспорт</Link>
          </Button>
        </Menu.Item>
        <Menu.Item key='dialogs' className='dropdown-item'>
          <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
            <Link to={'/profile/dialogs'} style={{ textDecoration: 'none', color: '#000' }}>Мои диалоги</Link>
          </Button>
        </Menu.Item>
        <Menu.Item key='settings' className='dropdown-item'>
          <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
            <Link to={'/profile/settings'} style={{ textDecoration: 'none', color: '#000' }}>Настройки</Link>
          </Button>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key='logout' className='dropdown-item'>
          <Button type='link' className='ant-dropdown-link' onClick={event => { event.preventDefault(); logOut() }}>{localizedStrings.logout}</Button>
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <Header>
      <Row justify={'space-between'}>
        <Col>
          <Menu
            theme={'dark'}
            mode='horizontal'
            selectedKeys={[props.location.pathname]}
          >
            <Menu.Item key='/'>
              <Link to='/' style={{ textDecoration: 'none' }}>
                Главная
              </Link>
            </Menu.Item>
            <Menu.Item key='/reviews'>
              <Link to='/reviews' style={{ textDecoration: 'none' }}>
                Отзывы
              </Link>
            </Menu.Item>
            <Menu.Item key='/companies'>
              <Link
                to={'/companies'} style={{ textDecoration: 'none' }}>
                Каталог компаний
              </Link>
            </Menu.Item>

            <Menu.Item key='/cargos'>
              <Link
                to={'/cargos'} style={{ textDecoration: 'none' }}>
                Грузы
              </Link>
            </Menu.Item>

            <Menu.Item key='/transports'>
              <Link
                to={'/transports'} style={{ textDecoration: 'none' }}>
                Транспорт
              </Link>
            </Menu.Item>

            <Menu.Item key='/news'>
              <Link
                to={'/news'} style={{ textDecoration: 'none' }}>
                Новости
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        {isAuthenticated && (
          <Col>
            <Menu
              theme={'dark'}
              mode='horizontal'
              selectedKeys={[props.location.pathname]}
            >
              <Dropdown
                overlay={dropdownUserMenu}
                trigger={['click']}
                getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}
              >
                <Menu.Item key='/profile' className='profile-menu'>
                  <UserOutlined />
                  <CaretDownOutlined />
                </Menu.Item>
              </Dropdown>
            </Menu>
          </Col>
        )}
        {!isAuthenticated && (
          <Col>
            <Menu
              theme={'dark'}
              mode='horizontal'
              selectedKeys={[props.location.pathname]}
            >
              <Menu.Item key='/sign-up'>
                <Link to='/sign-up' style={{ textDecoration: 'none' }}>
                  <UserAddOutlined />
                </Link>
              </Menu.Item>
              <Menu.Item key='/login'>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <LoginOutlined />
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        )}
      </Row>
    </Header>
  )
}

export default withRouter(AppHeader)
