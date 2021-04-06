import { ERROR, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, SUCCESS } from '../../constants'
import { localizedStrings } from '../util/localization'

export const validateExperience = (experience) => {
  if (experience < 0.5) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Мы не берем на работу со стажем меньше чем 0,5 года'
    }
  } else if (experience > 50) {
    return {
      validationStatus: ERROR,
      errorMsg: 'Мы не берем на работу пенсионеров. Извините! Вам надо отдыхать'
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null
    }
  }
}

export const validateSalary = (salary) => {
  if (salary < 250) {
    return {
      validateStatus: ERROR,
      errorMsg: 'Зарплаты меньше 250 просто не бывает'
    }
  } else if (salary > 5000) {
    return {
      validationStatus: ERROR,
      errorMsg: 'Поумерьте Ваш пыл, мы маленькая фирма!'
    }
  } else {
    return {
      validateStatus: SUCCESS,
      errorMsg: null
    }
  }
}

