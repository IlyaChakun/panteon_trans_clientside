export const SENSOR_NAME_MIN_LENGTH = 2
export const SENSOR_NAME_MAX_LENGTH = 30
export const SENSOR_MODEL_MIN_LENGTH = 2
export const SENSOR_MODEL_MAX_LENGTH = 15
export const SENSOR_LOCATION_MAX_LENGTH = 40
export const SENSOR_DESCRIPTION_MAX_LENGTH = 200

export const NAME_MIN_LENGTH = 5
export const NAME_MAX_LENGTH = 30

export const COMPANY_NAME_MAX_LENGTH = 48
export const COMPANY_DESCRIPTION_MAX_LENGTH = 512
export const COMPANY_LICENCE_NUM_MAX_LENGTH = 20

export const EMAIL_MAX_LENGTH = 48

export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_MAX_LENGTH = 20

export const BASE_URL = 'http://localhost:8081/'
export const BASE_AUTH_SERVICE_URL = 'http://localhost:8081/'
export const BASE_COMPANY_SERVICE_URL = 'http://localhost:8082/'
/* SECURITY HEADERS*/
export const ACCESS_TOKEN_HEADER_KEY = 'Authorization-Access-Token'
export const REFRESH_TOKEN_HEADER_KEY = 'Authorization-Refresh-Token'
export const TOKEN_TYPE_HEADER_KEY = 'Token-Type'
export const VALID_TOKEN_TYPE_VALUE = 'bearer'
export const GRANT_TYPE_HEADER_KEY = 'Grant-Type'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

export const TOKEN = 'token'

export const USER_ID = 'id'
export const LANGUAGE = 'language'
export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_USER = 'Viewer'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GITHUB_AUTH_URL = BASE_URL + 'oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI
export const GOOGLE_AUTH_URL = BASE_URL + 'oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI
export const FACEBOOK_AUTH_URL = BASE_URL + 'oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI

export const GoogleMapsAPI = 'AIzaSyCQaNjrxHBqrdRLDSGNCePlwVoRO3QibdY'
