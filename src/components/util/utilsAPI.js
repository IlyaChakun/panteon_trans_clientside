import {
  BASE_URL,
  VALID_TOKEN_TYPE_VALUE,
  ACCESS_TOKEN_HEADER_KEY,
  REFRESH_TOKEN_HEADER_KEY,
  GRANT_TYPE_HEADER_KEY,
  TOKEN_TYPE_HEADER_KEY,
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from '../../constants'

/**
 * Base method that provides fetch logic to server.
 * Also exactly here all security things will be sat to request headers.
 *
 * @param options
 * @returns {Promise<Response>}
 */
const request = (options, grantType) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  })

  if (grantType !== 'anon_action') {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      // headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))

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

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options)
    .then(response => {
      console.log('request status')
      console.log('response status code= ' + response.status)

      if (response.status === 401) {
        console.log('remove all tokens')
        // сначала пробуем сделать обнолвение через refresh и если опять ошибка то удаляем токены из хранилища

        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)

        // return response.json()
      }

      if (response.status === 400 || response.status === 409 || response.status === 403 || response.status === 404) { // если совсем пиздец
        console.log('throw exception: ' + response)
        console.log('throw exception: ' + response.json())

        console.log('response.code: ' + response.code)
        console.log('response.error: ' + response.error)
        console.log('response.errorDescription: ' + response.errorDescription)

        throw response
      }

      if (response.status !== 204) { // удаление  // !==
        return response.json()
      }
    })
    .then(json => {
      console.log('return final json body: ', json)
      return json
    })
}

export function loginRequest(loginRequest) {
  return request({
    url: BASE_URL + 'auth/users/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  })
}

export function signUpRequest(signupRequest) {
  return request({
    url: BASE_URL + 'auth/users/sign-up',
    method: 'POST',
    body: JSON.stringify(signupRequest)
  })
}

export function updateUserProfileRequest(editUserRequest) {
  console.log('editUserRequest', editUserRequest)
  return request({
    url: BASE_URL + 'users/' + Number(editUserRequest.id),
    method: 'PUT',
    body: JSON.stringify(editUserRequest)
  })
}

export function changeUserPassword(changePasswordUserRequest) {
  return request({
    url: BASE_URL + 'users/' + Number(changePasswordUserRequest.id),
    method: 'PUT',
    body: JSON.stringify(changePasswordUserRequest)
  })
}

export function getCurrentUserRequest() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: BASE_URL + 'users/me',
    method: 'GET'
  })
}

export function getCurrentCompanyRequest() {
  return request({
    url: BASE_URL + 'company',
    method: 'GET'
  })
}

export function saveCompanyRequest(companyRequest) {
  const url = BASE_URL + 'company'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(companyRequest)
  })
}

export function updateCompanyInfoRequest(companyId, updateCompanyRequest) {
  const url = BASE_URL + 'company/' + companyId

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(updateCompanyRequest)
  })
}

export function checkLoginAvailabilityRequest(login) {
  return request({
    url: BASE_URL + 'auth/user/check-email-availability?email=' + login,
    method: 'GET'
  })
}

export function getAllReviewsRequest() {
  const url = BASE_URL + 'company/reviews'

  return request({
    url: url,
    method: 'GET'
  }, 'anon_action')
}

export function saveReviewRequest(reviewRequest) {
  const url = BASE_URL + 'company/reviews'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(reviewRequest)
  })
}

export function saveShopRequest(shopRequest) {
  const url = BASE_URL + 'shops'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(shopRequest)
  })
}

export function updateShopRequest(shopRequest, shopId) {
  const url = BASE_URL + 'shops/' + shopId

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(shopRequest)
  })
}

export function getAllShopsRequest(searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)
  // const searchString = searchCriteria.searchString === undefined ? '' : '&searchString=' + searchCriteria.searchString

  const url = BASE_URL + 'shops?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getAllShops() {

  const url = BASE_URL + 'shops'

  return request({
    url: url,
    method: 'GET'
  })
}

export function getShopByIdRequest(id) {
  return request({
    url: BASE_URL + 'shops/' + id,
    method: 'GET'
  })
}

export function getProductByIdRequest(id) {
  return request({
    url: BASE_URL + 'products/' + id,
    method: 'GET'
  })
}

export function updateProductRequest(productId, updateProductRequest) {
  const url = BASE_URL + 'products/' + productId

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(updateProductRequest)
  })
}

export function deleteProductRequest(flowerId) {
  const url = BASE_URL + 'products/' + flowerId

  return request({
    url: url,
    method: 'DELETE'
  })
}

export function getProductsRequest(searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === undefined ? 1 : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size === undefined ? 10 : searchCriteria.size)

  const url = BASE_URL + 'products?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}


export function getProductsByShopIdRequest(searchCriteria, shopId) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'company/shops/' + shopId + '/products?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getCountriesRequest() {
  return request({
    url: BASE_URL + 'common/countries',
    method: 'GET'
  })
}

export function getCategoriesRequest() {
  return request({
    url: BASE_URL + 'categories',
    method: 'GET'
  })
}

export function getProductLengthsRequest() {
  return request({
    url: BASE_URL + 'common/product-lengths',
    method: 'GET'
  })
}

export function saveProductRequest(productRequest) {
  const url = BASE_URL + 'products'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(productRequest)
  })
}


export function getCartRequest(userId) {
  return request({
    url: BASE_URL + 'carts?userId=' + userId,
    method: 'GET'
  })
}

export function addProductToCartRequest(productCartRequest) {
  const url = BASE_URL + 'carts'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(productCartRequest)
  })
}

export function updateProductInCartRequest(productCartRequest) {
  const url = BASE_URL + 'carts'

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(productCartRequest)
  })
}

export function deleteProductFromCartRequest(productCartRequest) {
  const url = BASE_URL + 'carts'

  return request({
    url: url,
    method: 'DELETE',
    body: JSON.stringify(productCartRequest)
  })
}

export function getClientOrders(searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'orders?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getOrderById(id) {
  const url = BASE_URL + 'orders/' + id

  return request({
    url: url,
    method: 'GET'
  })
}

export function getOrdersByShopIdRequest(searchCriteria, shopId) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'users/admin/company/shops/' + shopId + '/orders?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function createOrderRequest(orderRequest) {
  const url = BASE_URL + 'orders'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(orderRequest)
  })
}
