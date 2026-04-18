"use client"

import { baseApi } from "@/api/baseApi"
import { AuthProvider } from "@/contexts/AuthContext"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import { PropsWithChildren } from "react"

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApiProvider api={baseApi}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </AuthProvider>
    </ApiProvider>
  )
}

export default Providers
