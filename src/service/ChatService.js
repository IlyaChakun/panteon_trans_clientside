import axios from 'axios'
const CHAT_API_URL = 'https://api.chatengine.io'
const CHAR_PROJECT_ID = '7f101024-0f40-4be8-a1fd-7435d1005b18'

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
  console.log({ usernames: [parameters.userCreator.userName, parameters.userCompanion.userName], title: parameters.title })
  return axios.put(`${CHAT_API_URL}/chats/`, { usernames: [parameters.userCreator.userName, parameters.userCompanion.userName], title: parameters.title }, { headers: { "Project-ID": CHAR_PROJECT_ID, "User-Name": parameters.userCreator.userName, "User-Secret": parameters.userCreator.userSecret }})
    .then(dialog => {
      return axios.post(`${CHAT_API_URL}/chats/${dialog.data.id}/messages/`, { text: parameters.message }, { headers: { "Project-ID": CHAR_PROJECT_ID, "User-Name": parameters.userCreator.userName, "User-Secret": parameters.userCreator.userSecret }})
    })
}

export default {
  getUserName,
  createDialog
}
