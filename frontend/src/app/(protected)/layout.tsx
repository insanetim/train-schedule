"use client"

import BaseLayout from "@/components/BaseLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter()
  const { token, loading } = useAuth()

  useEffect(() => {
    if (!token && !loading) {
      router.replace("/auth")
    }
  }, [token, loading, router])

  if (!token || loading) return null

  return <BaseLayout>{children}</BaseLayout>
}
