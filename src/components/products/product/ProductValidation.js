import { ERROR, SUCCESS } from '../../../constants'

export const validateId = (id) => {
  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}


export const validateTitle = (description) => {
  if (description === undefined || description.length > 64 || description.length < 4) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Название должно быть от 4х до 64х символов'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export const validateDescription = (description) => {
  if (description === undefined || description.length > 520) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Описание слишком длинное'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}

export const validateAmount = (amount) => {
  if (amount === undefined || amount > 5_000) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Количество слишком большое'
    }
  }

  return {
    validateStatus: SUCCESS,
    errorMsg: null
  }
}
