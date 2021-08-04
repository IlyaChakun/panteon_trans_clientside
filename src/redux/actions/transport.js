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

export const getTransport = (searchCriteria) => async (dispatch) => {
      try {
        console.log('start getTransport ')
        const promise = TransportService.getAllTransport(searchCriteria)
        console.log(JSON.stringify(promise))
  
        if (!promise) {
          return
        }
        // await promise
        // promise
        //   .then(response => {
        //     console.log('all florists', response)
        //     dispatch(setLoading(true))
        //     dispatch(setCompanies(response.objects))
        //     dispatch(setTotalPages(response.totalPages))
        //     dispatch(setTotalElements(response.totalElements))
        //     dispatch(setLoading(false))
        //   })
        dispatch({
            type: TRANSPORT_SET_IS_LOADING,
            payload: true
        })
        dispatch({
            type: SET_TRANSPORTS,
            payload: promise.objects
        })
        dispatch({
            type: TRANSPORT_SET_TOTAL_PAGES,
            payload: promise.totalPages
        })
        dispatch({
            type: TRANSPORT_SET_TOTAL_ELEMENTS,
            payload: promise.totalElements
        })
        dispatch({
            type: TRANSPORT_SET_IS_LOADING,
            payload: false
        })

      } catch (error) {
        dispatch({
            type: TRANSPORT_SET_IS_LOADING,
            payload: false
        })
        dispatch({
            type: TRANSPORT_SET_ERRORS,
            payload: error
        })
      }
}

export const addTransport = (transportData) => (dispatch) => {
  return TransportService.addTransport(transportData).then((data) => {
    return Promise.resolve(data)
  })
}

export const updateTransport = (transportData) => (dispatch) => {
  return TransportService.updateTransport(transportData).then((data) => {
    return Promise.resolve(transportData)
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