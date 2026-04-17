"use client"

import { LOCAL_STORAGE_KEYS } from "@/constants"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"

interface AuthContext {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
  })

  const login = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    setToken(null)
  }

  useEffect(() => {
    const handler = () => logout()
    window.addEventListener("unauthorized", handler)

    return () => window.removeEventListener("unauthorized", handler)
  }, [])

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error("useAuth must be used within a AuthContextProvider")
  return context
}
