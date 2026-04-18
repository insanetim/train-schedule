import { Box, BoxProps } from "@mui/material"

const Container: React.FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        maxWidth: 1280,
        width: "100%",
        m: "0 auto",
        px: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Container
