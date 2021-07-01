import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthSliceReducer from './reducers/AuthSliceReducer'
import ClientSliceReducer from './reducers/ClientSliceReducer'
import CompanySliceReducer from './reducers/CompanySliceReducer'
import CargoSliceReducer from './reducers/CargoSliceReducer'
import TransportSliceReducer from './reducers/TransportSliceReducer'
import NewsSliceReducer from './reducers/NewsSliceReducer'

const middleware = [
  ...getDefaultMiddleware()
]

const store = configureStore({
  reducer: {
    authState: AuthSliceReducer,
    clientsState: ClientSliceReducer,
    companyState: CompanySliceReducer,
    cargoState: CargoSliceReducer,
    transportState: TransportSliceReducer,
    newsState: NewsSliceReducer
  },
  middleware
})

export default store
