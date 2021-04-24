import { createSlice } from '@reduxjs/toolkit'
import { getAllTransport } from '../../service/TransportService'

const initialState = {

  loading: false,
  errors: '',

  transports: [],
  transport: {},

  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}
const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setTransports: (state, action) => {
      state.transports = action.payload
    },
    setTransport: (state, action) => {
      state.transport = action.payload
    },
    setAddTransport: (state, action) => {
      const transport = action.payload
      state.transports = {
        ...state.transports,
        transport
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
  setTransports,
  setTransport,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = transportSlice.actions

export default transportSlice.reducer

export const transportSelector = (state) => {
  return state.transportState
}

export const getTransport = (searchCriteria) => {
  return async dispatch => {
    try {
      console.log('start getTransport ')
      const promise = getAllTransport(searchCriteria)
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
      dispatch(setTransports(promise.objects))
      dispatch(setTotalPages(promise.totalPages))
      dispatch(setTotalElements(promise.totalElements))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setErrors(error))
    }
  }
}
