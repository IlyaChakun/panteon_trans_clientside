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
      userSecret: '11111111'
    },
    accessToken: 'qqqqqqqqqqqq3',
    refreshToken: 'wwwwwwwwwww3',
    expireDate: '30-08-2021'
  }
]

// const register = (name, phone, email, password) => {
//   console.log('reg data: ', [name, phone, email, password]);
//   return axios.post(API_URL + "signup", {
//     name,
//     phone,
//     email,
//     password,
//   }).then((response) => {
//     console.log('reg res: ', response);
//     return response.data;
//   });
// };

const login = (email, password) => {
  let user = MockData.find(item => (item.email === email && item.password === password))
  return user ? Promise.resolve(user) : Promise.reject('error login')
}

const getCurrentUser = (accessToken) => {
  let user = MockData.find(item => item.accessToken === accessToken)
  return user ? Promise.resolve(user) : Promise.reject('error getting data')
}

export default {
  // register,
  login,
  getCurrentUser
}