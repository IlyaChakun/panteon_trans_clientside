import { createSlice } from '@reduxjs/toolkit'
import {
  addProductToCartRequest,
  deleteProductFromCartRequest,
  getCartRequest,
  updateProductInCartRequest
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'

const initialState = {

  loading: false,
  errors: '',

  cart: {
    cartItems: [],
    totalElements: '',
    totalPrice: ''
  }
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setCart: (state, action) => {
      state.cart = action.payload
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
    try {
      console.log('start cart request')
      const promise = getCartRequest(userId)
      if (!promise) {
        return
      }
      await promise
        .then(response => {
          console.log('cart', response)
          dispatch(setLoading(true))
          dispatch(setCart(response))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setCart(null))

      notification.error({
        message: 'Цветочный магазин',
        description: 'Ваша корзина пуста!'
      })
    }
  }
}


export const addToCart = (cartItem) => {
  return async dispatch => {
    try {
      const promise = addProductToCartRequest(cartItem)

      if (!promise) {
        return
      }

      await promise
        .then(response => {
          console.log('response in addToCart dispatcher', response)
          dispatch(setCart(response))

          notification.success({
            message: 'Цветочный магазин',
            description: 'добавлено в корзину'
          })
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: 'Цветочный магазин',
        description: error.errorDescription
      })
    }
  }
}

export const updateItemInCart = (cartItem) => {
  return async (dispatch) => {
    try {
      // dispatch(setLoading(true))
      const promise = await updateProductInCartRequest(cartItem)
      console.log('response in update from cart', promise)
      dispatch(getCart(cartItem.clientId))
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: 'Цветочный магазин',
        description: 'Не удалось изменить кол-во в корзине!Вы выбрали больше чем доступно!'
      })
    }
  }
}

export const deleteItemFromCart = (productCart) => {
  return async dispatch => {
    try {
      const promise = deleteProductFromCartRequest(productCart)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in delete from cart', response)
          notification.success({
            message: 'Цветочный магазин',
            description: 'Продукт удален из корзины!'
          })
          dispatch(getCart(productCart.userId))
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: 'Цветочный магазин',
        description: 'Не удалось удалить продукт из корзину!'
      })
    }
  }
}
