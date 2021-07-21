const cargosData = {
      objects: [
        {
          id: 1,
          owner: 1,
          countryIndexFrom: 'BY',
          countryIndexTo: 'BY',

          from: 'Осиповичи, Могилевская область',
          to: 'Минск, Минская область',

          distance: '108 км',
          dimensions: '20 т, 82 м3',

          cargoType: 'Напитки',

          truckBodyTypes: [
            {
              truckBodyTypeName: 'Тент'
            }
          ],

          cargoStowageMethods: [
            {
              stowageMethodName: 'задняя'
            },
            {
              stowageMethodName: 'Боковая'
            }
          ],

          dateOfCreation: '24.04.2021 14:06',

          payment: '1 450 Бел. руб. Б/нал. без НДС (1.34BYR/км.)',

          contacts: {
            phoneNumber: '+375-29-877-77-75',
            name: 'Николай'
          },

          priority: {
            title: 'Срочно',
            color: 'red'
          }
        },
        {
          id: 2,
          owner: 2,
          countryIndexFrom: 'BY',
          countryIndexTo: 'RU',

          from: 'Минск, Минская область',
          to: 'Серпухов, Московская область',

          distance: '739 км.',

          dimensions: '1.5т. 10м3',
          cargoType: 'тнп',

          truckBodyTypes: [
            {
              truckBodyTypeName: 'Тент'
            }
          ],

          cargoStowageMethods: [
            {
              stowageMethodName: 'задняя'
            }
          ],

          dateOfCreation: '24.04.2021 16:49',

          payment: '1 350 Бел. руб. Б/нал. без НДС (1.36BYR/км.)',

          contacts: {
            phoneNumber: '+375-29-525-65-75',
            name: 'Василий'
          },

          priority: {
            title: 'Постоянно',
            color: 'green'
          }
        },
        {
          id: 3,
          owner: 1,
          countryIndexFrom: 'AZ',
          countryIndexTo: 'RU',

          from: 'Баку',
          to: 'Москва, Московская область',

          distance: '2188 км.',

          dimensions: '20т.• 80м3',
          cargoType: 'тнп',

          truckBodyTypes: [
            {
              truckBodyTypeName: 'Тент'
            }
          ],

          cargoStowageMethods: [
            {
              stowageMethodName: 'задняя'
            }
          ],

          dateOfCreation: '24.04.2021  17:08',

          payment: '5 250 Бел. руб. Б/нал. без НДС (2.39BYR/км.)',

          contacts: {
            phoneNumber: '+375-29-888-88-88',
            name: 'Ахмед'
          }
        }
      ],
      totalPages: 1,
      totalElements: 3
   }

const transportData = {
  objects: [
    {
      id: 1,
      owner: 1,
      countryIndexFrom: 'BY',
      countryIndexTo: 'BY',

      from: 'Челябинск, Челябинская область',
      to: 'Челябинская область\n' +
        'Свердловская область\n' +
        'Курганская область\n' +
        'Тюменская область',


      dimensions: '2т. 20м3 5.20 м • высота: 1.90 м • ширина: 2.10 м • 1 а/м',

      cargoType: 'Напитки',

      truckBodyTypes: [
        {
          truckBodyTypeName: 'Рефрижератор'
        }
      ],

      cargoStowageMethods: [
        {
          stowageMethodName: 'задняя'
        },
        {
          stowageMethodName: 'Боковая'
        }
      ],

      dateOfCreation: '24.04.2021 17:10',

      payment: '20 рос. руб./ км Удобная',

      contacts: {
        phoneNumber: '+375-29-877-77-75',
        name: 'Николай'
      }
    },
    {
      id: 2,
      owner: 1,
      countryIndexFrom: 'ES',
      countryIndexTo: 'RU',

      from: 'Таррагона Сарагоса ,08 Барселона',
      to: 'Москва, Московская область\n' +
        'Екатеринбург, Свердловская область\n' +
        'Ростов-на-Дону, Ростовская область\n' +
        'Санкт-Петербург, Ленинградская область\n',

      dimensions: '23т. 92м3',

      cargoType: 'Напитки',

      truckBodyTypes: [
        {
          truckBodyTypeName: 'Тент'
        },
        {
          truckBodyTypeName: 'Тягач с полуприцепом'
        }
      ],

      cargoStowageMethods: [
        {
          stowageMethodName: 'задняя'
        },
        {
          stowageMethodName: 'Боковая'
        }
      ],

      dateOfCreation: '24.04.2021 17:06',

      payment: 'Договорная',

      contacts: {
        phoneNumber: '+375-29-425-65-89',
        name: 'Алёна'
      }
    }
  ],
  totalPages: 1,
  totalElements: 2
}

const getProfileCargos = (userId) => {
  const cargos = cargosData.objects.filter(item => item.owner == userId)
  return cargos ? Promise.resolve(cargos) : Promise.reject('error getting profile cargos')
}

const getProfileTransport = (userId) => {
  const cargos = transportData.objects.filter(item => item.owner == userId)
  return cargos ? Promise.resolve(cargos) : Promise.reject('error getting profile cargos')
}

export default {
  getProfileCargos,
  getProfileTransport
}