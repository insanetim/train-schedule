"use client"

import { useGetMeQuery } from "@/api/usersApiSlice"
import { useAuth } from "@/contexts/AuthContext"
import { Box, IconButton, Typography } from "@mui/material"
import { LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Container from "./UI/Container"

export default function Header() {
  const router = useRouter()
  const { logout } = useAuth()

  const { data } = useGetMeQuery()

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          py: 2,
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-gray-700"
        >
          <Image
            src="/train.png"
            alt="Train Schedule App"
            width={40}
            height={40}
          />
          <Box
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
            }}
          >
            Train Schedule App
          </Box>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: "#666" }}
          >
            {data?.email}
          </Typography>
          <IconButton
            title="Logout"
            aria-label="logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}
