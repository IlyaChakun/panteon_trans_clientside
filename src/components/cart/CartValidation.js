import { ERROR, SUCCESS } from '../../constants'

export const validateFlourNumber = (number) => {
  if (!number) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Нужно ввести значение'
    }
  }

  if (number > 100) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Число слишком  большое, не более 100!'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export const validateEntranceNumber = (number) => {
  if (!number) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Нужно ввести значение'
    }
  }

  if (number > 20) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Число слишком  большое, не более 20!'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}
