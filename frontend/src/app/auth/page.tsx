"use client"

import PasswordInput from "@/components/PasswordInput"
import { Box, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"

interface AuthFormData {
  email: string
  password: string
}

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>()

  const handleLogin = (data: AuthFormData) => {
    console.log("Login clicked", data)
  }

  const handleRegister = (data: AuthFormData) => {
    console.log("Register clicked", data)
  }

  return (
    <Box
      component="form"
      sx={{ width: "100%" }}
      noValidate
    >
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <PasswordInput
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be between 8 and 32 characters",
          },
          maxLength: {
            value: 32,
            message: "Password must be between 8 and 32 characters",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Box
        sx={{
          display: { xs: "flex", sm: "flex" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mt: 3,
          mb: 2,
          width: "100%",
        }}
      >
        <Button
          type="button"
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit(handleLogin)}
          sx={{ flex: 1 }}
        >
          Login
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          size="large"
          onClick={handleSubmit(handleRegister)}
          sx={{ flex: 1 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}
