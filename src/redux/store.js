import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import ProductsSliceReducer from "./reducers/ProductsSliceReducer";
import AuthSliceReducer from "./reducers/AuthSliceReducer";
import CompanySliceReducer from './reducers/CompanySliceReducer'

const middleware = [
    ...getDefaultMiddleware(),
    /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const store = configureStore({
    reducer: {
        productsState: ProductsSliceReducer,
        authState: AuthSliceReducer,
        companyState: CompanySliceReducer,
    },
    middleware
})

export default store