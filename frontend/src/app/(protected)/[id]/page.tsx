"use client"

import {
  useDeleteScheduleMutation,
  useGetScheduleQuery,
} from "@/api/schedulesApiSlice"
import ActionWithConfirm from "@/components/ActionWithConfirm"
import BackButton from "@/components/BackButton"
import Loading from "@/components/UI/Loading"
import showToast from "@/services/toast"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { formatPriceDecimal } from "@/utils/priceFormat"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material"
import dayjs from "dayjs"
import {
  Calendar,
  DollarSign,
  MapPin,
  MoveRight,
  SquarePen,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function Page() {
  const params = useParams()
  const router = useRouter()

  const {
    data: schedule,
    isLoading,
    error,
  } = useGetScheduleQuery(params.id as string)
  const [deleteSchedule] = useDeleteScheduleMutation()

  const handleDelete = async () => {
    try {
      await deleteSchedule(schedule?.id as string).unwrap()
      showToast.success("Schedule deleted successfully")
      router.push("/")
    } catch (error) {
      console.error(error)
      showToast.error("Failed to delete schedule")
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
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600 }}
          >
            Schedule Details
          </Typography>
        </Box>
        <Stack
          direction="row"
          sx={{ gap: 1 }}
        >
          <Button
            variant="contained"
            href={`/${schedule.id}/edit`}
            component={Link}
            startIcon={<SquarePen size={18} />}
          >
            Edit
          </Button>
          <ActionWithConfirm
            confirmModalProps={{
              title: "Delete Schedule",
              message:
                "Are you sure you want to delete this schedule? This action cannot be undone.",
              confirmText: "Delete",
              cancelText: "Cancel",
              confirmButtonColor: "error",
            }}
            onConfirm={handleDelete}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<Trash2 size={18} />}
            >
              Delete
            </Button>
          </ActionWithConfirm>
        </Stack>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <MapPin
                size={24}
                color="#666"
              />
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 600,
                }}
              >
                {schedule.from} <MoveRight size={24} /> {schedule.to}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Calendar
                size={20}
                color="#666"
              />
              <Typography
                variant="body1"
                color="text.secondary"
              >
                {dayjs(schedule.date).format("dddd, MMMM DD, YYYY")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <DollarSign
                size={20}
                color="#666"
              />
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                {formatPriceDecimal(schedule.price)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
