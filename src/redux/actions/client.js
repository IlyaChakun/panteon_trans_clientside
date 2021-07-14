import {
    CLIENT_SET_IS_LOADING,
    CLIENT_SET_ERRORS,
    CLIENT_SET_TOTAL_PAGES,
    CLIENT_SET_TOTAL_ELEMENTS,
    CLIENT_SET_PAGE,
    CLIENT_SET_SIZE,
    SET_CLIENTS
  } from "../actions/types";

import { getAllClientsRequest } from '../../util/utilsAPI'

export const getClients = (searchCriteria) => async (dispatch) => {
      try {
        console.log('start getting all getClients ')
        const promise = getAllClientsRequest(searchCriteria)
  
        await promise
          .then(response => {
            console.log('all getClients', response)
            dispatch({
                type: CLIENT_SET_IS_LOADING,
                payload: false
            })
            dispatch({
                type: SET_CLIENTS,
                payload: promise.objects
            })
            dispatch({
                type: CLIENT_SET_TOTAL_PAGES,
                payload: promise.totalPages
            })
            dispatch({
                type: CLIENT_SET_TOTAL_ELEMENTS,
                payload: promise.totalElements
            })
            dispatch({
                type: CLIENT_SET_IS_LOADING,
                payload: false
            })
          })
      } catch (error) {
        dispatch({
            type: CLIENT_SET_IS_LOADING,
            payload: false
        })
        dispatch({
            type: CLIENT_SET_ERRORS,
            payload: error
        })
      }
}

export const setPage = (page) => (dispatch) => {
    dispatch({
        type: CLIENT_SET_PAGE,
        payload: page
    })
}

export const setSize = (size) => (dispatch) => {
    dispatch({
        type: CLIENT_SET_SIZE,
        payload: size
    })
}