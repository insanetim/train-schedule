"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { token, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token && !loading) {
      router.replace("/auth")
    }
  }, [token, loading, router])

  if (!token || loading) return null

  return children
}
