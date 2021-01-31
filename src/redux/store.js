import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import ProductsSliceReducer from "./reducers/ProductsSliceReducer";
import AuthSliceReducer from "./reducers/AuthSliceReducer";

const middleware = [
    ...getDefaultMiddleware(),
    /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const store = configureStore({
    reducer: {
        productsState: ProductsSliceReducer,
        authState: AuthSliceReducer,
    },
    middleware
})

export default store