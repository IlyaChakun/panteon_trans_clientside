export function getAllTransport(searchCriteria) {
  // const page = 'page=' + Number((searchCriteria === undefined || searchCriteria.page === undefined) ? 1 : searchCriteria.page)
  // const size = '&size=' + Number((searchCriteria === undefined || searchCriteria.size === undefined) ? 10 : searchCriteria.size)
  //
  // const url = BASE_URL + 'florists?' + page + size
  //
  // return request({
  //   url: url,
  //   method: 'GET'
  // })

  return (
    {
      objects: [
        {
          id: 1,
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
  )
}
