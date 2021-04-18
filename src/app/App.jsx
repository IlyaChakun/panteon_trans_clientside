import React, { useEffect } from 'react'
import './App.css'
import PrivateRoute from './util/PrivateRoute'

import { Col, Layout, notification, Row } from 'antd'
import { Route, Switch, useHistory, withRouter } from 'react-router-dom'

import { localizedStrings } from '../components/util/localization'
import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE_ADMIN, ROLE_USER, SUCCESS, USER_ID } from '../constants'
import AppHeader from '../components/common/header/AppHeader'
import OAuth2RedirectHandler from '../components/user/oauth2/OAuth2RedirectHandler'
import AppFooter from '../components/common/footer/AppFooter'
import NotFound from '../components/common/error/NotFound'
import Profile from '../components/user/profile/Profile'
import SignUp from '../components/user/signup/SignUp'
import Login from '../components/user/login/Login'
import Company from '../components/company/Company'

import ShopsList from '../components/shop/ShopsList'
import Home from '../components/home/Home'
import ReviewsList from '../components/company/review/ReviewsList'
import LegalPage from '../components/common/pages/LegalPage'
import DocumentsPage from '../components/common/pages/DocumentsPage'
import HelpPage from '../components/common/pages/HelpPage'
import AboutPage from '../components/common/pages/AboutPage'
import ShopDetail from '../components/shop/ShopDetail'
import Cart from '../components/cart/Cart'
import PrivateAdminRoute from './util/PrivateAdminRoute'
import OrderPage from '../components/order/OrderPage'
import BreadCrumbComponent from '../components/common/breadcrumb/BreadCrumbComponent'
import ProductList from '../components/product/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, getCurrentUser, setCurrentUser, setIsAuthenticated } from '../redux/reducers/AuthSliceReducer'
import { getCurrentCompany } from '../redux/reducers/CompanySliceReducer'
import LoadingIndicator from '../components/common/util/LoadingIndicator'
import FloristList from '../components/florist/FloristList'
import OrderList from '../components/order/OrderList'
import { fetchShops } from '../redux/reducers/ShopsSliceReducer'

const { Content } = Layout

notification.config({
  placement: 'topRight',
  top: 70,
  duration: 2
})

