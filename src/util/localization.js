import LocalizedStrings from 'react-localization'
import {
  COMPANY_DESCRIPTION_MAX_LENGTH,
  COMPANY_LICENCE_NUM_MAX_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from '../constants'

export const localizedStrings = new LocalizedStrings({

  en_old: {
    logout: 'Выйти',
    login: 'Войти',
    signUp: 'Зарегистрироваться',
    sensor: 'Сенсоры',
    appName: 'Мониторинг сенсоров',
    loginFormRegisterNow: ' зарегистрируйся сейчас!',
    alreadyRegister: 'Уже зарегистрированы?',
    signUpFromLoginNow: 'Залогиньтесь!',
    noAccount: 'Нет аккаунта? ',
    alreadyHaveAccount: 'Уже есть аккаунт? ',
    restorePassword: 'Восстановить пароль',
    email: 'Электронная почта',
    password: 'Пароль',
    repeatPassword: 'Повторите пароль',
    emailField: 'Электронная почта',
    editSensor: 'Изменить сенсор',
    addSensor: 'Добавить сенсор',

    // sensors
    found: 'Всего: ',

    // company
    companyName: 'Название',
    companyLicenceNumber: 'Номер лицензии',
    companyDescription: 'Описание',

    //

    profile: 'Профиль',
    yourName: 'Ваше имя: ',
    yourLogin: 'Ваш логин: ',

    /// params
    name: 'Имя',
    confPassword: 'Подтвержденный пароль',

    // alerts
    alertBadEmail: 'Пожалуйста, введите Вашу электронную почту',
    alertBadPassword: 'Пожалуйста, введите Ваш пароль',
    alertSuccessRegister: 'Спасибо! Вы успешно зарегистрированы. Пожалуйста, залогиньтесь для продолжения!',

    alertException: 'Извините! Что-то пошло не так. Попробуйте еще раз!',

    alertRebootPage: 'Перезагрузить? Возможно, внесенные изменения не сохранятся.',

    alertBadNameTooShort: `Имя очень короткое! (Минимум ${NAME_MIN_LENGTH} символов)`,
    alertBadNameTooLong: `Имя очень длинное (Максимум ${NAME_MAX_LENGTH} символов)`,

    alertBadLoginTooLong: `Логин очень длинный (Максимум ${EMAIL_MAX_LENGTH} символов)`,
    alertLoginEmpty: 'Логин не может быть пустым',
    alertLoginAlreadyRegistered: 'Этот логин уже зарегистрирован',

    alertBadEmailTooLong: `Email очень длинный (Максимум ${EMAIL_MAX_LENGTH} символов)`,
    alertEmailEmpty: 'Email не может быть пустым',
    alertEmailNotValid: 'Email не валидный',
    alertEmailAlreadyRegistered: 'Этот Email уже зарегистрирован',

    alertBadPasswordTooShort: `Пароль очень короткий! (Минимум ${PASSWORD_MIN_LENGTH} символов)`,
    alertBadPasswordTooLong: `Пароль очень длинный (Максимум  ${PASSWORD_MAX_LENGTH} символов)`,
    alertBadConfirmedPasswordNotEqual: ' Подтвержденный пароль не соответсвует паролю',

    // company////
    alertCompanyBadNameEmpty: 'Название компании не может быть пустым!',
    alertCompanyBadNameTooLong: `Название слишком длинное (Более ${COMPANY_NAME_MAX_LENGTH} символов )`,

    alertCompanyDescriptionTooLong: `Описание слишком длинное (Более ${COMPANY_DESCRIPTION_MAX_LENGTH} символов )`,

    alertCompanyLicenceNumberTooLong: `Номер лицензии слишком длинный (Более ${COMPANY_LICENCE_NUM_MAX_LENGTH} символов )`,

    companyShops: 'Магазины',
    aboutCompany: 'О компании',
    /// //////////

    // sensors

    alertAppName: 'Магазин цветов',
    alertLoggedOut: 'Вы вышли из системы. Пожалуйста, залогиньтесь для этого действия.',

    alertWrongEmailOrPassword: 'Ваш логин или пароль неверны. Пожалуйста, попробуйте еще раз!',
    alertSuccessLogin: 'Успешный вход!',

    alertNoPermission: 'У вас нет прав, сори!',
    alertSuccessLogOut: 'Успешный выход!',

    alertPageNotFound: ' Страница не найдена! ',
    alertPageNoPermission: ' У вас нет прав, сори!',

    /// helpers
    helpForInputEmail: 'Пожалуйста введите ваш Email!',
    helpForInputPass: 'Пожалуйста введите ваш пароль!',
    helpForInputSomething: 'Пожалуйста введите что-нибудь!',

    helpForPass: 'Пароль должен быть от 6 до 20 символов',
    helpForEmail: 'Ваша электронная почта',

    helpSearch: 'Поиск...',
    chooseValue: 'Выберите значение',

    helpDeleteModal: 'Вы уверены, что хотите удалить сенсор?',
    helpCancel: 'Отменить',
    helpOk: 'Да',

    helpForChooseProfileColor: 'Выберите цвет для вашего профиля: ',

    // buttons
    save: 'Сохранить',
    delete: 'Удалить',
    search: 'Поиск',
    cancel: 'Отменить',
    edit: 'Изменить',

    // Social
    useSocial: 'используйте свой аккаунт в соц сетях:',
    logInWithGoogle: 'Зарегистрировастья через Гугл',
    logInWithGithub: 'Зарегистрировастья через ГитХаб',
    logInWithFacebook: 'Зарегистрировастья через Фейсбук'
    ///
  },
  en: {
    logout: 'Выйти',
    login: 'Войти',
    signUp: 'Зарегистрироваться',
    sensor: 'Сенсоры',
    appName: 'Мониторинг сенсоров',
    loginFormRegisterNow: ' зарегистрируйся сейчас!',
    alreadyRegister: 'Уже зарегистрированы?',
    signUpFromLoginNow: 'Залогиньтесь!',
    or: 'или',
    email: 'Электронная почта',
    password: 'Пароль',
    emailField: 'Электронная почта',
    editSensor: 'Изменить сенсор',
    addSensor: 'Добавить сенсор',

    // sensors
    found: 'Всего: ',

    // company
    companyName: 'Название',
    companyLicenceNumber: 'Номер лицензии',
    companyDescription: 'Описание',

    //

    profile: 'Профиль',
    yourName: 'Ваше имя: ',
    yourLogin: 'Ваш логин: ',

    /// params
    name: 'Имя',
    confPassword: 'Подтвержденный пароль',

    // alerts
    alertBadEmail: 'Пожалуйста, введите Вашу электронную почту',
    alertBadPassword: 'Пожалуйста, введите Ваш пароль',
    alertSuccessRegister: 'Спасибо! Вы успешно зарегистрированы. Пожалуйста, залогиньтесь для продолжения!',

    alertException: 'Извините! Что-то пошло не так. Попробуйте еще раз!',

    alertRebootPage: 'Перезагрузить? Возможно, внесенные изменения не сохранятся.',

    alertBadNameTooShort: `Имя очень короткое! (Минимум ${NAME_MIN_LENGTH} символов)`,
    alertBadNameTooLong: `Имя очень длинное (Максимум ${NAME_MAX_LENGTH} символов)`,

    alertBadLoginTooLong: `Логин очень длинный (Максимум ${EMAIL_MAX_LENGTH} символов)`,
    alertLoginEmpty: 'Логин не может быть пустым',
    alertLoginAlreadyRegistered: 'Этот логин уже зарегистрирован',

    alertBadEmailTooLong: `Email очень длинный (Максимум ${EMAIL_MAX_LENGTH} символов)`,
    alertEmailEmpty: 'Email не может быть пустым',
    alertEmailNotValid: 'Email не валидный',
    alertEmailAlreadyRegistered: 'Этот Email уже зарегистрирован',

    alertBadPasswordTooShort: `Пароль очень короткий! (Минимум ${PASSWORD_MIN_LENGTH} символов)`,
    alertBadPasswordTooLong: `Пароль очень длинный (Максимум  ${PASSWORD_MAX_LENGTH} символов)`,
    alertBadConfirmedPasswordNotEqual: ' Подтвержденный пароль не соответсвует паролю',
    alertPasswordsAreNotequal: 'Пароли не сопадают',

    // company////
    alertCompanyBadNameEmpty: 'Название компании не может быть пустым!',
    alertCompanyBadNameTooLong: `Название слишком длинное (Более ${COMPANY_NAME_MAX_LENGTH} символов )`,

    alertCompanyDescriptionTooLong: `Описание слишком длинное (Более ${COMPANY_DESCRIPTION_MAX_LENGTH} символов )`,

    alertCompanyLicenceNumberTooLong: `Номер лицензии слишком длинный (Более ${COMPANY_LICENCE_NUM_MAX_LENGTH} символов )`,

    companyShops: 'Магазины',
    aboutCompany: 'О компании',
    /// //////////

    // sensors

    alertAppName: 'Магазин цветов',
    alertLoggedOut: 'Вы вышли из системы. Пожалуйста, залогиньтесь для этого действия.',

    alertWrongEmailOrPassword: 'Ваш логин или пароль неверны. Пожалуйста, попробуйте еще раз!',
    alertSuccessLogin: 'Успешный вход!',

    alertNoPermission: 'У вас нет прав, сори!',
    alertSuccessLogOut: 'Успешный выход!',

    alertPageNotFound: ' Страница не найдена! ',
    alertPageNoPermission: ' У вас нет прав, сори!',

    /// helpers
    helpForInputEmail: 'Пожалуйста введите ваш Email!',
    helpForInputPass: 'Пожалуйста введите ваш пароль!',
    helpForInputSomething: 'Пожалуйста введите что-нибудь!',

    helpForPass: 'Пароль должен быть от 6 до 20 символов',
    helpForEmail: 'Ваша электронная почта',

    helpSearch: 'Поиск...',
    chooseValue: 'Выберите значение',

    helpDeleteModal: 'Вы уверены, что хотите удалить сенсор?',
    helpCancel: 'Отменить',
    helpOk: 'Да',

    helpForChooseProfileColor: 'Выберите цвет для вашего профиля: ',

    // buttons
    save: 'Сохранить',
    delete: 'Удалить',
    search: 'Поиск',
    cancel: 'Отменить',
    edit: 'Изменить',

    // Social
    useSocial: 'используйте свой аккаунт в соц сетях:',
    logInWithGoogle: 'Зарегистрировастья через Гугл',
    logInWithGithub: 'Зарегистрировастья через ГитХаб',
    logInWithFacebook: 'Зарегистрировастья через Фейсбук'
    ///
  }
})
