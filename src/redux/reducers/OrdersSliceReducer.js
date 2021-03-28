import { createSlice } from '@reduxjs/toolkit'
import {
  createOrderRequest,
  getClientOrders
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
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setErrors: (state, payload) => {
      state.errors = payload
    },
    setOrders: (state, payload) => {
      state.orders = payload
    },
    setOrder: (state, payload) => {
      state.order = payload
    },
    setTotalPages: (state, payload) => {
      state.totalPages = payload
    },
    setTotalElements: (state, payload) => {
      state.totalElements = payload
    },
    setPage: (state, payload) => {
      state.page = payload
    },
    setSize: (state, payload) => {
      state.size = payload
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
  return state.productsState
}

export const getOrders = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    try {
      let promise = getClientOrders()

      if (!promise) {
        return
      }
      promise
        .then(response => {
          dispatch(setLoading(true))
          dispatch(setOrders(response))
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