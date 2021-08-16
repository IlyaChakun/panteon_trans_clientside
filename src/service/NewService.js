import axios from 'axios'
const API_URL = 'http://config.panteontrans.be/api/news-service/news'

const getArticles = (searchParams) => {
  let urlWithParams = ''

  if(searchParams){
    const { page, size } = searchParams
    if (page) {
      urlWithParams = `page=${page - 1}`
    }
    if (size) {
      urlWithParams = `size=${size}`
    }
    if (page && size) {
      urlWithParams = `page=${page - 1}&size=${size}`
    }
  }
  console.log('urll: ', urlWithParams)
  return axios.get(`${API_URL}?${urlWithParams}`)
}

const getArticle = (id) => {
  return axios.get(`${API_URL}/${id}`)
}

const addArticle = (file, articleData) => {
  const formData = new FormData()
  formData.append('files', file)

  Object.keys(articleData).forEach(function(key) {
    console.log(this[key])
    formData.append(key, this[key])
    console.log('formData: ', this[key])
  }, articleData)

  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const editArticle = (id, editData) => {
  const formData = new FormData()

  Object.keys(editData).forEach(function(key) {
    if (key === 'image') {
      formData.append('files', this[key])
    }
    else {
      formData.append(key, this[key])
    }
  }, editData)

  return axios.patch(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deleteArticle = (id) => {
  return axios.delete(`${API_URL}/${id}`)
}

export default {
  getArticles,
  getArticle,
  addArticle,
  editArticle,
  deleteArticle
}