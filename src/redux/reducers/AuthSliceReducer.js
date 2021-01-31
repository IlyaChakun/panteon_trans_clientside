import { createSlice } from '@reduxjs/toolkit'
import {
  getCurrentCompanyRequest,
  getCurrentUserRequest, updateUserProfileRequest
} from '../../components/util/utilsAPI'

const initialState = {
  isLoading: false,
  errors: '',
  currentUser: null,
  currentCompany: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, payload) => {
      state.isLoading = payload
    },
    setErrors: (state, payload) => {
      state.errors = payload
    },
    setCurrentUser: (state, payload) => {
      state.currentUser = payload
    },
    setCurrentCompany: (state, payload) => {
      state.currentCompany = payload
    },
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload
    }
  }
})
export const {
  setIsLoading,
  setErrors,
  setCurrentUser,
  setCurrentCompany,
  setIsAuthenticated
} = authSlice.actions

export default authSlice.reducer

export const authSelector = (state) => {
  return state.authState
}

export const getCurrentUser = () => {
  return async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const promise = getCurrentUserRequest()

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log(response)
          dispatch(setCurrentUser(response))
          dispatch(setIsAuthenticated(true))
          dispatch(setIsLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setIsLoading(false))
    }
  }
}

export const updateUserProfile = (updateUserRequest) => {
  return async dispatch => {
    const profile = await updateUserProfileRequest(updateUserRequest)
    dispatch(setIsLoading(true))
    dispatch(setCurrentUser(profile))
    dispatch(setIsLoading(false))
  }
}

export const getCurrentCompany = () => {
  return async dispatch => {
    try {
      const promise = getCurrentCompanyRequest()

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log(response)
          dispatch(setCurrentCompany(response))
          dispatch(setIsLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setIsLoading(false))
    }
  }
}
