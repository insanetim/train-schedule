"use client"

import { useGetSchedulesQuery } from "@/api/schedulesApiSlice"
import SchedulesList from "@/components/SchedulesList"
import Loading from "@/components/UI/Loading"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { Alert, Box, Button, Typography } from "@mui/material"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function Page() {
  const { data: schedules, isLoading, error } = useGetSchedulesQuery({})

  let content

  if (isLoading) {
    content = <Loading />
  } else if (error) {
    content = <Alert severity="error">{getErrorMessage(error)}</Alert>
  } else if (schedules?.data.length === 0) {
    content = (
      <Typography
        align="center"
        color="textSecondary"
      >
        No schedules found, create a new one!
      </Typography>
    )
  } else if (schedules?.data && schedules.data.length > 0) {
    content = (
      <SchedulesList
        schedules={schedules.data}
        page={schedules.meta.page}
        totalPages={schedules.meta.totalPages}
      />
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600 }}
        >
          Schedules
        </Typography>
        <Button
          LinkComponent={Link}
          href="/new"
          variant="contained"
          startIcon={<Plus />}
          size="large"
        >
          Add New
        </Button>
      </Box>
      {content}
    </Box>
  )
}
