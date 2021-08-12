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

const initialState = {
  errors: '',
  news: [],
  newNews: {},
  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEWS_SET_ERRORS:
      return {
        ...state,
        errors: payload
      }
    case SET_NEWS:
      return {
        ...state,
        news: payload
      }
    case SET_NEW:
      return {
        ...state,
        newNews: payload
      }
    case ADD_NEW:
      return {
        ...state,
        news: [...state.news, payload]
      }
    case NEWS_SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload
      }
    case NEWS_SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: payload
      }
    case NEWS_SET_PAGE:
      return {
        ...state,
        page: payload
      }
    case NEWS_SET_SIZE:
      return {
        ...state,
        size: payload
      }
    default:
      return state
  }
}
