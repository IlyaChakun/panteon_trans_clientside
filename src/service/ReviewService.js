import axios from 'axios'

const API_URL = 'http://config.panteontrans.be/api/transport-exchange-service/companies'

const getAllReviews = () => {
  return (
    {
      objects: [
        {
          id: 1,
          name: 'Илья',
          phoneNumber: '+375-29-313-60-52',
          email: 'iyal@mail.ru',
          text: 'Реально классно круто. Хороший сайт всегда помогает найти перевозчика!',
          rating: 5,
          dateOfCreation: '24.04.2021'
        },
        {
          id: 2,
          name: 'Алёна',
          phoneNumber: '+375-29-555-55-55',
          email: 'alena@mail.ru',
          text: 'Лучший в мире сайт!',
          rating: 4,
          dateOfCreation: '24.03.2021'
        },
        {
          id: 3,
          name: 'Хамза',
          phoneNumber: '+375-29-255-55-55',
          email: 'xamza@mail.ru',
          text: 'Реально классно круто. Хороший сайт всегда помогает найти перевозчика!',
          rating: 5,
          dateOfCreation: '20.02.2021'
        }
      ],
      totalPages: 1,
      totalElements: 3
    }
  )
}

const addReview = (reviewData) => {
  return Promise.resolve(reviewData)
}

const addCompanyReview = (id, reviewData) => {
  const formData = new FormData()

  Object.keys(reviewData).forEach(function(key) {
    console.log(this[key])
    formData.append(key, this[key])
    console.log('formData: ', this[key])
  }, reviewData)
  // return Promise.resolve(reviewData)
  return axios.post(`${API_URL}/${id}/reviews`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deleteReview = (id) => {

}

export default {
  getAllReviews,
  addReview,
  addCompanyReview,
  deleteReview
}