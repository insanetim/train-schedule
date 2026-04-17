import { User } from "@/types"
import { baseApi } from "./baseApi"

const usersApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
})

export const { useGetMeQuery } = usersApiSlice

export default usersApiSlice
