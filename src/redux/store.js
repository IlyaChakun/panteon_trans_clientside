import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import ProductsSliceReducer from "./reducers/ProductsSliceReducer";
import AuthSliceReducer from "./reducers/AuthSliceReducer";
import CompanySliceReducer from './reducers/CompanySliceReducer'
import OrdersSliceReducer from './reducers/OrdersSliceReducer'
import CartsSliceReducer from './reducers/CartsSliceReducer'
import FloristSliceReducer from './reducers/FloristSliceReducer'

const middleware = [
    ...getDefaultMiddleware(),
    /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const store = configureStore({
    reducer: {
        productsState: ProductsSliceReducer,
        ordersState: OrdersSliceReducer,
        cartState: CartsSliceReducer,
        authState: AuthSliceReducer,
        companyState: CompanySliceReducer,
        floristsState: FloristSliceReducer
    },
    middleware
})

export default store