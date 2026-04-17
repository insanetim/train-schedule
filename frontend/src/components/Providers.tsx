"use client"

import { baseApi } from "@/api/baseApi"
import { AuthProvider } from "@/contexts/AuthContext"
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import { PropsWithChildren } from "react"

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApiProvider api={baseApi}>
      <AuthProvider>{children}</AuthProvider>
    </ApiProvider>
  )
}

export default Providers
