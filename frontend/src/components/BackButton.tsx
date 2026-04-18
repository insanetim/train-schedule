"use client"

import { Box, Button } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
  title?: string
  href?: string
}

const BackButton: React.FC<BackButtonProps> = ({
  title = "Back to Homepage",
  href = "/",
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        LinkComponent={Link}
        href={href}
        startIcon={<ArrowLeft size={18} />}
        variant="text"
        color="inherit"
      >
        {title}
      </Button>
    </Box>
  )
}

export default BackButton
