"use client"

import { useCreateScheduleMutation } from "@/api/schedulesApiSlice"
import BackButton from "@/components/BackButton"
import ScheduleForm from "@/components/ScheduleForm"
import showToast from "@/services/toast"
import { CreateSchedule } from "@/types"
import { Box } from "@mui/material"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  const [createSchedule, { isLoading }] = useCreateScheduleMutation()

  const handleSubmit = async (data: CreateSchedule) => {
    try {
      await createSchedule(data).unwrap()
      showToast.success("Schedule created successfully")
      router.push("/")
    } catch (error) {
      console.error("Error submitting response:", error)
      showToast.error("Failed to create schedule")
    }
  }

  return (
    <Box sx={{ py: 4 }}>
      <BackButton />
      <ScheduleForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Box>
  )
}
