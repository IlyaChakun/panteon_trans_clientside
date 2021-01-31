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
    'Access-Control-Allow-Origin': '*'
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
      console.log('request error')
      console.log('error code= ' + response.status)

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
      console.log('return final json body: ' + json)
      return json
    })
}

export function loginRequest (loginRequest) {
  return request({
    url: BASE_URL + 'auth/users/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  })
}

export function signUpRequest (signupRequest) {
  return request({
    url: BASE_URL + 'auth/users/sign-up',
    method: 'POST',
    body: JSON.stringify(signupRequest)
  })
}

export function updateUserProfileRequest (editUserRequest) {
  console.log('editUserRequest')
  console.log(editUserRequest)
  return request({
    url: BASE_URL + 'users/' + Number(editUserRequest.id),
    method: 'PUT',
    body: JSON.stringify(editUserRequest)
  })
}

export function changeUserPassword (changePasswordUserRequest) {
  return request({
    url: BASE_URL + 'users/' + Number(changePasswordUserRequest.id),
    method: 'PUT',
    body: JSON.stringify(changePasswordUserRequest)
  })
}

export function getCurrentUserRequest () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: BASE_URL + 'users/me',
    method: 'GET'
  })
}

export function getCurrentCompanyRequest () {
  return request({
    url: BASE_URL + 'company',
    method: 'GET'
  })
}

export function saveCompanyRequest (companyRequest) {
  const url = BASE_URL + 'company'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(companyRequest)
  })
}

export function updateCompanyInfoRequest (companyId, updateCompanyRequest) {
  const url = BASE_URL + 'company/' + companyId

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(updateCompanyRequest)
  })
}

export function checkLoginAvailabilityRequest (login) {
  return request({
    url: BASE_URL + 'auth/user/check-email-availability?email=' + login,
    method: 'GET'
  })
}

export function getAllReviewsRequest () {
  const url = BASE_URL + 'company/reviews'

  return request({
    url: url,
    method: 'GET'
  }, 'anon_action')
}

export function saveReviewRequest (reviewRequest) {
  const url = BASE_URL + 'company/reviews'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(reviewRequest)
  })
}

export function saveShopRequest (shopRequest) {
  const url = BASE_URL + 'company/shops'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(shopRequest)
  })
}

export function updateShopRequest (shopRequest, shopId) {
  const url = BASE_URL + 'company/shops/' + shopId

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(shopRequest)
  })
}

export function getAllShopsRequest (searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)
  // const searchString = searchCriteria.searchString === undefined ? '' : '&searchString=' + searchCriteria.searchString

  const url = BASE_URL + 'company/shops?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}
export function getAllShops () {

  const url = BASE_URL + 'company/shops'

  return request({
    url: url,
    method: 'GET'
  })
}

export function getShopByIdRequest (id) {
  return request({
    url: BASE_URL + 'company/shops/' + id,
    method: 'GET'
  })
}

export function getFlowersByIdRequest (id) {
  return request({
    url: BASE_URL + 'flowers/' + id,
    method: 'GET'
  })
}

export function updateFlowerRequest (flowerId, updateFlowerRequest) {
  const url = BASE_URL + 'flowers/' + flowerId

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(updateFlowerRequest)
  })
}

export function deleteFlowerRequest (flowerId) {
  const url = BASE_URL + 'flowers/' + flowerId

  return request({
    url: url,
    method: 'DELETE'
  })
}

export function getBouquetByIdRequest (id) {
  return request({
    url: BASE_URL + 'bouquets/' + id,
    method: 'GET'
  })
}

export function updateBouquetRequest (id, udpateRequest) {
  const url = BASE_URL + 'bouquets/' + id

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(udpateRequest)
  })
}

export function deleteBouquetRequest (id) {
  const url = BASE_URL + 'bouquets/' + id

  return request({
    url: url,
    method: 'DELETE'
  })
}

export function getProductsRequest (searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)
  // const searchString = searchCriteria.searchString === undefined ? '' : '&searchString=' + searchCriteria.searchString

  const url = BASE_URL + 'flowers?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getBouquetsRequest (searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)
  // const searchString = searchCriteria.searchString === undefined ? '' : '&searchString=' + searchCriteria.searchString

  const url = BASE_URL + 'bouquets?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getProductsByShopIdRequest (searchCriteria, shopId) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'company/shops/' + shopId + '/flowers?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getBouquetsByShopIdRequest (searchCriteria, shopId) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'company/shops/' + shopId + '/bouquets?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getCountriesRequest () {
  return request({
    url: BASE_URL + 'common/countries',
    method: 'GET'
  })
}

export function getFlowerSortsRequest () {
  return request({
    url: BASE_URL + 'common/flower-sorts',
    method: 'GET'
  })
}

export function getFlowerLengthCostsRequest () {
  return request({
    url: BASE_URL + 'common/flower-length-costs',
    method: 'GET'
  })
}

export function getFlowerBouquetTypesRequest () {
  return request({
    url: BASE_URL + 'common/flower-bouquet-types',
    method: 'GET'
  })
}

export function getFlowerTypesRequest () {
  return request({
    url: BASE_URL + 'common/flower-types',
    method: 'GET'
  })
}

export function getFlowerColorsRequest () {
  return request({
    url: BASE_URL + 'common/flower-colors',
    method: 'GET'
  })
}

export function saveFlowerRequest (flowerRequest) {
  const url = BASE_URL + 'flowers'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(flowerRequest)
  })
}

export function saveBouquetRequest (bouquetRequest) {
  const url = BASE_URL + 'bouquets'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(bouquetRequest)
  })
}

export function getBasketRequest () {
  return request({
    url: BASE_URL + 'cart',
    method: 'GET'
  })
}
export function addProductToBasketRequest (productCartRequest) {
  const url = BASE_URL + 'cart'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(productCartRequest)
  })
}

export function updateProductToBasketRequest (productCartRequest) {
  const url = BASE_URL + 'cart'

  return request({
    url: url,
    method: 'PUT',
    body: JSON.stringify(productCartRequest)
  })
}

export function deleteProductToBasketRequest (productCartRequest) {
  const url = BASE_URL + 'cart'

  return request({
    url: url,
    method: 'DELETE',
    body: JSON.stringify(productCartRequest)
  })
}

export function getClientOrders (searchCriteria) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'orders?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function getOrderById (id) {
  const url = BASE_URL + 'orders/' + id

  return request({
    url: url,
    method: 'GET'
  })
}

export function getOrdersByShopIdRequest (searchCriteria, shopId) {
  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page)
  const size = '&size=' + Number(searchCriteria.size)

  const url = BASE_URL + 'users/admin/company/shops/' + shopId + '/orders?' + page + size

  return request({
    url: url,
    method: 'GET'
  })
}

export function createOrder (orderRequest) {
  const url = BASE_URL + 'orders'

  return request({
    url: url,
    method: 'POST',
    body: JSON.stringify(orderRequest)
  })
}
