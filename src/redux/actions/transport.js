import {
    TRANSPORT_SET_IS_LOADING,
    TRANSPORT_SET_ERRORS,
    SET_TRANSPORTS,
    SET_TRANSPORT,
    ADD_TRANSPORT,
    TRANSPORT_SET_TOTAL_PAGES,
    TRANSPORT_SET_TOTAL_ELEMENTS,
    TRANSPORT_SET_PAGE,
    TRANSPORT_SET_SIZE,
} from "../actions/types";
  
import TransportService from '../../service/TransportService'

export const getTransport = (transportData) => (dispatch) => {
  return TransportService.getAllTransport(transportData)
    .then((response) => {
      dispatch({
        type: TRANSPORT_SET_IS_LOADING,
        payload: true
      })
      dispatch({
        type: SET_TRANSPORTS,
        payload: response.data.objects
      })
      dispatch({
        type: TRANSPORT_SET_TOTAL_PAGES,
        payload: response.data.totalPages
      })
      dispatch({
        type: TRANSPORT_SET_TOTAL_ELEMENTS,
        payload: response.data.totalElements
      })
      dispatch({
        type: TRANSPORT_SET_IS_LOADING,
        payload: false
      })
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const addTransport = (transportData) => (dispatch) => {
  return TransportService.addTransport(transportData).then((data) => {
    dispatch({
      type: ADD_TRANSPORT,
      payload: transportData
    })
    return Promise.resolve(data)
  })
}

export const updateTransport = (id, patchData) => (dispatch) => {
  return TransportService.updateTransport(id, patchData)
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const deleteTransport = (id) => (dispatch) => {
  return TransportService.deleteTransport(id).then((data) => {
    return Promise.resolve(id)
  })
}

export const setPage = (page) => (dispatch) => {
    dispatch({
        type: TRANSPORT_SET_PAGE,
        payload: page
    })
}

export const setSize = (size) => (dispatch) => {
    dispatch({
        type: TRANSPORT_SET_SIZE,
        payload: size
    })
}