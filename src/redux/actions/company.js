import {
    COMPANY_SET_IS_LOADING,
    COMPANY_SET_ERRORS,
    SET_COMPANIES,
    SET_COMPANY,
    ADD_COMPANY,
    COMPANY_SET_TOTAL_PAGES,
    COMPANY_SET_TOTAL_ELEMENTS,
    COMPANY_SET_PAGE,
    COMPANY_SET_SIZE
} from "../actions/types";

import CompanyService from '../../service/CompanyService'

export const getCompanies = (searchCriteria) => async (dispatch) => {
    try {
        console.log('start getAllCompanies ')
        const promise = CompanyService.getAllCompanies(searchCriteria)

        if (!promise) {
            return
        }

        dispatch({
            type: COMPANY_SET_IS_LOADING,
            payload: false
        })
        dispatch({
            type: SET_COMPANIES,
            payload: promise.objects
        })
        dispatch({
            type: COMPANY_SET_TOTAL_PAGES,
            payload: promise.totalPages
        })
        dispatch({
            type: COMPANY_SET_TOTAL_ELEMENTS,
            payload: promise.totalElements
        })
        dispatch({
            type: COMPANY_SET_IS_LOADING,
            payload: false
        })

    } catch (error) {
        dispatch({
            type: COMPANY_SET_IS_LOADING,
            payload: false
        })
        dispatch({
            type: COMPANY_SET_ERRORS,
            payload: error
        })
    }
}

export const getCompany = (id) => (dispatch) => {
    return CompanyService.getCompany(id)
      .then(response => {
          dispatch({
              type: SET_COMPANY,
              payload: response
          })
          return Promise.resolve(response)
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
