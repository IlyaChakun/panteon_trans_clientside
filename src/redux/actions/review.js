import {
  SET_REVIEWS,
  REVIEW_SET_TOTAL_PAGES,
  REVIEW_SET_TOTAL_ELEMENTS,
  REVIEW_SET_PAGE,
  REVIEW_SET_SIZE,
  CLEAR_REVIEWS,
  REVIEW_SET_IS_LOADING,
  REVIEW_SET_ERRORS, ADD_COMPANY_REVIEW
} from '../actions/types'

import ReviewService from '../../service/ReviewService'

export const getReviews = (searchCriteria) => async (dispatch) => {
  try {
    const promise = ReviewService.getAllReviews(searchCriteria)

    if (!promise) {
      return
    }

    dispatch({
      type: REVIEW_SET_IS_LOADING,
      payload: true
    })
    dispatch({
      type: SET_REVIEWS,
      payload: promise.objects
    })
    dispatch({
      type: REVIEW_SET_TOTAL_PAGES,
      payload: promise.totalPages
    })
    dispatch({
      type: REVIEW_SET_TOTAL_ELEMENTS,
      payload: promise.totalElements
    })
    dispatch({
      type: REVIEW_SET_IS_LOADING,
      payload: false
    })

  } catch (error) {
    dispatch({
      type: REVIEW_SET_IS_LOADING,
      payload: false
    })
    dispatch({
      type: REVIEW_SET_ERRORS,
      payload: error
    })
  }
}

export const addReview = (reviewData) => (dispatch) => {
  return ReviewService.addReview(reviewData).then((data) => {
    return Promise.resolve(data)
  })
}

export const addCompanyReview = (id, reviewData) => (dispatch) => {
  return ReviewService.addCompanyReview(id, reviewData).then(
    response => {
      dispatch({
        type: ADD_COMPANY_REVIEW,
        payload: response.data
      })
      return Promise.resolve(response)
    },
    error => {
      return Promise.reject(error)
    }
  )
}

export const setPage = (page) => (dispatch) => {
  dispatch({
    type: REVIEW_SET_PAGE,
    payload: page
  })
}

export const setSize = (size) => (dispatch) => {
  dispatch({
    type: REVIEW_SET_SIZE,
    payload: size
  })
}
