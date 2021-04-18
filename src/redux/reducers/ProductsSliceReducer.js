import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteProductRequest,
  getCategoriesRequest,
  getCountriesRequest, getFloristRequest,
  getProductLengthsRequest, getProductRequest,
  getProductsByShopIdRequest,
  getProductsRequest,
  saveProductRequest,
  updateProductRequest
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'
import { setFlorist } from './FloristSliceReducer'


export const fetchProductLengths = createAsyncThunk(
  'products/fetchProductLengths',
  async () => {
    return await getProductLengthsRequest()
  })

export const fetchCountries = createAsyncThunk(
  'products/fetchCountries',
  async () => {
    return await getCountriesRequest()
  })

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    return await getCategoriesRequest()
  })

export const saveProduct = (productRequest) => {
  return async dispatch => {
    const response = await saveProductRequest(productRequest)

    if (response.success === true) {
      notification.success({
        message: 'Цветочный магазин',
        description: response.message
      })
    } else {
      notification.error({
        message: 'Цветочный магазин',
        description: response.message
      })
    }

    dispatch(getProducts({ page: productSelector.page, size: productSelector.size }))
  }
}


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},

    loading: false,
    errors: '',

    page: 1,
    size: 6,
    pagesCount: 0,
    totalPages: 0,
    totalElements: 0,

    searchString: '',
    updateRequestStatus: 'idle',

    categories: [],
    catLoading: 'idle',

    countries: [],
    countriesLoading: 'idle',

    productLengths: [],
    productLengthsLoading: 'idle'
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
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
    },
    setUpdatedProduct: (state, action) => {
      state.products.map(obj => state.products.find(product => product.id === action.payload.id) || obj)
    }
  },
  extraReducers: {
    [fetchCountries.pending]: (state, action) => {
      state.countriesLoading = 'loading'
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.countriesLoading = 'fulfilled'
      // Add any fetched posts to the array
      state.countries = action.payload
    },
    [fetchCountries.rejected]: (state, action) => {
      state.countriesLoading = 'rejected'
      state.errors = action.errors
    },
    [fetchCategories.pending]: (state, action) => {
      state.catLoading = 'loading'
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.catLoading = 'fulfilled'
      state.categories = action.payload
    },
    [fetchCategories.rejected]: (state, action) => {
      state.catLoading = 'rejected'
      state.errors = action.errors
    },
    [fetchProductLengths.pending]: (state, action) => {
      state.productLengthsLoading = 'loading'
    },
    [fetchProductLengths.fulfilled]: (state, action) => {
      state.productLengthsLoading = 'fulfilled'
      // Add any fetched posts to the array
      state.productLengths = state.productLengths.concat(action.payload)
    },
    [fetchProductLengths.rejected]: (state, action) => {
      state.productLengthsLoading = 'rejected'
      state.errors = action.errors
    }
  }
})
export const {
  setLoading,
  setErrors,
  setProducts,
  setProduct,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize,
  setUpdatedProduct
} = productSlice.actions

export default productSlice.reducer

export const productSelector = state => state.productsState

export const getProducts = (searchCriteria, shopId = null) => {
  return async dispatch => {
    dispatch(setLoading(true))
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
          dispatch(setProducts(response.objects))
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

export const deleteProduct = (productId) => {
  return async dispatch => {
    try {
      const promise = deleteProductRequest(productId)
      promise
        .then(response => {
          notification.success({
            message: 'Цветочный магазин',
            description: 'Успешное удаление!'
          })
          window.location.href = '/products'

          dispatch(setProducts(response.objects))
          dispatch(setTotalPages(response.totalPages))
          dispatch(setTotalElements(response.totalElements))
          dispatch(setLoading(false))
        })
    } catch (error) {
      dispatch(setErrors(error))

      if (error.status === 401) {
        window.location.href = '/'
        notification.success({
          message: 'Цветочный магазин',
          description: localizedStrings.alertLoggedOut
        })
      } else if (error.status === 404) {
        notification.error({
          message: 'Цветочный магазин',
          description: 'Продукт не найден!'
        })
      } else {
        notification.error({
          message: 'Цветочный магазин',
          description: error.message || localizedStrings.alertException
        })
      }
    }
  }
}


export const updateProduct = (productId, product) => {
  return async dispatch => {

    console.log('updateProduct', product)
    console.log('productId= ' + JSON.stringify(productId))
    console.log('product ' + JSON.stringify(product))

    const updatedProduct = await updateProductRequest(productId, product)

    if (updatedProduct) {
      notification.success({
        message: 'Цветочный магазин',
        description: 'Успешное обновление!'
      })
      window.location.href = '/products'
      dispatch(setUpdatedProduct(updatedProduct))
    } else {
      notification.success({
        message: 'Цветочный магазин',
        description: 'Что-то пошло не так при обновлении!'
      })
    }
  }
}

export const getProduct = (productId) => {
  return async dispatch => {
    try {
      const promise = getProductRequest(productId)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          console.log('response in product ', response)
          notification.success({
            message: 'Цветочный магазин',
            description: 'product найден!'
          })
          dispatch(setProduct())
        })
    } catch (error) {
      dispatch(setErrors(error))
      notification.error({
        message: 'Цветочный магазин',
        description: 'Не удалось найти product!'
      })
    }
  }
}