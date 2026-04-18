"use client"

import {
  useGetScheduleQuery,
  useUpdateScheduleMutation,
} from "@/api/schedulesApiSlice"
import BackButton from "@/components/BackButton"
import ScheduleForm from "@/components/ScheduleForm"
import Loading from "@/components/UI/Loading"
import showToast from "@/services/toast"
import { UpdateSchedule } from "@/types"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { Alert, Box, Typography } from "@mui/material"
import { useParams, useRouter } from "next/navigation"

export default function Page() {
  const params = useParams()
  const router = useRouter()

  const {
    data: schedule,
    isLoading,
    error,
  } = useGetScheduleQuery(params.id as string)
  const [updateSnippet, { isLoading: isUpdating }] = useUpdateScheduleMutation()

  const handleSubmit = async (data: UpdateSchedule) => {
    try {
      await updateSnippet({ ...data, id: schedule?.id as string }).unwrap()
      showToast.success("Schedule updated successfully")
      router.push("/")
    } catch (error) {
      console.error("Error submitting response:", error)
      showToast.error("Failed to update snippet")
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Alert severity="error">{getErrorMessage(error)}</Alert>
  }

  if (!schedule) {
    return (
      <Typography
        align="center"
        color="textSecondary"
        sx={{ py: 4 }}
      >
        Schedule not found
      </Typography>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <BackButton />
      <ScheduleForm
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        isEditing
        defaultValues={schedule}
      />
    </Box>
  )
}
