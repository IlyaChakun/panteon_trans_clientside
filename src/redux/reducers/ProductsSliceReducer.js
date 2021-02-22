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

const initialState = {
  products: [
    {
      id: 1,
      dateOfLastUpdate: '',
      unique_id: 1,
      categoryId: 1,
      producerId: 1,
      title: 'Сет "Нежный"',
      description: 'roses',
      availableAmount: 10,
      productLengthCost: [
        {
          id: 1,
          stemLength: 50,
          cost: 2.5
        },
        {
          id: 2,
          stemLength: 60,
          cost: 3
        }
      ],
      image: imagePic
    },
    {
      id: 2,
      dateOfLastUpdate: '',
      unique_id: 2,
      categoryId: 1,
      producerId: 1,
      title: 'pink red',
      description: 'roses',
      availableAmount: 100,
      productLengthCost: [
        {
          id: 2,
          stemLength: 60,
          cost: 3
        }
      ],
      image: imagePic
    },
    {
      id: 3,
      dateOfLastUpdate: '',
      unique_id: 3,
      categoryId: 1,
      producerId: 1,
      title: 'llll red',
      description: 'rotttes',
      availableAmount: 50,
      productLengthCost: [
        {
          id: 3,
          stemLength: 70,
          cost: 5
        }
      ],
      image: imagePic
    }
  ],
  categories: ['Готовые букеты', 'Премиум букеты',
    'Корзины с цветами', 'Цветы поштучно', 'Акционные букеты'],


  flowerTypesValues: [{ flowerType: 'rose' }, { flowerType: 'fiona' }],
  flowerSortsValues: [{ sortNameRu: 'naomi' }, { sortNameRu: 'pine' }],
  flowerColorsValues: [{ colorName: 'red' }, { colorName: 'pink' }],
  flowerLengthCostValues: [
    {
      stemLength: 70,
      cost: 2.5
    },
    {
      stemLength: 60,
      cost: 2.0
    }
  ],
  countriesValues: [{ countryNameRu: 'рф' }, { countryNameRu: 'рб' }],


  loading: false,
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
    },
    setCategories: (state, payload) => {
      state.categories = payload
    },


    setCountriesValues: (state, payload) => {
      state.countriesValues = payload
    },
    setFlowerTypesValues: (state, payload) => {
      state.flowerTypesValues = payload
    },
    setFlowerSortsValues: (state, payload) => {
      state.flowerSortsValues = payload
    },
    setFlowerColorsValues: (state, payload) => {
      state.flowerColorsValues = payload
    },
    setFlowerLengthCostValues: (state, payload) => {
      state.flowerLengthCostValues = payload
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
  setShopId,
  setCategories,
  setCountriesValues,
  setFlowerTypesValues,
  setFlowerSortsValues,
  setFlowerColorsValues,
  setFlowerLengthCostValues
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


export const getCategories = () => {
  return async dispatch => {

    axios.get('http://localhost:8084/categories')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setCategories(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}


export const getCountriesValues = () => {
  return async dispatch => {

    axios.get('http://localhost:8084/countriesValues')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setCountriesValues(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}

export const getFlowerTypesValues = () => {
  return async dispatch => {

    axios.get('http://localhost:8084/flowerTypesValues')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setFlowerTypesValues(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}

export const getFlowerSortsValues = () => {
  return async dispatch => {

    axios.get('http://localhost:8084/flowerSortsValues')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setFlowerSortsValues(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}

export const getFlowerColorsValues = () => {
  return async dispatch => {

    axios.get('http://localhost:8084/flowerColorsValues')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setFlowerColorsValues(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}

export const getFlowerLengthCostValues = () => {
  return async dispatch => {

    axios.get('http://localhost:8084/flowerLengthCostValues')
      .then(resp => {
        dispatch(setLoading(true))
        dispatch(setFlowerLengthCostValues(resp.data))
        dispatch(setLoading(false))
      })
      .catch(error => {
        dispatch(setErrors(error))
        console.log(error)
      })
  }
}
