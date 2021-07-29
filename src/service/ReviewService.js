export function getAllReviews() {
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

}

const deleteReview = (id) => {

}