import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createOrderRequest, updateProductInCartRequest } from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'
import { getCart } from './CartsSliceReducer'

const initialState = {
  orders: [],
  order:{},
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
    axios.get('http://localhost:8080/buy-now-orders')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setOrders(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
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
            description: 'Заказ принят!',
          });
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось создать заказ!' + error.message,
      });
    }
  }
}