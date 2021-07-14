import {
  CLIENT_SET_IS_LOADING,
  CLIENT_SET_ERRORS,
  CLIENT_SET_TOTAL_PAGES,
  CLIENT_SET_TOTAL_ELEMENTS,
  CLIENT_SET_PAGE,
  CLIENT_SET_SIZE,
  SET_CLIENTS
} from "../actions/types";

const initialState = {
  isLoading: false,
  errors: '',
  clients: [],
  page: 1,
  size: 6,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLIENT_SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case CLIENT_SET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case SET_CLIENTS:
      return {
        ...state,
        clients: payload
      };
    case CLIENT_SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload
      };
    case CLIENT_SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: payload
      };
    case CLIENT_SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case CLIENT_SET_SIZE:
      return {
        ...state,
        size: payload
      };
    default:
      return state;
  }
}