import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../services/client.service"

export const getClients = createAsyncThunk("clientApi/getClients", async () => {
  try {
    const response = await authService.getClients()
    return response.data
  } catch (error) {
    console.log(error)
  }
})
export const createClient = createAsyncThunk(
  "clientApi/createClient",
  async (client) => {
    try {
      const response = await authService.createClient(client)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)
export const deleteClient = createAsyncThunk(
  "clientApi/deleteClient",
  async (id) => {
    try {
      const response = await authService.deleteClient(id)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

const clientSlice = createSlice({
  name: "clientApi",
  initialState: {
    clients: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getClients.pending]: (state, action) => {
      state.isLoading = true
    },
    [getClients.fulfilled]: (state, action) => {
      state.isLoading = false
      state.clients = action.payload
    },
    [getClients.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    },
    [createClient.pending]: (state, action) => {
      state.isLoading = true
    },
    [createClient.fulfilled]: (state, action) => {
      state.isLoading = false
      state.clients.push(action.payload)
    },
    [createClient.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    },
    [deleteClient.pending]: (state, action) => {
      state.isLoading = true
    },
    [deleteClient.fulfilled]: (state, action) => {
      state.isLoading = false
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      )
    },
    [deleteClient.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    },
  },
})

const { reducer } = clientSlice
export default reducer
