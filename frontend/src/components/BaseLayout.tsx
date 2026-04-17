import { Container, Stack } from "@mui/material"
import { PropsWithChildren } from "react"
import Header from "./Header"

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      direction="column"
      sx={{ minHeight: "100vh" }}
    >
      <Header />
      <Container
        component="main"
        sx={{ flexGrow: 1, py: 3 }}
      >
        {children}
      </Container>
    </Stack>
  )
}

export default BaseLayout
