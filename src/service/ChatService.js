import axios from 'axios'

const MockData = [
  {
    email: 'unicode256@yandex.by',
    password: '111111',
    currentUser: {
      id: 1,
      email: 'unicode256@yandex.by',
      userName: 'unicode256@yandex.by',
      userSecret: '111111',
    },
    accessToken: 'qqqqqqqqqqqqq',
    refreshToken: 'wwwwwwwwwwww',
    expireDate: '30-08-2021'
  },
  {
    email: 'unicode257@yandex.by',
    password: '111111',
    currentUser: {
      id: 2,
      email: 'unicode257@yandex.by',
      userName: 'unicode257@yandex.by',
      userSecret: '1111111'
    },
    accessToken: 'qqqqqqqqqqqq1',
    refreshToken: 'wwwwwwwwwww1',
    expireDate: '30-08-2021'
  },
  {
    email: 'unicode258@yandex.by',
    password: '111111',
    currentUser: {
      id: 3,
      email: 'unicode258@yandex.by',
      userName: 'unicode258@yandex.by',
      userSecret: '11111111'
    },
    accessToken: 'qqqqqqqqqqqq2',
    refreshToken: 'wwwwwwwwwww2',
    expireDate: '30-08-2021'
  },
  {
    email: 'unicode259@yandex.by',
    password: '111111',
    currentUser: {
      id: 4,
      email: 'unicode259@yandex.by',
      userName: 'unicode259@yandex.by',
      userSecret: '111111111'
    },
    accessToken: 'qqqqqqqqqqqq3',
    refreshToken: 'wwwwwwwwwww3',
    expireDate: '30-08-2021'
  }
]

const getUserName = (userId) => {
  let user = MockData.find(item => (item.currentUser.id === userId)).currentUser
  return user ? Promise.resolve(user) : Promise.reject('error login')
}

const createDialog = (parameters) => {
  return axios.post('https://api.chatengine.io/chats/', { title: parameters.title }, { headers: { "Project-ID": '7f101024-0f40-4be8-a1fd-7435d1005b18', "User-Name": parameters.userCreator.userName, "User-Secret": parameters.userCreator.userSecret }})
    .then(dialog => {
      console.log('dialog created', dialog)
      return axios.post(`https://api.chatengine.io/chats/${dialog.data.id}/people/`, { username: parameters.userCompanion.userName }, { headers: { "Project-ID": '7f101024-0f40-4be8-a1fd-7435d1005b18', "User-Name": parameters.userCreator.userName, "User-Secret": parameters.userCreator.userSecret }} )
        .then(person => {
          return axios.post(`https://api.chatengine.io/chats/${dialog.data.id}/messages/`, { text: parameters.message }, { headers: { "Project-ID": '7f101024-0f40-4be8-a1fd-7435d1005b18', "User-Name": parameters.userCreator.userName, "User-Secret": parameters.userCreator.userSecret }})
            .then(() => {
              console.log('message sent')
            })
          console.log('person added')
        })
        .catch((error) => {
          console.log('error person added: ', error)
        })
    })
    .catch((error) => {
      console.log('error dialog created: ', error)
    })
}

export default {
  getUserName,
  createDialog
}
