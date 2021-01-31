import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {
    getCurrentCompanyRequest,
    getCurrentUserRequest,
    getProductsByShopIdRequest,
    getProductsRequest
} from "../../components/util/utilsAPI";
import {notification} from "antd";

const initialState = {
    isLoading: false,
    errors: '',
    currentUser: null,
    currentCompany: null,
    isAuthenticated: false,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading: (state, payload) => {
            state.isLoading = payload
        },
        setErrors: (state, payload) => {
            state.errors = payload
        },
        setCurrentUser: (state, payload) => {
            state.currentUser = payload
        },
        setCurrentCompany: (state, payload) => {
            state.currentCompany = payload
        },
        setIsAuthenticated: (state, payload) => {
            state.isAuthenticated = payload
        }
    },
})
export const {
    setIsLoading,
    setErrors,
    setCurrentUser,
    setCurrentCompany,
    setIsAuthenticated
} = authSlice.actions

export default authSlice.reducer

export const authSelector = (state) => {
    return state.authState;
}


export const getCurrentUser = () => {
    return async dispatch => {
        dispatch(setIsLoading(true))
        try {
            let promise = getCurrentUserRequest()

            if (!promise) {
                return;
            }
            promise
                .then(response => {
                    console.log(response)
                    dispatch(setCurrentUser(response))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setIsLoading(false))
                })
        } catch (error) {
            dispatch(setErrors(error))
            dispatch(setIsLoading(false))
        }
    }
}


// First, create the thunk
const fetchUser = createAsyncThunk(
    'users/fetchBy',
    async ( thunkAPI) => {
        const response = await getCurrentUser()
        return response
    }
)

export const getCurrentCompany = () => {
    return async dispatch => {

        try {
            let promise = getCurrentCompanyRequest()

            if (!promise) {
                return;
            }
            promise
                .then(response => {
                    console.log(response)
                    dispatch(setCurrentCompany(response))
                    dispatch(setIsLoading(false))
                })
        } catch (error) {
            dispatch(setErrors(error))
            dispatch(setIsLoading(false))
        }
    }
}
