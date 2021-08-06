import {
    CARGO_SET_IS_LOADING,
    CARGO_SET_ERRORS,
    SET_CARGOS,
    SET_CARGO,
    ADD_CARGO,
    CARGO_SET_TOTAL_PAGES,
    CARGO_SET_TOTAL_ELEMENTS,
    CARGO_SET_PAGE,
    CARGO_SET_SIZE
} from "../actions/types";
  
import CargoService from '../../service/CargoService'
import TransportService from '../../service/TransportService'

export const getCargos = (searchCriteria) => async (dispatch) => {
  return CargoService.getAllCargos(searchCriteria).then(
    response => {
      dispatch({
        type: CARGO_SET_IS_LOADING,
        payload: true
      })
      dispatch({
        type: SET_CARGOS,
        payload: response.data.objects
      })
      dispatch({
        type: CARGO_SET_TOTAL_PAGES,
        payload: response.data.totalPages
      })
      dispatch({
        type: CARGO_SET_TOTAL_ELEMENTS,
        payload: response.data.totalElements
      })
      dispatch({
        type: CARGO_SET_IS_LOADING,
        payload: false
      })
    },
    error => {
      dispatch({
        type: CARGO_SET_IS_LOADING,
        payload: false
      })
      dispatch({
        type: CARGO_SET_ERRORS,
        payload: error
      })
    }
  )
}

export const updateCargo = (id, patchData) => (dispatch) => {
  return CargoService.updateCargo(id, patchData)
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const addCargo = (cargoData) => (dispatch) => {
  return CargoService.addCargo(cargoData).then(
    data => {
      dispatch({
        type: ADD_CARGO,
        payload: cargoData
      })
      return Promise.resolve(data)
    },
    error => {
      return Promise.reject(error)
    }
  )
}

export const deleteCargo = (cargoData) => (dispatch) => {
  return CargoService.deleteCargo(cargoData).then(
    data => {
      return Promise.resolve(data)
    },
    error => {
      return Promise.reject(error)
    }
  )
}

export const setPage = (page) => (dispatch) => {
    dispatch({
        type: CARGO_SET_PAGE,
        payload: page
    })
}

export const setSize = (size) => (dispatch) => {
    dispatch({
        type: CARGO_SET_SIZE,
        payload: size
    })
}
