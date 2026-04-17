import { Box, Container, Paper, Typography } from "@mui/material"
import { PropsWithChildren } from "react"

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Welcome to Train Schedule App
          </Typography>
        </Box>

        {children}
      </Paper>
    </Container>
  )
}

export default AuthLayout
