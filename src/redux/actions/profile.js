import {
  PROFILE_SET_CARGOS,
  PROFILE_SET_TRANSPORT,
  PROFILE_SET_COMPANY, PROFILE_CLEAR
} from '../actions/types'

import ProfileService from '../../service/ProfileService'

export const getProfileCargos = (userId) => (dispatch) => {
  return ProfileService.getProfileCargos(userId)
    .then(response => {
      dispatch({
        type: PROFILE_SET_CARGOS,
        payload: response
      })
      console.log('cargos data: ', response)
      return Promise.resolve(response)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const getProfileTransports = (userId) => (dispatch) => {
  return ProfileService.getProfileTransport(userId)
    .then(response => {
      dispatch({
        type: PROFILE_SET_TRANSPORT,
        payload: response
      })
      console.log('transport data: ', response)
      return Promise.resolve(response)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const getCompanyProfile = (userId) => (dispatch) => {
  return ProfileService.getCompanyProfile(userId)
    .then(response => {
      dispatch({
        type: PROFILE_SET_COMPANY,
        payload: response
      })
      console.log('profile data: ', response)
      return Promise.resolve(response)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const ClearProfile = () => ({
  type: PROFILE_CLEAR
})