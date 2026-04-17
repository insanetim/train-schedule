import AuthLayout from "@/components/AuthLayout"
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>
}
