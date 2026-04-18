"use client"

import { CITIES_LIST } from "@/constants"
import { CreateSchedule } from "@/types"
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"

interface ScheduleFormProps {
  onSubmit: (data: CreateSchedule) => void
  isLoading?: boolean
  isEditing?: boolean
  defaultValues?: Partial<CreateSchedule>
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  onSubmit,
  isLoading = false,
  isEditing = false,
  defaultValues,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSchedule>({
    defaultValues: {
      from: defaultValues?.from || "",
      to: defaultValues?.to || "",
      date: defaultValues?.date || "",
      price: defaultValues?.price || 0,
    },
    mode: "onChange",
  })

  const handleFormSubmit = (data: CreateSchedule) => {
    onSubmit(data)
  }

  return (
    <Card sx={{ maxWidth: 800, m: "0 auto" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 600, mb: 4 }}
        >
          {isEditing ? "Edit Schedule" : "Create New Schedule"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <Stack spacing={3}>
            <Controller
              name="from"
              control={control}
              rules={{
                required: "Departure city is required",
                validate: (value, formValues) => {
                  return (
                    value !== formValues.to ||
                    "Departure and destination cities cannot be the same"
                  )
                },
              }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  options={CITIES_LIST}
                  onChange={(_e, value) => field.onChange(value)}
                  disabled={isLoading}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="From"
                      placeholder="Enter departure city"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              )}
            />

            <Controller
              name="to"
              control={control}
              rules={{
                required: "Destination city is required",
                validate: (value, formValues) => {
                  return (
                    value !== formValues.from ||
                    "Departure and destination cities cannot be the same"
                  )
                },
              }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  options={CITIES_LIST}
                  onChange={(_e, value) => field.onChange(value)}
                  disabled={isLoading}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="To"
                      placeholder="Enter destination city"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Date"
                  format="YYYY-MM-DD"
                  disablePast
                  value={dayjs(field.value)}
                  onChange={newValue => field.onChange(newValue?.toISOString())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              )}
            />

            <TextField
              fullWidth
              label="Price"
              type="number"
              placeholder="0"
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: 10,
                },
              }}
              {...register("price", { valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price?.message}
              disabled={isLoading}
            />
          </Stack>

          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}
          >
            <Button
              type="button"
              variant="outlined"
              disabled={isLoading}
              size="large"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              size="large"
            >
              {isLoading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Schedule"
                  : "Create Schedule"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ScheduleForm
