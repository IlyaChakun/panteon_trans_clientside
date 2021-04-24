import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import ProductsSliceReducer from './reducers/ProductsSliceReducer'
import AuthSliceReducer from './reducers/AuthSliceReducer'
import OrdersSliceReducer from './reducers/OrdersSliceReducer'
import CartsSliceReducer from './reducers/CartsSliceReducer'
import ShopsSliceReducer from './reducers/ShopsSliceReducer'
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
    productsState: ProductsSliceReducer,
    shopsState: ShopsSliceReducer,
    ordersState: OrdersSliceReducer,
    cartState: CartsSliceReducer,
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
