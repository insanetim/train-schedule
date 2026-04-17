import { AuthResponse, Credentials } from "@/types"
import { baseApi } from "./baseApi"

const authApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, Credentials>({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, Credentials>({
      query: credentials => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice

export default authApiSlice
