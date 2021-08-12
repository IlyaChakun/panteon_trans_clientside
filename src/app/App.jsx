import React, { useEffect } from 'react'
import './App.css'

import { Layout, notification } from 'antd'
import { Route, Switch, withRouter } from 'react-router-dom'

import { localizedStrings } from '../util/localization'
import { ACCESS_TOKEN, SUCCESS } from '../constants'
import AppHeader from '../components/common/header/AppHeader'
import OAuth2RedirectHandler from '../components/user/oauth2/OAuth2RedirectHandler'
import AppFooter from '../components/common/footer/AppFooter'
import Login from '../components/user/login/Login/Login'
import Home from '../components/home/Home/Home'
import ReviewsList from '../components/company/review/ReviewsList/ReviewsList'
import Profile from '../components/user/profile/Profile/Profile'
import BreadCrumbComponent from '../components/common/Breadcrumb/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, logout } from '../redux/actions/auth'
import LoadingIndicator from '../components/common/LoadingIndicator/LoadingIndicator'
import CompanyList from '../components/company/CompanyList/CompanyList'
import CargoList from '../components/cargo/CargoList/CargoList'
import TransportList from '../components/transport/TransportList/TransportList'
import Registration from '../components/user/registration/Registration/Registration'
import News from '../components/news/News/News'
import CompanyProfile from '../components/company/CompanyProfile/CompanyProfile'

const { Content } = Layout

notification.config({
  placement: 'topRight',
  top: 70,
  duration: 2
})

const App = (props) => {
  const dispatch = useDispatch()

  const shouldShowBreadcrumb = (props.location.pathname !== '/login') && (props.location.pathname !== '/sign-up') && (props.location.pathname.split('/')[1] !== 'profile')
  const shouldShowFooter = (props.location.pathname !== '/login') && (props.location.pathname !== '/sign-up') && (props.location.pathname.split('/')[1] !== 'profile')

  const {
    currentUser,
    isAuthenticated,
    accessToken
  } = useSelector(state => state.authState)

  useEffect(() => {
    if (accessToken) {
      dispatch(getCurrentUser(accessToken))
    }
  }, [dispatch])

  const handleLogout = (redirectTo = '/',
    notificationType = SUCCESS,
    description = localizedStrings.alertSuccessLogOut) => {
    dispatch(logout())

    notification[notificationType]({
      message: 'Test Name',
      description: description
    })
  }

  const handleLogin = () => {
    dispatch(getCurrentUser())
  }

  return (
    <Layout>
      {isAuthenticated && !currentUser ? (
        <LoadingIndicator />
      ) : (
        <React.Fragment>
          <AppHeader
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
          <Content className='app-content'>
            <Switch>
              <Route
                exact path='/login'
                render={(props) =>
                  <Login
                    onLogin={handleLogin}
                    {...props} />}
              />
              <Route
                path='/sign-up'
                render={(props) =>
                  <Registration
                    isAuthenticated={isAuthenticated}
                    {...props} />}
              />
              <Route
                path='/oauth2/redirect'
                render={(props) =>
                  <OAuth2RedirectHandler
                    onLogin={handleLogin}
                    {...props} />}
              />
              <Route
                exact path='/companies'
                render={(props) =>
                  <CompanyList
                    {...props} />} />
              <Route exact path='/companies/:id' component={CompanyProfile} />
              <Route
                exact path='/cargos'
                render={(props) =>
                  <CargoList
                    {...props} />}
              />
              <Route
                exact path='/transports'
                render={(props) =>
                  <TransportList
                    {...props} />}
              />
              <Route
                path='/reviews'
                render={(props) =>
                  <ReviewsList
                    currentUser={currentUser}
                    {...props}
                  />}
              />
              <Route
                path='/news'
                component={News}
              />
              <Route path='/profile' component={Profile} />
              <Route path='/' component={Home} />
            </Switch>
          </Content>
        </React.Fragment>
      )}

      {shouldShowFooter && <AppFooter/>}
    </Layout>
  )
}

export default withRouter(App)
