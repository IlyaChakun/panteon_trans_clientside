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

export const getCargos = (searchCriteria) => async (dispatch) => {
      try {
        console.log('start getGoods ')
        const promise = CargoService.getAllCargos(searchCriteria)
        console.log(JSON.stringify(promise))
  
        if (!promise) {
          return
        }
  
        dispatch({
            type: CARGO_SET_IS_LOADING,
            payload: true
        })
        dispatch({
            type: SET_CARGOS,
            payload: promise.objects
        })
        dispatch({
            type: CARGO_SET_TOTAL_PAGES,
            payload: promise.totalPages
        })
        dispatch({
            type: CARGO_SET_TOTAL_ELEMENTS,
            payload: promise.totalElements
        })
        dispatch({
            type: CARGO_SET_IS_LOADING,
            payload: false
        })
  
      } catch (error) {
        dispatch({
            type: CARGO_SET_IS_LOADING,
            payload: false
        })
        dispatch({
            type: CARGO_SET_ERRORS,
            payload: error
        })
      }
}

export const addCargo = (cargoData) => (dispatch) => {
  return CargoService.addCargo(cargoData).then((data) => {
    return Promise.resolve(data)
  })
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
