import {
    NEWS_SET_IS_LOADING,
    NEWS_SET_ERRORS,
    SET_NEWS,
    SET_NEW,
    ADD_NEW,
    NEWS_SET_TOTAL_PAGES,
    NEWS_SET_TOTAL_ELEMENTS,
    NEWS_SET_PAGE,
    NEWS_SET_SIZE,
} from "../actions/types";

import { getAllNews } from '../../service/NewService'

export const getNews = () => {
    return async dispatch => {
      try {
        console.log('start getNews ')
        const promise = getAllNews()
        console.log(JSON.stringify(promise))
  
        if (!promise) {
          return
        }
  
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