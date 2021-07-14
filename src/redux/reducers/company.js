import {
  COMPANY_SET_IS_LOADING,
  COMPANY_SET_ERRORS,
  SET_COMPANIES,
  SET_COMPANY,
  ADD_COMPANY,
  COMPANY_SET_TOTAL_PAGES,
  COMPANY_SET_TOTAL_ELEMENTS,
  COMPANY_SET_PAGE,
  COMPANY_SET_SIZE
} from "../actions/types";

const initialState = {
  isLoading: false,
  errors: '',
  companies: [],
  company: {},
  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case COMPANY_SET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case SET_COMPANIES:
      return {
        ...state,
        companies: payload
      };
    case SET_COMPANY:
      return {
        ...state,
        company: payload
      };
    case ADD_COMPANY:
      return {
        ...state,
        companies: [...state.companies, payload]
      };
    case COMPANY_SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload
      };
    case COMPANY_SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: payload
      };
    case COMPANY_SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case COMPANY_SET_SIZE:
      return {
        ...state,
        size: payload
      };
    default:
      return state;
  }
}
