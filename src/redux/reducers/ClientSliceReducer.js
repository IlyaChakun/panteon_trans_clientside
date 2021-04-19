import { createSlice } from '@reduxjs/toolkit'
import { getAllClientsRequest } from '../../components/util/utilsAPI'

const initialState = {

  loading: false,
  errors: '',

  clients: [],

  page: 1,
  size: 6,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setClients: (state, action) => {
      state.clients = action.payload
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
  setClients,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = clientsSlice.actions

export default clientsSlice.reducer

export const clientsSelector = (state) => {
  return state.clientsState
}

export const getClients = (searchCriteria) => {
  return async dispatch => {
    try {
      console.log('start getting all getClients ')
      const promise = getAllClientsRequest(searchCriteria)

      await promise
        .then(response => {
          console.log('all getClients', response)
          dispatch(setLoading(true))
          dispatch(setClients(response.objects))
          dispatch(setTotalPages(response.totalPages))
          dispatch(setTotalElements(response.totalElements))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setErrors(error))
    }
  }
}
