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

  cartItems: [],
  cart: {}
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
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload
    }
  }
})
export const {
  setLoading,
  setErrors,
  setCartItems,
  setCart
} = cartSlice.actions

export default cartSlice.reducer

export const cartSelector = (state) => {
  return state.cartState
}

export const getCart = (userId) => {
  return async dispatch => {
    try {
      console.log("start cart request")
      const promise = getCartRequest(userId)
      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log("cart" ,response)
          dispatch(setLoading(true))
          dispatch(setCart(response))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setErrors(error))
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
      promise
        .then(response => {
          console.log('response in addToCart dispatcher', response)

          // dispatch(setCartItems(response.cartItems))
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
}

export const updateItemInCart = (cartItem) => {
  return async dispatch => {
    try {
      const promise = updateProductInCartRequest(cartItem)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in update from cart', response)
          dispatch(getCart(cartItem.userId))
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось изменить кол-во в корзине!Вы выбрали больше чем доступно!',
      });
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
            message: localizedStrings.alertAppName,
            description: 'Продукт удален из корзины!',
          });
          dispatch(getCart(productCart.userId))
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Не удалось удалить продукт из корзину!',
      });
    }
  }
}
