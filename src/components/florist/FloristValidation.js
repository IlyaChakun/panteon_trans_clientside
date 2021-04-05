import { ERROR, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, SUCCESS } from '../../constants'
import { localizedStrings } from '../util/localization'

export const validatePassoword = (password) => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertBadPasswordTooShort
    }
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      validationStatus: ERROR,
      errorMsg: localizedStrings.alertBadPasswordTooLong
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null
    }
  }
}
