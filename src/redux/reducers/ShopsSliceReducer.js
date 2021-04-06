import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllShops } from '../../components/util/utilsAPI'

export const fetchShops = createAsyncThunk(
  'products/fetchShops',
  async () => {
    return await getAllShops()
  })

const shopsSlice = createSlice({
  name: 'shops',
  initialState: {
    shops: [],
    shopsLoading: 'idle',

    page: 1,
    size: 6,
    pagesCount: 0,

    totalElements: 0,
    totalPages: 0,

    errors: ''
  },
  reducers: {
    setShopsLoading: (state, action) => {
      state.loading = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setSize: (state, action) => {
      state.size = action.payload
    }
  },
  extraReducers: {
    [fetchShops.pending]: (state, action) => {
      state.shopsLoading = 'loading'
    },
    [fetchShops.fulfilled]: (state, action) => {
      state.shopsLoading = 'fulfilled'
      // Add any fetched posts to the array
      state.shops = action.payload.objects
      state.totalElements = action.payload.totalElements
      state.totalPages = action.payload.totalPages
    },
    [fetchShops.rejected]: (state, action) => {
      state.shopsLoading = 'rejected'
      state.errors = action.errors
    }

  }
})
export const {
  setLoading,
  setErrors,
  setPage,
  setSize
} = shopsSlice.actions

export default shopsSlice.reducer

export const shopSelector = state => state.shopsState


