import { createSlice } from '@reduxjs/toolkit'
import {
  deleteFlowerRequest,
  getAllShops,
  getProductsByShopIdRequest,
  getProductsRequest
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'
import imagePic from '../../img/8dfe3aad5c7fc4614d3f7a09716b2094.jpg'

import axios from 'axios'
import { setCategories } from './ProductsSliceReducer'

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


export const placeOrder = () => {
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