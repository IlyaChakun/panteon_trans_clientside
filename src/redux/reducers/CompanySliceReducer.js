import { createSlice } from '@reduxjs/toolkit'
import { getAllCompanies } from '../../service/CompanyService'

const initialState = {

  loading: false,
  errors: '',

  companies: [],
  company: {},

  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setCompanies: (state, action) => {
      state.companies = action.payload
    },
    setCompany: (state, action) => {
      state.company = action.payload
    },
    setAddCompany: (state, action) => {
      const company = action.payload
      state.companies = {
        ...state.companies,
        company
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
  setCompanies,
  setCompany,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = companySlice.actions

export default companySlice.reducer

export const companySelector = (state) => {
  return state.companyState
}

export const getCompanies = (searchCriteria) => {
  return async dispatch => {
    try {
      console.log('start getAllCompanies ')
      const promise = getAllCompanies(searchCriteria)

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
      dispatch(setCompanies(promise.objects))
      dispatch(setTotalPages(promise.totalPages))
      dispatch(setTotalElements(promise.totalElements))
      dispatch(setLoading(false))

    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setErrors(error))
    }
  }
}
