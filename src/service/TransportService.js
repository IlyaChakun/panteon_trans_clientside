import axios from 'axios'
const API_URL = 'http://config.panteontrans.be/api/transport-exchange-service/trucks'

const getAllTransport = (searchCriteria) => {

  const transports = {
    data: {
      objects: [
        {
          ownerId: 1,
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressesFrom: [
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            }
          ],
          addressesTo: [
            {
              address: 'Минск (Минск обл.)',
            },
            {
              address: 'Минск (Минск обл.)',
            }
          ],
          transportType: 'тент',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке',
          distance: 1103
        },
        {
          ownerId: 2,
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressesFrom: [
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            }
          ],
          addressesTo: [
            {
              address: 'Минск (Минск обл.)',
            },
            {
              address: 'Минск (Минск обл.)',
            }
          ],
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке',
          distance: 1103
        },
        {
          ownerId: 3,
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressesFrom: [
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            }
          ],
          addressesTo: [
            {
              address: 'Минск (Минск обл.)',
            },
            {
              address: 'Минск (Минск обл.)',
            }
          ],
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке',
          distance: 1103
        },
        {
          ownerId: 4,
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressesFrom: [
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            }
          ],
          addressesTo: [
            {
              address: 'Минск (Минск обл.)',
            },
            {
              address: 'Минск (Минск обл.)',
            }
          ],
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке',
          distance: 1103
        },
        {
          ownerId: 5,
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressesFrom: [
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            },
            {
              address: 'Москва (Московская обл.)',
            }
          ],
          addressesTo: [
            {
              address: 'Минск (Минск обл.)',
            },
            {
              address: 'Минск (Минск обл.)',
            }
          ],
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке',
          distance: 1103
        }
      ]
    },
    totalPages: 1,
    totalElements: 5
  }
  return Promise.resolve(transports)
  // return axios.get(API_URL)
}

const addTransport = (transportData) => {
  // return Promise.resolve(transportData)
  return axios.post(API_URL, transportData)
}
//здесь должен быть patch или put запрос
const updateTransport = (id, patchData) => {
  return axios.patch(`${API_URL}/${id}`, patchData)
  // return Promise.resolve(patchData)
}
//здесь должен быть delete запрос
const deleteTransport = (id) => {
  return Promise.resolve(id)
}

const TransportService = {
  getAllTransport,
  addTransport,
  updateTransport,
  deleteTransport
};

export default TransportService;