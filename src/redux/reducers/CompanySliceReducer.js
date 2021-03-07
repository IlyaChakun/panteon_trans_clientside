import { createSlice } from '@reduxjs/toolkit'
import { getCurrentCompanyRequest } from '../../components/util/utilsAPI'

const initialState = {
  isLoading: true,
  errors: '',
  currentCompany: null
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setIsLoading: (state, payload) => {
      state.isLoading = payload
    },
    setErrors: (state, payload) => {
      state.errors = payload
    },
    setCurrentCompany: (state, payload) => {
      state.currentCompany = payload
    }
  }
})

export const {
  setIsLoading,
  setErrors,
  setCurrentCompany
} = companySlice.actions

export default companySlice.reducer

export const companySelector = (state) => {
  return state.companyState
}

export const getCurrentCompany = () => {
  return async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const promise = getCurrentCompanyRequest()
      if (!promise) return
      promise
        .then(response => {
          console.log(response)
          dispatch(setCurrentCompany(response))
          dispatch(setIsLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setIsLoading(false))
    }
  }
}

// export const updateCompany = (companyId, updateCompanyRequest) => {
//   return async dispatch => {
//     dispatch(setIsLoading(true))
//     const company = await updateCompanyInfoRequest(companyId, updateCompanyRequest)
//     dispatch(setCurrentCompany(company))
//     dispatch(setIsLoading(false))
//   }
// }