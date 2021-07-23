import {
  PROFILE_CLEAR,
  PROFILE_SET_CARGOS,
  PROFILE_SET_COMPANY,
  PROFILE_SET_TRANSPORT
} from '../actions/types'

const initialState = {
  cargos: [],
  transports: [],
  company: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_SET_CARGOS:
      return {
        ...state,
        cargos: payload
      }
    case PROFILE_SET_TRANSPORT:
      return {
        ...state,
        transports: payload
      }
    case PROFILE_SET_COMPANY:
      return {
        ...state,
        company: payload
      }
    case PROFILE_CLEAR:
      return {
        cargos: [],
        transports: [],
        company: {}
      }
    default:
      return state
  }
}
