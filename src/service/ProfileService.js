const cargosData = {
      objects: [
        {
          id: 1,
          owner: 8,
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
          owner: 8,
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
      owner: 8,
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
      owner: 8,
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

const companies = {
  objects: [
    {
      id: 1,
      unp: 1321341241,
      imageUrl: 'https://www.transinfo.by/files/gallerypro/53454/%D0%BB%D0%BE%D0%B3%D0%BE%202.jpg',
      title: 'ООО "КрафтТрансЭкспресс"',
      description: 'Команда профессионалов компании ООО «КрафтТрансЭкспресс» имеет большой опыт работы в организации перевозок продуктов питания. Опыт решения сложных и интересных задач, высокая квалификация менеджеров, собственный парк автомобилей, состоящий из 120 единиц современной автотехники, грузоподъёмностью от 8 до 22 тонн позволяют нам максимально качественно в указанный срок доставить груз.',
      siteUrl: 'https://kt-express.transinfo.by',
      email: 'express.transinfo@mail.ru',
      phoneNumber: '+375(44)7702728',
      dateOfCreation: '24.04.2010',
      dateOfRegistration: '24.04.2015',
      rating: {
        rating_value: 5,
        reviews: [
          {
            name: 'Василий',
            text: 'Обязанности исполняют хорошо'
          }
        ]
      },
      owner: {
        id: 1
      },
      truckPark: [
        {
          id: 1,
          cargoStowageMethod: 'задняя',
          truckBodyType: 'изотерма',
          dimensions: '8т, 30.5м3, 2.46м*2.48м*6.2м'
        },
        {
          id: 2,
          cargoStowageMethod: 'задняя',
          truckBodyType: 'Тент',
          dimensions: '24т, 82м3, 2.46м*2.48м*13.46м'
        }
      ]

    },
    {
      id: 2,
      unp: 1377777777,
      imageUrl: 'https://www.transinfo.by/templates/transinfo/img/visual_images/visual_img_6.jpg',
      title: 'ИП "Гвардиан Ж.В."',
      description: 'Грузоперевозки по направлениям РБ-РФ, РФ-РБ. Основное направление Москва и МО.' +
        'Сборные , попутные, комплектные грузы. Из Москвы активно возим сборные грузы.\n' +
        'В автопарке свои машины 20 т 130 м3.' +
        'ПО г. Минску, РБ работает автомобиль 11т 60м3.' +
        'Имеем СМР-страхование.' +
        'Опыт экспедирования и грузоперевозок с 2000г..',
      siteUrl: 'https://kt-express.transinfo.by',
      email: 'gvardian.@mail.ru',
      phoneNumber: '++375(29)6134717',
      dateOfCreation: '20.01.2005',
      dateOfRegistration: '10.08.2010',
      rating: {
        rating_value: 4.5,
        reviews: [
          {
            name: 'Василий',
            text: 'Обязанности исполняют хорошо'
          }
        ]
      },
      owner: {
        id: 2
      },
      truckPark: [
        {
          id: 1,
          cargoStowageMethod: 'задняя',
          truckBodyType: 'Тент',
          dimensions: '10т, 60м3, 2.5м*3м*8.08м + 10т, 60м3, 2.5м*2.9м*8.06м'
        },
        {
          id: 2,
          cargoStowageMethod: 'задняя',
          truckBodyType: 'Тент',
          dimensions: '10т, 60м3, 2.5м*2.9м*7.6м + 12т, 70м3, 2.5м*3.15м*9м'
        }
      ]

    }
  ],
  totalPages: 1,
  totalElements: 2
}

//не предусмотрено фунционалом rest api (все три фукнции)
const getProfileCargos = (userId) => {
  const cargos = cargosData.objects.filter(item => item.owner == userId)
  return cargos ? Promise.resolve(cargos) : Promise.reject('error getting profile cargos')
}

const getProfileTransport = (userId) => {
  const cargos = transportData.objects.filter(item => item.owner == userId)
  return cargos ? Promise.resolve(cargos) : Promise.reject('error getting profile transport')
}

const getCompanyProfile = (userId) => {
  const company = companies.objects.find(item => item.owner.id == userId)
  return company ? Promise.resolve(company) : Promise.reject('error getting profile company')
}

export default {
  getProfileCargos,
  getProfileTransport,
  getCompanyProfile
}
