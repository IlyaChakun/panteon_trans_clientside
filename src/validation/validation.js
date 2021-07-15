import {
  EMAIL_MAX_LENGTH,
  ERROR,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  SUCCESS
} from '../constants'
import { localizedStrings } from '../util/localization'

export function validateUserName (name) {
  if (name.length < NAME_MIN_LENGTH) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertBadNameTooShort
    }
  } else if (name.length > NAME_MAX_LENGTH) {
    return {
      validationStatus: ERROR,
      errorMsg: localizedStrings.alertBadNameTooLong
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null
    }
  }
}

export function validateEmail (email) {
  if (!email) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertLoginEmpty
    }
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertBadLoginTooLong
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validatePhoneNumber (phoneNumber) {
  if (!phoneNumber) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Нужно ввести номер телефона'
    }
  }

  if (phoneNumber.length < 11) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Номер телефона не может быть меньше 11 символов'
    }
  } else if (phoneNumber.length > 15) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Телефон слишком длинный'
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null
    }
  }
}

export function validateText (text) {
  if (!text) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Нужно ввести текст'
    }
  }

  if (text.length > 240) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Текст слишком длинный, не более 240 символов!'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validateAddress (address) {

  if (!address) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Нужно ввести адрес'
    }
  }

  if (address.length > 48) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Адрес неверный!'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validateCity (city) {

  if (!city) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Нужно ввести город'
    }
  }

  if (city.length > 48) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Адрес неверный!'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}


export function validatePassword (password) {
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
      errorMsg: null,
    }
  }
}

export function validatePasswordRepeat (password, passwordRepeat) {
  if (password !== passwordRepeat) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertPasswordsAreNotequal
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null,
    }
  }
}