const App = (props) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const {
    isLoading,
    currentUser,
    isAuthenticated
  } = useSelector(authSelector)

  const { currentCompany } = useSelector(authSelector)

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getCurrentCompany())
    dispatch(fetchShops())
  }, [dispatch])

  const handleLogout = (redirectTo = '/',
    notificationType = SUCCESS,
    description = localizedStrings.alertSuccessLogOut) => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)

    localStorage.removeItem(USER_ID)

    dispatch(setCurrentUser(null))
    dispatch(setIsAuthenticated(false))

    history.push(redirectTo)

    notification[notificationType]({
      message: 'Цветочный магазин',
      description: description
    })
  }

  const handleLogin = () => {
    dispatch(getCurrentUser())
  }

  if (isLoading) {
    return <LoadingIndicator/>
  }

  if (localStorage.getItem(ACCESS_TOKEN) && currentUser === undefined) {
    return <LoadingIndicator/>
  }

  return (
    <Layout className='app-wrapper'>
      <AppHeader isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      <Content className='app-content'>

        <div className='mb-5'>
          <Row justify='center'>
            <Col span={22}>
              <BreadCrumbComponent properties={props}/>
            </Col>
          </Row>
        </div>

        <Switch>

          <Route exact path='/login'
            render={(props) =>
              <Login onLogin={handleLogin}
                {...props} />}/>

          <Route path='/sign-up'
            render={(props) =>
              <SignUp
                isAuthenticated={isAuthenticated}
                {...props} />}/>

          <Route path='/oauth2/redirect'
            render={(props) =>
              <OAuth2RedirectHandler onLogin={handleLogin}
                {...props} />}/>

          <PrivateRoute path='/profile'
            isAuthenticated={isAuthenticated}
            component={Profile}
            {...props} />

          <Route path='/orders/:id'
            currentUser={currentUser}
            component={OrderPage}/>

          <PrivateRoute path='/cart'
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            component={Cart}
            {...props} />

          <Route exact path='/about/documents'
            render={(props) =>
              <DocumentsPage
                {...props} />}/>

          <Route path='/company/shops/:id'
            render={(props) =>
              <ShopDetail
                currentUser={currentUser}
                currentCompany={currentCompany}
                {...props} />}/>

          <Route path='/company/shops'
            render={(props) =>
              <ShopsList
                currentUser={currentUser}
                currentCompany={currentCompany}
                {...props} />}/>

          <Route path='/company'
            render={(props) =>
              <Company
                currentUser={currentUser}
                currentCompany={currentCompany}
                {...props} />}/>

          <Route exact path='/about/legal'
            render={(props) =>
              <LegalPage
                {...props} />}/>

          <Route path='/company/about'
            render={(props) =>
              <AboutPage
                {...props} />}/>

          <PrivateAdminRoute
            path='/company'
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            currentCompany={currentCompany}
            component={Company}/>

          <Route exact path='/about/help'
            render={(props) =>
              <HelpPage
                {...props} />}/>

          <Route path='/products'
            render={(props) =>
              <ProductList {...props} />}/>

          <PrivateAdminRoute
            path='/florists'
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            currentCompany={currentCompany}
            component={FloristList}/>

          <Route exact path='/orders'
            render={(props) =>
              <OrderList
                currentUses={currentUser}
                {...props} />}/>

          {/* <PrivateAdminRoute */}
          {/*  path='/orders' */}
          {/*  isAuthenticated={isAuthenticated} */}
          {/*  currentUser={currentUser} */}
          {/*  currentCompany={currentCompany} */}
          {/*  component={OrderList}/> */}

          <Route path='/reviews'
            render={(props) =>
              <ReviewsList
                currentUser={currentUser}
                {...props} />}/>

          <Route path='/' component={Home}/>

          <Route component={NotFound}/>

        </Switch>
      </Content>
      <AppFooter/>
    </Layout>
  )
}

export function isAdmin (currentUser) {
  // if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
  //   const role = currentUser.roles.find(elem => elem.name === ROLE_ADMIN)
  //   return role === undefined ? false : role.name === ROLE_ADMIN
  // }
  console.log(JSON.stringify(currentUser))
  if (currentUser !== null &&
    currentUser !== undefined &&
    currentUser.userType !== undefined &&
    currentUser.userType === 'ROLE_ADMIN') {
    console.log('admin')
    return true
  } else {
    console.log('NOT ADMIN')
    return false
  }
}

export function isUserClient (currentUser) {
  // if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
  //   const role = currentUser.roles.find(elem => elem.name === ROLE_ADMIN)
  //   return role === undefined ? false : role.name === ROLE_ADMIN
  // }
  if (currentUser !== null &&
    currentUser !== undefined &&
    currentUser.userType !== undefined &&
    currentUser.userType === 'ROLE_CLIENT') {
    return true
  } else {
    return false
  }
}

export function isUserFlorist (currentUser) {
  // if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
  //   const role = currentUser.roles.find(elem => elem.name === ROLE_ADMIN)
  //   return role === undefined ? false : role.name === ROLE_ADMIN
  // }
  if (currentUser !== null &&
    currentUser !== undefined &&
    currentUser.userType !== undefined &&
    currentUser.userType === 'ROLE_FLORIST') {
    return true
  } else {
    return false
  }
}

export function isUser (currentUser) {
  if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
    const role = currentUser.roles.find(elem => elem.name === ROLE_USER)
    return role === undefined ? false : role.name === ROLE_USER
  }
  return false
}

export default withRouter(App)
