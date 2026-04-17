"use client"

import { LOCAL_STORAGE_KEYS } from "@/constants"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

interface AuthContext {
  token: string | null
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    queueMicrotask(() => {
      if (token) {
        setToken(token)
      }
      setLoading(false)
    })
  }, [])

  const login = useCallback((token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token)
    setToken(token)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    setToken(null)
  }, [])

  useEffect(() => {
    const handler = () => logout()
    window.addEventListener("unauthorized", handler)

    return () => window.removeEventListener("unauthorized", handler)
  }, [logout])

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
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
