import {
  TRANSPORT_SET_IS_LOADING,
  TRANSPORT_SET_ERRORS,
  SET_TRANSPORTS,
  SET_TRANSPORT,
  ADD_TRANSPORT,
  TRANSPORT_SET_TOTAL_PAGES,
  TRANSPORT_SET_TOTAL_ELEMENTS,
  TRANSPORT_SET_PAGE,
  TRANSPORT_SET_SIZE,
} from "../actions/types";

import { getAllTransport } from '../../service/TransportService'

const initialState = {
  loading: false,
  errors: '',
  transports: [],
  transport: {},
  page: 1,
  size: 2,
  pagesCount: 0,
  totalPages: 0,
  totalElements: 0
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TRANSPORT_SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case TRANSPORT_SET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case SET_TRANSPORTS:
      return {
        ...state,
        transports: payload
      };
    case SET_TRANSPORT:
      return {
        ...state,
        transport: payload
      };
    case ADD_TRANSPORT:
      return {
        ...state,
        transports: [...state.transports, payload]
      };
    case TRANSPORT_SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload
      };
    case TRANSPORT_SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: payload
      };
    case TRANSPORT_SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case TRANSPORT_SET_SIZE:
      return {
        ...state,
        size: payload
      };
    default:
      return state;
  }
}