import {
  IS_AUTHENTICATED,
  AUTH_SET_ERRORS,
  AUTH_SET_IS_LOADING,
  SET_CURRENT_USER,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_EXPIRE_DATE, LOGOUT
} from '../actions/types'

import { notification } from 'antd'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'

const accessToken = localStorage.getItem(ACCESS_TOKEN)
const refreshToken = localStorage.getItem(REFRESH_TOKEN)

const initialState = {
  errors: '',
  isAuthenticated: !!accessToken,
  isLoading: true,
  currentUser: null,
  accessToken: accessToken || '',
  refreshToken: refreshToken || '',
  expireDate: ''
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AUTH_SET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case AUTH_SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: payload
      };
    case SET_EXPIRE_DATE:
      return {
        ...state,
        expireDate: payload
      };
    case LOGOUT:
      return {
        errors: '',
        isAuthenticated: false,
        isLoading: false,
        currentUser: null,
        accessToken: '',
        refreshToken: '',
        expireDate: ''
      }
    default:
      return state;
  }
}

export const authSelector = (state) => {
  return state.authState
}

export const getCurrentUser = () => {
  if (authSelector.accessToken) {
    notification.error({
      message: 'Test Name',
      description: 'Токен отсутсвтует'
    })
  }
}
