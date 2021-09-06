import axios from 'axios'

const API_URL = 'http://config.panteontrans.be/api/transport-exchange-service/cargo'

const getAllCargos = (searchCriteria) => {

  const cargos = {
    data: {
      objects: [
        {
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressFrom: 'Москва (Московская обл.)',
          addressTo: 'Минск (Минск обл.)',
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке'
        },
        {
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressFrom: 'Москва (Московская обл.)',
          addressTo: 'Минск (Минск обл.)',
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке'
        },
        {
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressFrom: 'Москва (Московская обл.)',
          addressTo: 'Минск (Минск обл.)',
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке'
        },
        {
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressFrom: 'Москва (Московская обл.)',
          addressTo: 'Минск (Минск обл.)',
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке'
        },
        {
          countryIndexFrom: 'RU',
          countryIndexTo: 'BY',
          addressFrom: 'Москва (Московская обл.)',
          addressTo: 'Минск (Минск обл.)',
          transportType: 'рефрижератор',
          date: '19.10.2020',
          time: '11:11',
          description: 'тнп, 21 т, 83 м3, верхняя загрузка, верхняя выгрузка',
          cost: 1200,
          payment: 'наличные, на выгрузке'
        }
      ]
    },
    totalPages: 1,
    totalElements: 14
  }
  return Promise.resolve(cargos)
}

const getCargo = (id) => {

}

const addCargo = (cargoData) => {
  return axios.post(API_URL, cargoData)
}

//реализация не представляется возможной из-за 1) не рабочий get 2) нельзя запросить карго по юзер айди

//здесь должен быть patch или put запрос
const updateCargo = (id, patchData) => {
  // return axios.patch(`${API_URL}/${id}`, patchData)
  return Promise.resolve(patchData)
}

//здесь должен быть delete запрос
const deleteCargo = (id) => {
  return Promise.resolve(id)
}

const CargoService = {
  getAllCargos,
  addCargo,
  updateCargo,
  deleteCargo
};

export default CargoService