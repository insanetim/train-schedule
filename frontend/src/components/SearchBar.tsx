import { CITIES_LIST } from "@/constants"
import { SortType } from "@/types"
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import { ArrowRightLeft, X } from "lucide-react"

interface SearchBarProps {
  from: string
  to: string
  date: Dayjs | null
  sort: SortType | string
  hasQuery: boolean
  handleFromChange: (newFrom: string) => void
  handleToChange: (newTo: string) => void
  handleDateChange: (newDate: Dayjs | null) => void
  handleSortChange: (newSort: SortType) => void
  handleClear: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  from,
  to,
  date,
  sort,
  hasQuery,
  handleFromChange,
  handleToChange,
  handleDateChange,
  handleSortChange,
  handleClear,
}) => {
  const handleSwapCities = () => {
    handleFromChange(to)
    handleToChange(from)
  }

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Stack sx={{ gap: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ gap: 2 }}
        >
          <Autocomplete
            freeSolo
            options={CITIES_LIST}
            value={from}
            onChange={(_, newValue) => handleFromChange(newValue || "")}
            renderInput={params => (
              <TextField
                {...params}
                label="From"
                placeholder="Departure city"
                variant="outlined"
                size="small"
                fullWidth
              />
            )}
            sx={{ flex: 1 }}
          />

          <Button
            onClick={handleSwapCities}
            variant="outlined"
            sx={{
              alignSelf: { xs: "stretch", md: "center" },
              minWidth: "auto",
              p: 1,
            }}
          >
            <ArrowRightLeft size={18} />
          </Button>

          <Autocomplete
            freeSolo
            options={CITIES_LIST}
            value={to}
            onChange={(_, newValue) => handleToChange(newValue || "")}
            renderInput={params => (
              <TextField
                {...params}
                label="To"
                placeholder="Arrival city"
                variant="outlined"
                size="small"
                fullWidth
              />
            )}
            sx={{ flex: 1 }}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >
          <FormControl fullWidth>
            <DatePicker
              label="Date"
              value={date}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              disablePast
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
            />
          </FormControl>

          <FormControl
            size="small"
            fullWidth
          >
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sort}
              label="Sort by"
              onChange={e => handleSortChange(e.target.value as SortType)}
            >
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="date_asc">Date: Early to Late</MenuItem>
              <MenuItem value="date_desc">Date: Late to Early</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {hasQuery && (
          <Stack
            direction="row"
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              size="small"
              variant="outlined"
              startIcon={<X size={18} />}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

export default SearchBar
