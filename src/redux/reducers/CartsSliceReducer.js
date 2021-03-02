import { createSlice } from '@reduxjs/toolkit'
import {
  addProductToBasketRequest,
  deleteFlowerRequest,
  getAllShops,
  getProductsByShopIdRequest,
  getProductsRequest, loginRequest
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'
import imagePic from '../../img/8dfe3aad5c7fc4614d3f7a09716b2094.jpg'

import axios from 'axios'
import { setCategories } from './ProductsSliceReducer'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'
import {
  setAccessToken,
  setCurrentUser,
  setExpireDate,
  setIsAuthenticated,
  setIsLoading,
  setRefreshToken
} from './AuthSliceReducer'

const initialState = {
  cart: {},
  loading: false,
  errors: ''
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setErrors: (state, payload) => {
      state.errors = payload
    },
    setCart: (state, payload) => {
      state.cart = payload
    }
  }
})
export const {
  setLoading,
  setErrors,
  setCart
} = cartSlice.actions

export default cartSlice.reducer

export const cartSelector = (state) => {
  return state.cartState
}

export const getCart = (userId) => {
  return async dispatch => {
    axios.get('http://localhost:8080/carts/' + { userId })
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setCart(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}

export const addToCart = (cartItem) => {
  return async dispatch => {
    try {
      const promise = addProductToBasketRequest(cartItem)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in addToCart dispatcher', response)
          dispatch(setCart(response))

          notification.success({
            message: localizedStrings.alertAppName,
            description: 'добавлено в корзину'
          })
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'что-то не так'
      })
    }
  }


  // return async dispatch => {
  //   axios.post('http://localhost:8080/carts', cartItem)
  //     .then(resp => {
  //       dispatch(setLoading(true))
  //       dispatch(setCart(resp.data))
  //       dispatch(setLoading(false))
  //     })
  //     .catch(error => {
  //       dispatch(setErrors(error))
  //       console.log(error)
  //     })
  // }
}

export const updateItemInCart = (cartItem) => {
  return async dispatch => {
    axios.put('http://localhost:8080/carts', cartItem)
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setCart(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}

export const deleteItemFromCart = (cartItem) => {
  return async dispatch => {
    axios.delete('http://localhost:8080/carts', cartItem)
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setCart(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}
