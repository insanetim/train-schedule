"use client"

import {
  useDeleteScheduleMutation,
  useGetSchedulesQuery,
} from "@/api/schedulesApiSlice"
import SchedulesList from "@/components/SchedulesList"
import SearchBar from "@/components/SearchBar"
import Loading from "@/components/UI/Loading"
import { useSchedulesQuery } from "@/hooks/useSchedulesQuery"
import showToast from "@/services/toast"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { Alert, Box, Button, Typography } from "@mui/material"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function Page() {
  const {
    from,
    to,
    date,
    sort,
    hasQuery,
    debouncedQuery,
    handlePageChange,
    handleFromChange,
    handleToChange,
    handleDateChange,
    handleSortChange,
    handleClear,
  } = useSchedulesQuery()

  const {
    data: schedules,
    isLoading,
    error,
  } = useGetSchedulesQuery(debouncedQuery)
  const [deleteSchedule] = useDeleteScheduleMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleteSchedule(id).unwrap()
      showToast.success("Schedule deleted successfully")

      // Check if we need to navigate to previous page
      if (schedules?.data.length === 1 && schedules.meta.page > 1) {
        handlePageChange(schedules.meta.page - 1)
      }
    } catch (error) {
      console.error(error)
      showToast.error("Failed to delete snippet")
    }
  }

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
        {hasQuery
          ? "No results found, try to change filters"
          : "No schedules found, create a new one!"}
      </Typography>
    )
  } else if (schedules?.data && schedules.data.length > 0) {
    content = (
      <SchedulesList
        schedules={schedules.data}
        page={schedules.meta.page}
        totalPages={schedules.meta.totalPages}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
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
      <SearchBar
        from={from}
        to={to}
        date={date}
        sort={sort}
        hasQuery={hasQuery}
        handleFromChange={handleFromChange}
        handleToChange={handleToChange}
        handleDateChange={handleDateChange}
        handleSortChange={handleSortChange}
        handleClear={handleClear}
      />
      {content}
    </Box>
  )
}
