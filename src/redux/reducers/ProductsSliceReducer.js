import { createSlice } from '@reduxjs/toolkit'
import {
  deleteFlowerRequest,
  getAllShops,
  getProductsByShopIdRequest,
  getProductsRequest
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'

const initialState = {
  products: [],
  categories: ['Готовые букеты', 'Премиум букеты',
    'Корзины с цветами', 'Цветы поштучно', 'Акционные букеты'],
  loading: true,
  errors: '',

  shops: [],
  shopId: '',
  shopValue: '',
  page: 1,
  size: 6,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0,

  searchString: ''
}
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setErrors: (state, payload) => {
      state.errors = payload
    },
    setProducts: (state, payload) => {
      state.products = payload
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
    },
    setShops: (state, payload) => {
      state.shops = payload
    },
    setShopValue: (state, payload) => {
      state.shopValue = payload
    },
    setShopId: (state, payload) => {
      state.shopId = payload
    }
  }
})
export const {
  setLoading,
  setErrors,
  setProducts,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize,
  setShops,
  setShopValue,
  setShopId
} = productSlice.actions

export default productSlice.reducer

export const productSelector = (state) => {
  return state.productsState
}

export const getProducts = (searchCriteria, shopId = null) => {
  return async dispatch => {
    // dispatch(setLoading(true))
    try {
      let promise
      if (shopId === null) {
        promise = getProductsRequest(searchCriteria)
      } else {
        promise = getProductsByShopIdRequest(searchCriteria, shopId)
      }

      if (!promise) {
        return
      }
      promise
        .then(response => {
          dispatch(setProducts(response.objects.slice()))
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

export const getShops = () => {
  return async dispatch => {
    // dispatch(setLoading(true))
    try {
      const promise = getAllShops()

      if (!promise) {
        return
      }
      promise
        .then(response => {
          dispatch(setShops(response.objects.slice()))
          dispatch(setShopValue(response.objects[0] === null ? null : response.objects[0].contacts.address))
          dispatch(setShopId(response.objects[0] === null ? null : response.objects[0].id))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setLoading(false))
    }
  }
}

export const deleteProduct = (productId) => {
  return async dispatch => {
    // deleteFlowerRequest(productId)
    //     .then(() => {
    //         notification.success({
    //             message: localizedStrings.alertAppName,
    //             description: 'Успешное удаление!'
    //         });
    //         window.location.href = "/";
    //     }).catch(error => {
    //     if (error.status === 401) {
    //         this.props.handleLogout('/login', 'error', localizedStrings.alertLoggedOut);
    //     } else if (error.status === 404) {
    //         notification.error({
    //             message: localizedStrings.alertAppName,
    //             description: 'Продукт не найден!'
    //         });
    //     } else {
    //         notification.error({
    //             message: localizedStrings.alertAppName,
    //             description: error.message || localizedStrings.alertException
    //         });
    //     }
    // });

    try {
      const promise = deleteFlowerRequest(productId)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          notification.success({
            message: localizedStrings.alertAppName,
            description: 'Успешное удаление!'
          })
          window.location.href = '/'

          dispatch(setProducts(response.objects.slice()))
          dispatch(setTotalPages(response.totalPages))
          dispatch(setTotalElements(response.totalElements))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))
    }
  }
}
