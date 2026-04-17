import { LOCAL_STORAGE_KEYS } from "@/constants"
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: headers => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
        : null

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    window.dispatchEvent(new Event("unauthorized"))
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
})
