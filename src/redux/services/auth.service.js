import axios from 'axios'
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from '../../constants'

const API_URL = 'http://localhost:8080/auth/users/'

export const registerRequest = (signupRequest) => {
  return axios
    .post(API_URL + 'sign-up', signupRequest)
}

export const loginRequest = (loginRequest) => {
  return axios
    .post(BASE_URL + 'login', loginRequest)
    .then((response) => {
      return response.data
    })
}
