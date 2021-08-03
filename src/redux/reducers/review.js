import {

  SET_REVIEWS,
  REVIEW_SET_TOTAL_PAGES,
  REVIEW_SET_TOTAL_ELEMENTS,
  REVIEW_SET_PAGE,
  REVIEW_SET_SIZE,
  CLEAR_REVIEWS,
  REVIEW_SET_IS_LOADING,
  REVIEW_SET_ERRORS
} from '../actions/types'

const initialState = {
  isLoading: false,
  errors: '',
  reviews: [],
  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REVIEW_SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case REVIEW_SET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: payload
      };
    case REVIEW_SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload
      };
    case REVIEW_SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: payload
      };
    case REVIEW_SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case REVIEW_SET_SIZE:
      return {
        ...state,
        size: payload
      };
    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: []
      };
    default:
      return state;
  }
}