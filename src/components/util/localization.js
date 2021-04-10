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
} from '../../constants'

export const localizedStrings = new LocalizedStrings({

  en: {
    logout: 'Logout',
    login: 'Login',
    signUp: 'Register',
    sensor: 'Sensors',
    appName: 'Flower Shop',
    loginFormRegisterNow: ' register now!',
    alreadyRegister: 'Already registered?',
    signUpFromLoginNow: 'Login now!',
    or: 'or',
    email: 'Email',
    password: 'Password',
    emailField: 'Email',
    editSensor: 'Edit sensor',
    addSensor: 'Add sensor',

    // sensors
    sensorName: 'Name',
    model: 'Model',
    type: 'Type',
    location: 'Location',
    description: 'Description',
    found: 'Total: ',

    companyName: 'Название',
    companyLicenceNumber: 'Номер лицензии',
    companyDescription: 'Описание',

    //
    profile: 'Profile',
    yourName: 'Your name: ',
    yourLogin: 'Your login: ',
    yourPhoneNumber: 'Your phone number: ',

    currentPassword: 'Current password: ',
    newPassword: 'New password: ',

    /// params
    name: 'Name',
    confPassword: 'Confirmed password',
    // alerts
    alertBadEmail: 'Please input your email!',
    alertBadPassword: 'Please input your Password!',
    alertSuccessRegister: 'Thank you! You\'re successfully registered. Please Login to continue!',

    alertSuccessfulUserUpdate: 'Editing has completed successfully!',

    alertException: 'Sorry! Something went wrong. Please try again!',

    alertBadNameTooShort: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`,
    alertBadNameTooLong: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`,
    alertBadNameEmpty: 'Name can`t be empty!',

    alertBadLoginTooLong: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
    alertLoginEmpty: 'Email may not be empty',
    alertLoginAlreadyRegistered: 'This Email is already registered',

    alertBadEmailTooLong: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
    alertEmailEmpty: 'Email may not be empty',
    alertEmailNotValid: 'Email not valid',
    alertEmailAlreadyRegistered: 'This Email is already registered',

    alertBadPasswordTooShort: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
    alertBadPasswordTooLong: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
    alertBadConfirmedPasswordNotEqual: ' Conf not equals pass',

    //
    alertAppName: 'Flower shop',
    alertLoggedOut: 'You have been logged out. Please login to create sensor.',

    alertWrongEmailOrPassword: 'Your Username or Password is incorrect. Please try again!',
    alertSuccessLogin: 'You are successfully logged in!',

    alertNoPermission: 'No permissions,Sorry!',
    alertSuccessLogOut: 'You are successfully logged out!',

    alertPageNotFound: ' The Page you\'re looking for was not found. ',
    alertPageNoPermission: 'You have no permission. Sorry!',

    // helpers
    helpForInputEmail: 'Please input your Email!',
    helpForInputPass: 'Please input your Password!',
    helpForInputSomething: 'Input something!',

    helpForPass: 'A password between 6 to 20 characters',
    helpForEmail: 'Your email',

    helpSearch: 'Search...',
    chooseValue: 'Choose value',

    helpCancel: 'Cancel',
    helpOk: 'Ok',

    helpForChooseProfileColor: 'Please pick your profile color: ',

    // buttons
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    cancel: 'Cancel',
    edit: 'Edit',
    changePassword: 'Change password',

    // Social
    useSocial: 'use your social account:',
    logInWithGoogle: 'Sign in with Google',
    logInWithGithub: 'Sign in with GitHub',
    logInWithFacebook: 'Sign in with Facebook'
    ///
  },
  ru: {
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
