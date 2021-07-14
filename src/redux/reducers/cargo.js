import {
  CARGO_SET_IS_LOADING,
  CARGO_SET_ERRORS,
  SET_CARGOS,
  SET_CARGO,
  ADD_CARGO,
  CARGO_SET_TOTAL_PAGES,
  CARGO_SET_TOTAL_ELEMENTS,
  CARGO_SET_PAGE,
  CARGO_SET_SIZE
} from "../actions/types";

const initialState = {
  isLoading: false,
  errors: '',
  cargos: [],
  cargo: {},
  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0

}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CARGO_SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case CARGO_SET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case SET_CARGOS:
      return {
        ...state,
        cargos: payload
      };
    case SET_CARGO:
      return {
        ...state,
        cargo: payload
      };
    case ADD_CARGO:
      return {
        ...state,
        cargos: [...state.cargos, payload]
      };
    case CARGO_SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload
      };
    case CARGO_SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: payload
      };
    case CARGO_SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case CARGO_SET_SIZE:
      return {
        ...state,
        size: payload
      };
    default:
      return state;
  }
}