import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_HEADER_KEY, GRANT_TYPE_HEADER_KEY,
  REFRESH_TOKEN, REFRESH_TOKEN_HEADER_KEY,
  TOKEN_TYPE_HEADER_KEY,
  VALID_TOKEN_TYPE_VALUE
} from '../../constants'

export default function authHeader(grantType) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })

  if (grantType !== 'anon_action') {
    if (localStorage.getItem(ACCESS_TOKEN)) {

      console.log('TOKEN PRESENT!')
      console.log(localStorage.getItem(ACCESS_TOKEN))
      console.log(localStorage.getItem(REFRESH_TOKEN))

      headers.append(TOKEN_TYPE_HEADER_KEY, VALID_TOKEN_TYPE_VALUE)
      headers.append(ACCESS_TOKEN_HEADER_KEY, localStorage.getItem(ACCESS_TOKEN))
      headers.append(REFRESH_TOKEN_HEADER_KEY, localStorage.getItem(REFRESH_TOKEN))
      headers.append(GRANT_TYPE_HEADER_KEY, 'action')// TODO придумать как сюда передавать grantType вижу как паарметр рядом  с options
    } else {
      headers.append(GRANT_TYPE_HEADER_KEY, 'anon_action')
    }
  } else {
    headers.append(GRANT_TYPE_HEADER_KEY, 'anon_action')
  }
  return headers
}




