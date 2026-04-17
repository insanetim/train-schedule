"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.replace("/auth")
    }
  }, [token, router])

  if (!token) return null

  return children
}
