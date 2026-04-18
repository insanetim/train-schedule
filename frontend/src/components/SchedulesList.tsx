import { Schedule } from "@/types"
import { Box, Grid, Pagination } from "@mui/material"
import ScheduleItem from "./ScheduleItem"

interface SchedulesListProps {
  schedules: Schedule[]
  page: number
  totalPages: number
}

const SchedulesList: React.FC<SchedulesListProps> = ({
  schedules,
  page,
  totalPages,
}) => {
  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {schedules.map(schedule => (
          <Grid size={{ xs: 12, md: 6 }} key={schedule.id}>
            <ScheduleItem
              schedule={schedule}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={page}
            count={totalPages}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  )
}

export default SchedulesList
