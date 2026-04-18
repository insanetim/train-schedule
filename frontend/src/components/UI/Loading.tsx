import { Box, CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        p: 4,
      }}
    >
      <CircularProgress
        color="inherit"
        aria-label="Loading…"
      />
    </Box>
  )
}

export default Loading
