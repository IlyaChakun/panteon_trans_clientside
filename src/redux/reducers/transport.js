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

// const transportSlice = createSlice({
//   name: 'transport',
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload
//     },
//     setErrors: (state, action) => {
//       state.errors = action.payload
//     },
//     setTransports: (state, action) => {
//       state.transports = action.payload
//     },
//     setTransport: (state, action) => {
//       state.transport = action.payload
//     },
//     setAddTransport: (state, action) => {
//       const transport = action.payload
//       state.transports = {
//         ...state.transports,
//         transport
//       }
//     },

//     setTotalPages: (state, action) => {
//       state.totalPages = action.payload
//     },
//     setTotalElements: (state, action) => {
//       state.totalElements = action.payload
//     },
//     setPage: (state, action) => {
//       state.page = action.payload
//     },
//     setSize: (state, action) => {
//       state.size = action.payload
//     }
//   }
// })

// export const {
//   setLoading,
//   setErrors,
//   setTransports,
//   setTransport,
//   setTotalPages,
//   setTotalElements,
//   setPage,
//   setSize
// } = transportSlice.actions

// export default transportSlice.reducer

// export const transportSelector = (state) => {
//   return state.transportState
// }