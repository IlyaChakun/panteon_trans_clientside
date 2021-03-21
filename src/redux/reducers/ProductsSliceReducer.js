import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteProductRequest, getAllShops,
  getCategoriesRequest,
  getCountriesRequest,
  getProductLengthsRequest,
  getProductsByShopIdRequest,
  getProductsRequest,
  saveProductRequest, updateProductRequest
} from '../../components/util/utilsAPI'
import { notification } from 'antd'
import { localizedStrings } from '../../components/util/localization'


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

export const fetchShops = createAsyncThunk(
  'products/fetchShops',
  async () => {
    return await getAllShops()
  })


export const saveProduct = (productRequest) => {
  return async dispatch => {
    const response = await saveProductRequest(productRequest)

    if (response.status === true) {
      notification.success({
        message: localizedStrings.alertAppName,
        description: response.message
      })
    } else {
      notification.error({
        message: localizedStrings.alertAppName,
        description: response.message
      })
    }

    return await getProductsRequest()
  }
}


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],

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
    productLengthsLoading: 'idle',

    shops: [],
    shopsLoading: 'idle'

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
    [fetchShops.pending]: (state, action) => {
      state.shopsLoading = 'loading'
    },
    [fetchShops.fulfilled]: (state, action) => {
      state.shopsLoading = 'fulfilled'
      // Add any fetched posts to the array
      state.shops = action.objects
    },
    [fetchShops.rejected]: (state, action) => {
      state.shopsLoading = 'rejected'
      state.errors = action.errors
    },
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
      const promise = deleteProductRequest(productId)

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

    // case DELETE_TODO:
    //     return {  // returning a copy of orignal state
    //       ...state, //copying the original state
    //       todos: state.todos.filter(todo => todo.id !== action.payload)
    //       // returns a new filtered todos array
    //     }
  }
}


export const updateProduct = (productId, product) => {
  return async dispatch => {
    try {
      console.log('updateProduct', product)
      console.log('productId= ' + JSON.stringify(productId))
      console.log('product ' + JSON.stringify(product))

      const promise = updateProductRequest(productId, product)

      if (!promise) {
        return
      }
      promise
        .then(response => {
          notification.success({
            message: localizedStrings.alertAppName,
            description: 'Успешное обновление!'
          })
          // window.location.href = '/products'
          dispatch(setUpdatedProduct(response))
        })
    } catch (error) {
      dispatch(setErrors(error))
    }


    // const updatedProduct = await updateProductRequest(productId, product)
    //
    // if (updatedProduct) {
    //   notification.success({
    //     message: localizedStrings.alertAppName,
    //     description: 'Успешное обновление!'
    //   })
    //   dispatch(updateProduct(updatedProduct))
    // } else {
    //   notification.success({
    //     message: localizedStrings.alertAppName,
    //     description: 'Что-то пошло не так при обновлении!'
    //   })
    // }

  }
}
