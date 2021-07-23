import {
  IS_AUTHENTICATED,
  AUTH_SET_ERRORS,
  AUTH_SET_IS_LOADING,
  SET_CURRENT_USER,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_EXPIRE_DATE, LOGOUT,
  PROFILE_CLEAR
} from '../actions/types'

import { getCurrentUserRequest, loginRequest, updateUserProfileRequest } from '../../util/utilsAPI'
import AuthService from '../../service/AuthService'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'
import { notification } from 'antd'
import { localizedStrings } from '../../util/localization'

export const setCurrentUser = (user) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    })
}

export const setIsAuthenticated = (label) => (dispatch) => {
    dispatch({
        type: IS_AUTHENTICATED,
        payload: label
    })
}

export const getCurrentUser = (accessToken) => (dispatch) => {
    return AuthService.getCurrentUser(accessToken)
        .then(response => {
            console.log('current user', response)
            dispatch({
                type: AUTH_SET_IS_LOADING,
                payload: true
            })
            dispatch({
                type: SET_CURRENT_USER,
                payload: response.currentUser
            })
            dispatch({
                type: IS_AUTHENTICATED,
                payload: true
            })
            dispatch({
                type: AUTH_SET_IS_LOADING,
                payload: false
            })
          })
        .catch (error => {
          dispatch({
            type: AUTH_SET_ERRORS,
            payload: error
          })
        })
}

export const updateUserProfile = (updateUserRequest) => async (dispatch) => {
    try {
        const promise = updateUserProfileRequest(updateUserRequest)
    if (!promise) {
        return
    }
    promise
        .then(response => {
            dispatch({
                type: AUTH_SET_IS_LOADING,
                payload: true
            })
            dispatch({
                type: SET_CURRENT_USER,
                payload: response
            })
            dispatch({
                type: AUTH_SET_IS_LOADING,
                payload: false
            })

            notification.success({
                message: 'Test Name',
                description: localizedStrings.alertSuccessfulUserUpdate
            })
        })
    } catch (error) {
        dispatch({
            type: AUTH_SET_ERRORS,
            payload: error
        })
        notification.error({
            message: 'Test Name',
            description: error.message || localizedStrings.alertException
        })
    }
}

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password)
      .then(response => {
          dispatch(getCurrentUser(response.accessToken));
          console.log('response in login dispatcher', response)
          localStorage.setItem(ACCESS_TOKEN, response.accessToken)
          localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
          dispatch({
              type: AUTH_SET_IS_LOADING,
              payload: true
          })
          dispatch({
              type: SET_ACCESS_TOKEN,
              payload: response.accessToken
          })
          dispatch({
              type: SET_REFRESH_TOKEN,
              payload: response.refreshToken
          })
          dispatch({
              type: SET_EXPIRE_DATE,
              payload: response.expireDate
          })
          dispatch({
              type: AUTH_SET_IS_LOADING,
              payload: false
          })
          // dispatch(true)((label) => (dispatch) => {
          //   dispatch({
          //     type: IS_AUTHENTICATED,
          //     payload: label
          //   })
          // })
          // window.location.href = '/'
          notification.success({
              message: 'Test Name',
              description: 'Успешный вход'
          })
      })
      .catch((error) => {
        dispatch({
          type: AUTH_SET_ERRORS,
          payload: error
        })
        notification.error({
          message: 'Test Name',
          description: 'Неверный Email или пароль'
        })
      })
}

export const logout = () => (dispatch) => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  dispatch({
    type: LOGOUT
  })
  dispatch({
    type: PROFILE_CLEAR
  })
}