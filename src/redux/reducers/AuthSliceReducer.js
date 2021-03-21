import { createSlice } from '@reduxjs/toolkit'
import {
  getCurrentUserRequest, loginRequest, updateUserProfileRequest} from '../../components/util/utilsAPI'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'

const initialState = {
  errors: '',
  isAuthenticated: false,

  isLoading: false,
  currentUser: null,
  accessToken: '',
  refreshToken: '',
  expireDate: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setErrors: (state, payload) => {
      state.errors = payload
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    setExpireDate: (state, action) => {
      state.expireDate = action.payload
    }
  }
})
export const {
  setIsLoading,
  setErrors,
  setCurrentUser,
  setIsAuthenticated,
  setAccessToken,
  setRefreshToken,
  setExpireDate
} = authSlice.actions

export default authSlice.reducer

export const authSelector = (state) => {
  return state.authState
}

export const getCurrentUser = () => {
  if (authSelector.accessToken) {
    notification.error({
      message: localizedStrings.alertAppName,
      description: 'accessToken is absent'
    })
  }

  return async dispatch => {
    try {
      const promise = getCurrentUserRequest()

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log("current user" ,response)
          dispatch(setIsLoading(true))
          dispatch(setCurrentUser(response))
          dispatch(setIsAuthenticated(true))
          dispatch(setIsLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
    }
  }
}


export const updateUserProfile = (updateUserRequest) => {
  return async dispatch => {
    try {
      const promise = updateUserProfileRequest(updateUserRequest)
      if (!promise) {
        return
      }
      promise
        .then(response => {
          dispatch(setIsLoading(true))
          dispatch(setCurrentUser(response))
          dispatch(setIsLoading(false))

          notification.success({
            message: localizedStrings.alertAppName,
            description: localizedStrings.alertSuccessfulUserUpdate,
          })
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: error.message || localizedStrings.alertException
      })
    }
  }
}

export const login = (loginInput) => {
  return async dispatch => {
    try {
      const promise = loginRequest(loginInput)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in login dispatcher',response)
          dispatch(setIsLoading(true))
          dispatch(setAccessToken(response.accessToken))
          dispatch(setRefreshToken(response.refreshToken))
          dispatch(setExpireDate(response.expireDate))
          localStorage.setItem(ACCESS_TOKEN, response.accessToken)
          localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
          dispatch(setIsLoading(false))

          notification.success({
            message: localizedStrings.alertAppName,
            description: localizedStrings.alertSuccessLogin
          })
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: localizedStrings.alertWrongEmailOrPassword
      })
    }
  }
}