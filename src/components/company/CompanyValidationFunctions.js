import {
  COMPANY_LICENCE_NUM_MAX_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
  ERROR,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  SUCCESS
} from '../../constants'
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

export function validateName (name) {
  if (!name) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertCompanyBadNameEmpty
    }
  } else if (name.length > COMPANY_NAME_MAX_LENGTH) {
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

export function validateBankName (name) {
  if (!name) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Название банка не заполнено'
    }
  } else if (name.length > 48) {
    return {
      validationStatus: ERROR,
      errorMsg: 'Название банка слишком длинное'
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null
    }
  }
}

export function validateIBAN (iban) {
  if (iban.length > 34) {
    return {
      validateStatus: ERROR,
      errorMsg: 'IBAN банка слишком длинный'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validatePostalCode (code) {
  if (code.length > 7) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Почтовый код слишком длинный'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validateCheckingAccount (number) {
  if (number === undefined || number.length > 28) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Расчетный счет слишком длинный'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validateLicenceNumber (number) {
  console.log('licence number for validation: ' + number)

  if (number === undefined || number.length > COMPANY_LICENCE_NUM_MAX_LENGTH) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertCompanyLicenceNumberTooLong
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validateLegalAddress (legalAddress) {
  console.log('legalAddress for validation: ' + legalAddress)

  if (legalAddress === undefined) {
    return {
      validateStatus: ERROR,
      errorMsg: localizedStrings.alertCompanyLicenceNumberTooLong
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export function validatePayerAccountNumber (payerAccountNumber) {
  if (payerAccountNumber === undefined || payerAccountNumber.length > 9) {
    return {
      validateStatus: ERROR,
      errorMsg: 'УНП слишком длинный'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}
