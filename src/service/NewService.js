import axios from 'axios'
const API_URL = 'http://localhost:5000/api/news-service/news'

const getArticles = (searchPrams) => {
  return axios.get(API_URL)
}

const addArticle = (file, articleData) => {
  const formData = new FormData()
  formData.append('files', file)

  Object.keys(articleData).forEach(function(key) {
    console.log(this[key])
    formData.append(key, this[key])
    console.log('formData: ', this[key])
  }, articleData)

  console.log('formData: ', formData)

  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  getArticles,
  addArticle
}