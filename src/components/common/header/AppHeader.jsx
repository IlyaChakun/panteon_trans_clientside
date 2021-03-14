import React, { Component, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row } from 'antd'
import { getAvatarColor } from '../../util/colors'
import { localizedStrings } from '../../util/localization'
import './AppHeader.css'

import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import CaretDownOutlined from '@ant-design/icons/lib/icons/CaretDownOutlined'
import LoginOutlined from '@ant-design/icons/lib/icons/LoginOutlined'
import UserAddOutlined from '@ant-design/icons/lib/icons/UserAddOutlined'
import { isAdmin } from '../../../app/App'
import ShoppingCartOutlined from '@ant-design/icons/lib/icons/ShoppingCartOutlined'

const Header = Layout.Header

const AppHeader = (props) => {

  const [language, setLanguage] = useState()

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      props.handleLogout()
    }
    if (key === 'profile') {
      props.history.push('/profile')
    }
  }

  const makeMenuForUser = () => {
    return [
      <Menu.Item key='/basket'>
        <Link
          to={'/basket'}>
          <ShoppingCartOutlined style={{ fontSize: '20px' }} />
        </Link>
      </Menu.Item>,

      <Menu.Item key='/profile' className='profile-menu'>
        <ProfileDropdownMenu
          currentUser={props.currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>
    ]
  }

  const makeMenuForGuest = () => {

    return [
      <Menu.Item key='/sign-up'>
        <Link to='/sign-up'>
          <UserAddOutlined style={{ fontSize: '20px' }} />
        </Link>
      </Menu.Item>,

      <Menu.Item key='/login'>
        <Link to='/login'>
          <LoginOutlined style={{ fontSize: '20px' }} />
        </Link>
      </Menu.Item>
    ]
  }


  const makeMenuForShopAdmin = () => {

    return [
      <Menu.Item key='/company' className=''>
        <Link to='/company'>
          Компания
        </Link>
      </Menu.Item>,

      <Menu.Item key='/company/shops' className=''>
        <Link to='/company/shops'>
          Магазины
        </Link>
      </Menu.Item>,

      <Menu.Item key='#' className='report-menu'>
        <ReportsDropdownMenu
          currentUser={props.currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>,

      <Menu.Item key='/profile'
                 className='profile-menu'>
        <ProfileDropdownMenu
          currentUser={props.currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>
    ]
  }

  const updateLanguage = lang => {
    setLanguage(lang)
    props.handleLanguageChange(lang)
  }


  let menuItems

  if (props.currentUser) {
    menuItems = makeMenuForUser()
  } else {
    menuItems = makeMenuForGuest()
  }

  if (isAdmin(props.currentUser)) {
    menuItems = makeMenuForShopAdmin()
  }

  return (
    <>
      <Row justify='center'>
        <Col span={8}>
          <img alt='logo'
               width='50%'
               height='35%'
               className='img-fluid'
               src='https://atlanticcityflorist.com/wp-content/uploads/2019/10/logoacfstransparentbg.png' />
        </Col>
      </Row>

      <Header className='mb-5'>
        <div></div>
        <Menu
          theme={'dark'}
          mode='horizontal'
          selectedKeys={[props.location.pathname]}
          style={{ lineHeight: '60px' }}>

          <Menu.Item key='/'>
            <Link to='/'>
              <HomeOutlined style={{ fontSize: '20px' }} />
            </Link>
          </Menu.Item>

          <Menu.Item key='/products'>
            <Link to='/products'>
              Каталог
            </Link>
          </Menu.Item>
          {/*<Menu.Item key="/bouquets">*/}
          {/*    <Link to="/bouquets">*/}
          {/*        Букеты*/}
          {/*    </Link>*/}
          {/*</Menu.Item>*/}
          <Menu.Item key='/reviews'>
            <Link to='/reviews'>
              Отзывы
            </Link>
          </Menu.Item>

          {menuItems}
        </Menu>
      </Header>
    </>
  )
}

function ProfileDropdownMenu(props) {
  const image = props.currentUser.imageUrl ? (
    <img src={props.currentUser.imageUrl} alt={props.currentUser.name} />
  ) : (
    <div className='text-avatar'>
      {/*<span>{props.currentUser.name && props.currentUser.name[0]}</span>*/}
    </div>
  )

  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className='profile-dropdown-menu'>
      <Menu.Item key='user-info'
                 className='dropdown-item'
                 disabled>
        <Avatar className='user-avatar-circle'
                icon={image}
                style={{ backgroundColor: getAvatarColor(props.currentUser.name) }}>
          {/*{props.currentUser.name[0].toUpperCase()}*/}
        </Avatar>
        <div className='user-full-name-info'>
          {props.currentUser.name}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='profile' className='dropdown-item'>
        {localizedStrings.profile}
      </Menu.Item>
      <Menu.Item key='logout' className='dropdown-item'>
        {localizedStrings.logout}
      </Menu.Item>
    </Menu>
  )


  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>

      <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
        <UserOutlined style={{ marginRight: 0, fontSize: '20px' }} />
        <CaretDownOutlined />
      </Button>
    </Dropdown>
  )
}

function ReportsDropdownMenu(props) {

  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className='report-dropdown-menu'>
      <Menu.Item key='about'
                 className='dropdown-item'
                 disabled>
        <div className=''>
          Отчеты
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='companyReport' className='dropdown-item'>
        {/*<Link to="/users/admin/company-presentation/pdf"  target="_blank">*/}
        {/*    Презентация компании*/}
        {/*</Link>*/}

        <Button type='link' href='/users/admin/company-presentation/pdf' target='_top'>
          Презентация компании
        </Button>
      </Menu.Item>
      <Menu.Item key='yearSaleReport' className='dropdown-item'>
        {/*<Link to="/yearSaleReport" target="_self">*/}
        {/*    Отчет продаж годовой*/}
        {/*</Link>*/}

        <Button type='link' href='/users/admin/company-annual-report/pdf' target='_top'>
          Отчет продаж годовой
        </Button>
      </Menu.Item>
      <Menu.Item key='monthSaleReport' className='dropdown-item'>
        {/*<Link to="/monthSaleReport" target="_self">*/}
        {/*    Отчет продаж за текущий месяц*/}
        {/*</Link>*/}

        <Button type='link' href='/users/admin/company-monthly-report/pdf' target='_top'>
          Отчет продаж годовой
        </Button>
      </Menu.Item>
    </Menu>
  )


  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('report-menu')[0]}>

      <Button type='link' className='ant-dropdown-link' onClick={event => event.preventDefault()}>
        <i className='fa fa-file' aria-hidden='true'></i>
        <CaretDownOutlined />
      </Button>
    </Dropdown>
  )
}

export default withRouter(AppHeader)
