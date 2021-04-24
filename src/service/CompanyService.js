export function getAllCompanies(searchCriteria) {
  // const page = 'page=' + Number((searchCriteria === undefined || searchCriteria.page === undefined) ? 1 : searchCriteria.page)
  // const size = '&size=' + Number((searchCriteria === undefined || searchCriteria.size === undefined) ? 10 : searchCriteria.size)
  //
  // const url = BASE_URL + 'florists?' + page + size
  //
  // return request({
  //   url: url,
  //   method: 'GET'
  // })


  const data =
    {
      objects: [
        {
          id: 1,
          imageUrl: 'https://www.transinfo.by/files/gallerypro/53454/%D0%BB%D0%BE%D0%B3%D0%BE%202.jpg',
          title: 'ООО "КрафтТрансЭкспресс"',
          description: 'Команда профессионалов компании ООО «КрафтТрансЭкспресс» имеет большой опыт работы в организации перевозок продуктов питания. Опыт решения сложных и интересных задач, высокая квалификация менеджеров, собственный парк автомобилей, состоящий из 120 единиц современной автотехники, грузоподъёмностью от 8 до 22 тонн позволяют нам максимально качественно в указанный срок доставить груз.',
          siteUrl: 'https://kt-express.transinfo.by//contacts',
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
          imageUrl: 'https://www.transinfo.by/templates/transinfo/img/visual_images/visual_img_6.jpg',
          title: 'ИП "Гвардиан Ж.В."',
          description: 'Грузоперевозки по направлениям РБ-РФ, РФ-РБ. Основное направление Москва и МО.' +
            'Сборные , попутные, комплектные грузы. Из Москвы активно возим сборные грузы.\n' +
            'В автопарке свои машины 20 т 130 м3.' +
            'ПО г. Минску, РБ работает автомобиль 11т 60м3.' +
            'Имеем СМР-страхование.' +
            'Опыт экспедирования и грузоперевозок с 2000г..',
          siteUrl: 'https://kt-express.transinfo.by//contacts',
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


  return data
}
