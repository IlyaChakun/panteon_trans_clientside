import {
  COMPANY_SET_IS_LOADING,
  COMPANY_SET_ERRORS,
  SET_COMPANIES,
  SET_COMPANY,
  ADD_COMPANY,
  COMPANY_SET_TOTAL_PAGES,
  COMPANY_SET_TOTAL_ELEMENTS,
  COMPANY_SET_PAGE,
  COMPANY_SET_SIZE, CLEAR_COMPANY, COMPANY_GET_REVIEWS
} from '../actions/types'

import CompanyService from '../../service/CompanyService'

export const getCompanies = (searchCriteria) => (dispatch) => {
    return CompanyService.getAllCompanies(searchCriteria).then(
      response => {
          console.log(response.data)
          dispatch({
              type: COMPANY_SET_IS_LOADING,
              payload: false
          })
          dispatch({
              type: SET_COMPANIES,
              payload: response.data.objects
          })
          dispatch({
              type: COMPANY_SET_TOTAL_PAGES,
              payload: response.data.totalPages
          })
          dispatch({
              type: COMPANY_SET_TOTAL_ELEMENTS,
              payload: response.data.totalElements
          })
          dispatch({
              type: COMPANY_SET_IS_LOADING,
              payload: false
          })
          return Promise.resolve(response.data)
      },
      error => {
          dispatch({
              type: COMPANY_SET_IS_LOADING,
              payload: false
          })
          dispatch({
              type: COMPANY_SET_ERRORS,
              payload: error
          })
          return Promise.reject(error)
      }
    )
}

export const getCompany = (id) => (dispatch) => {
    return CompanyService.getCompany(id).then(
      response => {
          dispatch({
              type: SET_COMPANY,
              payload: response.data
          })
          return Promise.resolve(response.data)
      },
      error => {
        return Promise.reject(error)
      }
    )
}

export const registerCompany = (companyData) => (dispatch) => {
    return CompanyService.registerCompany(companyData).then(
      response => {
        return Promise.resolve(response.data)
      },
      error => {
        return Promise.reject(error)
      }
    )
}

export const getReviews = (id) => (dispatch) => {
  return CompanyService.getReviews(id).then(
    response => {
      dispatch({
        type: COMPANY_GET_REVIEWS,
        payload: response.data.objects
      })
      return Promise.resolve(response.data)
    },
    error => {
      return Promise.reject(error)
    }
  )
}

export const clearCompany = () => (dispatch) => {
    dispatch({
        type: CLEAR_COMPANY
    })
}

export const setPage = (page) => (dispatch) => {
    dispatch({
        type: COMPANY_SET_PAGE,
        payload: page
    })
}

export const setSize = (size) => (dispatch) => {
    dispatch({
        type: COMPANY_SET_SIZE,
        payload: size
    })
}
