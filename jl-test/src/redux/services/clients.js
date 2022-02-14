// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// const user = JSON.parse(localStorage.getItem("user"))
// const token = user ? user.data.token : null
// console.log(token)
// Define a service using a base URL and expected endpoints
export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
  }),
  endpoints: (builder) => ({
    getClients: builder.query({
      query: (str) => `/${str}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetClientsQuery } = clientApi
