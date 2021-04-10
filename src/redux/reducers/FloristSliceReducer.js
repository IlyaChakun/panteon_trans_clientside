import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'
import {
  addFloristRequest,
  getAllFloristsRequest,
  getFloristRequest,
  updateFloristRequest
} from '../../components/util/utilsAPI'

const initialState = {

  loading: false,
  errors: '',

  florists: [],
  florist: {},

  page: 1,
  size: 6,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}
const floristsSlice = createSlice({
  name: 'florists',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setFlorists: (state, action) => {
      state.florists = action.payload
    },
    setFlorist: (state, action) => {
      state.florist = action.payload
    },
    setAddFlorist: (state, action) => {
      const florist = action.payload
      state.florists = {
        ...state.florists,
        florist
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
  setFlorists,
  setFlorist,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = floristsSlice.actions

export default floristsSlice.reducer

export const floristsSelector = (state) => {
  return state.floristsState
}

export const getFlorists = (searchCriteria) => {
  return async dispatch => {
    try {
      console.log('start getting all florists ')
      const promise = getAllFloristsRequest(searchCriteria)
      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('all florists', response)
          dispatch(setLoading(true))
          dispatch(setFlorists(response.objects))
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

export const addFlorist = (floristToAdd) => {
  return async dispatch => {
    try {
      const promise = await addFloristRequest(floristToAdd)
      console.log('response in addFloristRequest dispatcher', promise)

      if (promise.status === 400) {
        notification.error({
          message: localizedStrings.alertAppName,
          description: promise.error()
        })
      } else {
        notification.success({
          message: localizedStrings.alertAppName,
          description: 'Флорист добавлен'
        })

        dispatch(getFlorists())
      }

    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: error.description
      })
    }


    // try {
    //   const promise = addFloristRequest(floristToAdd)
    //
    //   if (!promise) {
    //     return
    //   }
    //
    //   await promise
    //     .then(response => {
    //       console.log('response in addFloristRequest dispatcher', response)
    //
    //       if (response.code === 400) {
    //         notification.error({
    //           message: localizedStrings.alertAppName,
    //           description: response.errorDescription
    //         })
    //       } else {
    //         dispatch(setAddFlorist(response))
    //
    //         notification.success({
    //           message: localizedStrings.alertAppName,
    //           description: 'Флорист добавлен'
    //         })
    //       }
    //     })
    // } catch (error) {
    //   dispatch(setErrors(error))
    //   notification.error({
    //     message: localizedStrings.alertAppName,
    //     description: error.description
    //   })
    // }
  }
}

export const updateFlorist = (floristId, floristToUpdate) => {
  return async dispatch => {
    try {
      const promise = updateFloristRequest(floristId, floristToUpdate)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in updateFloristRequest  ', response)
          dispatch(getFlorists())
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось изменить florist!'
      })
    }
  }
}

export const getFlorist = (floristId) => {
  return async dispatch => {
    try {
      const promise = getFloristRequest(floristId)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in florist ', response)
          notification.success({
            message: localizedStrings.alertAppName,
            description: 'Florist найден!'
          })
          dispatch(setFlorist())
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось найти флориста!'
      })
    }
  }
}
