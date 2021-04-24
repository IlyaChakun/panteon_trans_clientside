import { createSlice } from '@reduxjs/toolkit'
import { getAllCargos } from '../../service/CargoService'

const initialState = {

  loading: false,
  errors: '',

  cargos: [],
  cargo: {},

  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}
const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setCargos: (state, action) => {
      state.cargos = action.payload
    },
    setCargo: (state, action) => {
      state.cargo = action.payload
    },
    setAddCargo: (state, action) => {
      const cargo = action.payload
      state.cargos = {
        ...state.cargos,
        cargo
      }
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setSize: (state, action) => {
      state.size = action.payload
    }
  }
})
export const {
  setLoading,
  setErrors,
  setCargos,
  setCargo,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = cargoSlice.actions

export default cargoSlice.reducer

export const cargoSelector = (state) => {
  return state.cargoState
}

export const getCargos = (searchCriteria) => {
  return async dispatch => {
    try {
      console.log('start getGoods ')
      const promise = getAllCargos(searchCriteria)
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

      dispatch(setLoading(true))
      dispatch(setCargos(promise.objects))
      dispatch(setTotalPages(promise.totalPages))
      dispatch(setTotalElements(promise.totalElements))
      dispatch(setLoading(false))

    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setErrors(error))
    }
  }
}
