import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd'
import { getAvatarColor } from '../../util/colors'
import { localizedStrings } from '../../util/localization'
import './AppHeader.css'

import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import CaretDownOutlined from '@ant-design/icons/lib/icons/CaretDownOutlined'
import LoginOutlined from '@ant-design/icons/lib/icons/LoginOutlined'
import UserAddOutlined from '@ant-design/icons/lib/icons/UserAddOutlined'
import { isAdmin, isUserFlorist } from '../../../app/App'
import ShoppingCartOutlined from '@ant-design/icons/lib/icons/ShoppingCartOutlined'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../redux/reducers/auth'

const Header = Layout.Header

const AppHeader = (props) => {
  const { currentUser } = useSelector(authSelector)

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
      <Menu.Item key='/cart'>
        <Link
          to={'/cart'}>
          <ShoppingCartOutlined style={{ fontSize: '20px' }}/>
        </Link>
      </Menu.Item>,

      <Menu.Item key='/profile' className='profile-menu'>
        <ProfileDropdownMenu
          currentUser={currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>
    ]
  }

  const makeMenuForGuest = () => {
    return [

      <Menu.Item key='/companies'>
        <Link
          to={'/companies'}>
          Каталог компаний
        </Link>
      </Menu.Item>,

      <Menu.Item key='/cargos'>
        <Link
          to={'/cargos'}>
          Грузы
        </Link>
      </Menu.Item>,

      <Menu.Item key='/transports'>
        <Link
          to={'/transports'}>
          Транспорт
        </Link>
      </Menu.Item>,

      <Menu.Item key='/news'>
        <Link
          to={'/news'}>
          Новости
        </Link>
      </Menu.Item>,

      <Menu.Item key='/sign-up'>
        <Link to='/sign-up'>
          <UserAddOutlined style={{ fontSize: '20px' }}/>
        </Link>
      </Menu.Item>,

      <Menu.Item key='/login'>
        <Link to='/login'>
          <LoginOutlined style={{ fontSize: '20px' }}/>
        </Link>
      </Menu.Item>


    ]
  }

  const makeMenuForShopAdmin = () => {
    return [
      <Menu.Item key='/cargo' className=''>
        <Link to='/cargo'>
          Компания
        </Link>
      </Menu.Item>,

      <Menu.Item key='/cargo/shops' className=''>
        <Link to='/cargo/shops'>
          Магазины
        </Link>
      </Menu.Item>,

      <Menu.Item key='/companies' className=''>
        <Link to='/companies'>
          Флористы
        </Link>
      </Menu.Item>,

      <Menu.Item key='/orders' className=''>
        <Link to='/orders'>
          Заказы магазина
        </Link>
      </Menu.Item>,

      <Menu.Item key='/clients' className=''>
        <Link to='/clients'>
          Клиенты
        </Link>
      </Menu.Item>,

      <Menu.Item key='#' className='report-menu'>
        <ReportsDropdownMenu
          currentUser={currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>,

      <Menu.Item key='/profile'
                 className='profile-menu'>
        <ProfileDropdownMenu
          currentUser={currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>
    ]
  }

  const makeMenuForFlorist = () => {
    return [
      <Menu.Item key='/orders' className=''>
        <Link to='/orders'>
          Заказы магазина
        </Link>
      </Menu.Item>,

      <Menu.Item key='#' className='report-menu'>
        <ReportsFloristDropdownMenu
          currentUser={currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>,

      <Menu.Item key='/profile'
                 className='profile-menu'>
        <ProfileDropdownMenu
          currentUser={currentUser}
          handleMenuClick={handleMenuClick}
        />
      </Menu.Item>
    ]
  }

  let menuItems

  if (currentUser) {
    menuItems = makeMenuForUser()
  } else {
    menuItems = makeMenuForGuest()
  }

  if (isAdmin(currentUser)) {
    menuItems = makeMenuForShopAdmin()
  }

  if (isUserFlorist(currentUser)) {
    menuItems = makeMenuForFlorist()
  }

  return (
    <>
      <Header className='mb-5'>
        <div></div>
        <Menu
          theme={'dark'}
          mode='horizontal'
          selectedKeys={[props.location.pathname]}
          style={{ lineHeight: '60px' }}>

          <Menu.Item key='/'>
            <Link to='/'>
              <HomeOutlined style={{ fontSize: '20px' }}/>
            </Link>
          </Menu.Item>


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

const ProfileDropdownMenu = (props) => {
  const image = props.currentUser.imageUrl ? (
    <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
  ) : (
    <div className='text-avatar'>
      {/* <span>{props.currentUser.name && props.currentUser.name[0]}</span> */}
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
          {/* {props.currentUser.name[0].toUpperCase()} */}
        </Avatar>
        <div className='user-full-name-info'>
          {props.currentUser.name}
        </div>
      </Menu.Item>
      <Menu.Divider/>
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
        <UserOutlined style={{ marginRight: 0, fontSize: '20px' }}/>
        <CaretDownOutlined/>
      </Button>
    </Dropdown>
  )
}

const ReportsDropdownMenu = (props) => {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className='report-dropdown-menu'>
      <Menu.Item key='about'
                 className='dropdown-item'
                 disabled>
        <div className=''>
          Отчеты
        </div>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key='companyReport' className='dropdown-item'>
        <Button type='link' href='/cargo/presentation/pdf' target='_top'>
          Презентация компании
        </Button>
      </Menu.Item>
      <Menu.Item key='yearSaleReport' className='dropdown-item'>
        <Button type='link' href='/cargo/annual-report/pdf' target='_top'>
          Отчет продаж годовой
        </Button>
      </Menu.Item>
      <Menu.Item key='monthSaleReport' className='dropdown-item'>
        <Button type='link' href='/cargo/monthly-report/pdf' target='_top'>
          Отчет продаж за текущий месяц
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
        <CaretDownOutlined/>
      </Button>
    </Dropdown>
  )
}

const ReportsFloristDropdownMenu = (props) => {
  // const [instance, updateInstance] = usePDF({})
  //
  // if (instance.loading) return <div>Loading ...</div>
  //
  // if (instance.error) return <div>Something went wrong: {'error'}</div>

  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className='report-dropdown-menu'>
      {/* <Menu.Item key='about' */}
      {/*  className='dropdown-item' */}
      {/*  disabled> */}
      {/*  <div className=''> */}
      {/*    Отчеты по заказам */}
      {/*  </div> */}
      {/* </Menu.Item> */}
      {/* <Menu.Divider/> */}
      {/* <Menu.Item key='yearSaleReport' className='dropdown-item'> */}
      {/*  <Button type='link' */}
      {/*    href={`http://localhost:8080/florists/${props.currentUser.id}/annual-report/pdf`} */}
      {/*    target='_top'> */}
      {/*    Отчет продаж годовой */}
      {/*  </Button> */}
      {/* </Menu.Item> */}
      <Menu.Item key='monthSaleReport' className='dropdown-item'>
        <Button
          // type='link'
          href={`http://localhost:8080/report/companies/${props.currentUser.id}/monthly-report/pdf`}
          target='_blank'
        >
          Отчет продаж за текущий месяц
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
        <CaretDownOutlined/>
      </Button>
    </Dropdown>
  )
}

export default withRouter(AppHeader)
