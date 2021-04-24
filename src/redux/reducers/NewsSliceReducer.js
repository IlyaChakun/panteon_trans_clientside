import { createSlice } from '@reduxjs/toolkit'
import { getAllNews } from '../../service/NewService'


const initialState = {

  loading: false,
  errors: '',

  news: [],
  newNews: {},

  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}
const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setNews: (state, action) => {
      state.news = action.payload
    },
    setNewNews: (state, action) => {
      state.newNews = action.payload
    },
    setAddCargo: (state, action) => {
      const newNews = action.payload
      state.news = {
        ...state.news,
        newNews
      }
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
    }
  }
})
export const {
  setLoading,
  setErrors,
  setNews,
  setNewNews,
  setTotalPages,
  setTotalElements,
  setPage,
  setSize
} = newsSlice.actions

export default newsSlice.reducer

export const newsSelector = (state) => {
  return state.newsState
}

export const getNews = () => {
  return async dispatch => {
    try {
      console.log('start getNews ')
      const promise = getAllNews()
      console.log(JSON.stringify(promise))

      if (!promise) {
        return
      }

      dispatch(setLoading(true))
      dispatch(setNews(promise.objects))
      dispatch(setTotalPages(promise.totalPages))
      dispatch(setTotalElements(promise.totalElements))
      dispatch(setLoading(false))

    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setErrors(error))
    }
  }
}
