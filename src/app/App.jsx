import React, { useEffect } from 'react'
import './App.css'
import PrivateRoute from './util/PrivateRoute'

import { Col, Layout, notification, Row } from 'antd'
import { Route, Switch, useHistory, withRouter } from 'react-router-dom'

import { localizedStrings } from '../util/localization'
import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE_ADMIN, ROLE_USER, SUCCESS, USER_ID } from '../constants'
import AppHeader from '../components/common/Header/AppHeader'
import OAuth2RedirectHandler from '../components/user/oauth2/OAuth2RedirectHandler'
import AppFooter from '../components/common/Footer/AppFooter'
import NotFound from '../components/common/Error/NotFound'
import Profile from '../components/user/profile/Profile/Profile'
import Login from '../components/user/login/Login/Login'
import Home from '../components/home/Home/Home'
import ReviewsList from '../components/company/review/ReviewsList/ReviewsList'
import BreadCrumbComponent from '../components/common/Breadcrumb/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, setCurrentUser, setIsAuthenticated } from '../redux/actions/auth'
import LoadingIndicator from '../components/common/LoadingIndicator/LoadingIndicator'
import CompanyList from '../components/company/CompanyList/CompanyList'
import CargoList from '../components/cargo/CargoList/CargoList'
import TransportList from '../components/transport/TransportList/TransportList'
import Registration from '../components/user/registration/Registration/Registration'
import NewsList from '../components/news/NewsList/NewsList'

import CompanyRegistration from '../components/user/registration/CompanyRegistration/CompanyRegistration'

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
  } = useSelector(state => state.authState)

  useEffect(() => {
    dispatch(getCurrentUser())
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
      message: 'Test Name',
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
    <Layout>
      <AppHeader
        isAuthenticated={isAuthenticated}
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

          <Route
            exact path='/login'
            render={(props) =>
              <Login
                onLogin={handleLogin}
                {...props} />}/>

          <Route
            path='/sign-up'
            render={(props) =>
              <Registration
                isAuthenticated={isAuthenticated}
                {...props} />}/>

          <Route
            path='/oauth2/redirect'
            render={(props) =>
              <OAuth2RedirectHandler
                onLogin={handleLogin}
                {...props} />}/>

          {/* <PrivateRoute
            path='/profile'
            isAuthenticated={isAuthenticated}
            component={Profile}
            {...props} /> */}

          <Route
            exact path='/companies'
            render={(props) =>
              <CompanyList
                {...props} />}/>

          <Route
            exact path='/cargos'
            render={(props) =>
              <CargoList
                {...props} />}/>

          <Route
            exact path='/transports'
            render={(props) =>
              <TransportList
                {...props} />}/>

          <Route
            path='/reviews'
            render={(props) =>
              <ReviewsList
                currentUser={currentUser}
                {...props} />}/>

          <Route
            path='/news'
            render={(props) =>
              <NewsList
                currentUser={currentUser}
                {...props} />}/>

          <Route path='/profile/company' component={CompanyRegistration}/>


          <Route path='/' component={Home}/>

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
