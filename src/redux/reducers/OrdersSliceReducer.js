import { createSlice } from '@reduxjs/toolkit'
import {
  createOrderRequest, getAllOrders
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'

const initialState = {
  orders: [],
  order: {},
  loading: false,
  errors: '',

  page: 1,
  size: 6,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0,

  searchString: ''
}
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
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
  setOrders,
  setOrder,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = orderSlice.actions

export default orderSlice.reducer

export const orderSelector = (state) => {
  return state.ordersState
}

export const getOrders = (searchCriteria) => {
  return async dispatch => {
    try {
      console.log('in orders disp')
      const promise = getAllOrders(searchCriteria)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          dispatch(setLoading(true))
          dispatch(setOrders(response.objects))
          dispatch(setTotalPages(response.totalPages))
          dispatch(setTotalElements(response.totalElements))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setLoading(false))
    }
  }
}


export const placeOrder = (order) => {
  return async dispatch => {
    try {
      const promise = createOrderRequest(order)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          notification.success({
            message: localizedStrings.alertAppName,
            description: 'Заказ принят!'
          })
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось создать заказ!' + error.message
      })
    }
  }
}
