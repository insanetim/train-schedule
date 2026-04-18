"use client"

import { useLoginMutation, useRegisterMutation } from "@/api/authApiSlice"
import PasswordInput from "@/components/UI/PasswordInput"
import { useAuth } from "@/contexts/AuthContext"
import showToast from "@/services/toast"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { Box, Button, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface AuthFormData {
  email: string
  password: string
}

export default function Page() {
  const router = useRouter()
  const { login } = useAuth()

  const [loginTrigger, { isLoading: isLoginLoading }] = useLoginMutation()
  const [registerTrigger, { isLoading: isRegisterLoading }] =
    useRegisterMutation()

  const isLoading = isLoginLoading || isRegisterLoading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>()

  const handleLogin = async (data: AuthFormData) => {
    try {
      const { access_token } = await loginTrigger(data).unwrap()
      login(access_token)
      router.push("/")
    } catch (error) {
      showToast.error(getErrorMessage(error))
    }
  }

  const handleRegister = async (data: AuthFormData) => {
    try {
      const { access_token } = await registerTrigger(data).unwrap()
      login(access_token)
      router.push("/")
    } catch (error) {
      showToast.error(getErrorMessage(error))
    }
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
        disabled={isLoading}
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
        disabled={isLoading}
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
          loading={isLoading}
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
          loading={isLoading}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}
