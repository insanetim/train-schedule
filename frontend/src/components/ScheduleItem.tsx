import { Schedule } from "@/types"
import { formatPriceDecimal } from "@/utils/priceFormat"
import {
  Box,
  Card,
  CardContent,
  IconButton,
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
import ActionWithConfirm from "./ActionWithConfirm"

interface ScheduleItemProps {
  schedule: Schedule
  onDelete?: (id: string) => void
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, onDelete }) => {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MapPin
              size={20}
              color="#666"
            />
            <Link href={`/${schedule.id}`}>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 600,
                }}
              >
                {schedule.from} <MoveRight size={20} /> {schedule.to}
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar
              size={18}
              color="#666"
            />
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {dayjs(schedule.date).format("ddd, MMM DD, YYYY")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DollarSign
                size={18}
                color="#666"
              />
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                {formatPriceDecimal(schedule.price)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                LinkComponent={Link}
                href={`/${schedule.id}/edit`}
                title="Edit"
                aria-label="Edit"
              >
                <SquarePen size={18} />
              </IconButton>

              <ActionWithConfirm
                confirmModalProps={{
                  title: "Delete Schedule",
                  message:
                    "Are you sure you want to delete this schedule? This action cannot be undone.",
                  confirmText: "Delete",
                  cancelText: "Cancel",
                  confirmButtonColor: "error",
                }}
                onConfirm={() => onDelete?.(schedule.id)}
              >
                <IconButton
                  color="error"
                  title="Delete"
                  aria-label="Delete"
                >
                  <Trash2 size={18} />
                </IconButton>
              </ActionWithConfirm>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ScheduleItem
