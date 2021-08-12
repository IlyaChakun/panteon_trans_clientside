import {
  NEWS_SET_IS_LOADING,
  NEWS_SET_ERRORS,
  SET_NEWS,
  SET_NEW,
  ADD_NEW,
  NEWS_SET_TOTAL_PAGES,
  NEWS_SET_TOTAL_ELEMENTS,
  NEWS_SET_PAGE,
  NEWS_SET_SIZE, CARGO_SET_IS_LOADING, SET_CARGOS, CARGO_SET_TOTAL_PAGES, CARGO_SET_TOTAL_ELEMENTS
} from '../actions/types'
import NewService from '../../service/NewService'

export const getNews = () => {
    return async dispatch => {
      try {
        const promise = {}
        dispatch({
            type: NEWS_SET_IS_LOADING,
            payload: true
        })
        dispatch({
            type: SET_NEWS,
            payload: promise.objects
        })
        dispatch({
            type: NEWS_SET_TOTAL_PAGES,
            payload: promise.totalPages
        })
        dispatch({
            type: NEWS_SET_TOTAL_ELEMENTS,
            payload: promise.totalElements
        })
        dispatch({
            type: NEWS_SET_IS_LOADING,
            payload: false
        })
  
      } catch (error) {
        dispatch({
            type: NEWS_SET_IS_LOADING,
            payload: false
        })
        dispatch({
            type: NEWS_SET_ERRORS,
            payload: error
        })
      }
    }
}

export const addArticle = (file, articleData) => (dispatch) => {
  return NewService.addArticle(file, articleData).then(
    (data) => {
      console.log('data sent succesfully')
      return Promise.resolve()
    },
    (error) => {
      console.log('err in create action: ', error)
      return Promise.reject()
    }
  )
}

export const getArticles = (searchParams) => (dispatch) => {
  return NewService.getArticles(searchParams)
    .then(
      (response) => {
        dispatch({
          type: SET_NEWS,
          payload: response.data.articles
        })
        dispatch({
          type: NEWS_SET_TOTAL_PAGES,
          payload: response.data.totalPages
        })
        dispatch({
          type: NEWS_SET_TOTAL_ELEMENTS,
          payload: response.data.totalItems
        })

        console.log('data got succesfully')
        return Promise.resolve()
      },
      (error) => {
        console.log('err in get all action: ', error)
        return Promise.reject()
      }
    )
}

export const setPage = (page) => (dispatch) => {
    dispatch({
        type: NEWS_SET_PAGE,
        payload: page
    })
}

export const setSize = (size) => (dispatch) => {
    dispatch({
        type: NEWS_SET_SIZE,
        payload: size
    })
}