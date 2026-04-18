import {
  CreateSchedule,
  PaginatedResponse,
  Schedule,
  SchedulesQuery,
  UpdateSchedule,
} from "@/types"
import { baseApi } from "./baseApi"

const schedulesApiSlice = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Schedule", "SchedulesList"],
  })
  .injectEndpoints({
    endpoints: builder => ({
      // GET /schedules - Get all schedules with pagination, filtering and sorting
      getSchedules: builder.query<PaginatedResponse<Schedule>, SchedulesQuery>({
        query: query => ({
          url: "schedules",
          params: query,
        }),
        providesTags: ["SchedulesList"],
      }),

      // GET /schedules/:id - Get schedule by ID
      getSchedule: builder.query<Schedule, string>({
        query: id => `schedules/${id}`,
        providesTags: (result, error, id) => [{ type: "Schedule", id }],
      }),

      // POST /schedules - Create new schedule
      createSchedule: builder.mutation<Schedule, CreateSchedule>({
        query: scheduleData => ({
          url: "schedules",
          method: "POST",
          body: scheduleData,
        }),
        invalidatesTags: ["SchedulesList"],
      }),

      // PATCH /schedules/:id - Update schedule
      updateSchedule: builder.mutation<
        Schedule,
        { id: Schedule["id"] } & UpdateSchedule
      >({
        query: ({ id, ...patch }) => ({
          url: `schedules/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "Schedule", id },
          "SchedulesList",
        ],
      }),

      // DELETE /schedules/:id - Delete schedule
      deleteSchedule: builder.mutation<void, Schedule["id"]>({
        query: id => ({
          url: `schedules/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchedulesList"],
      }),
    }),
  })

export const {
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = schedulesApiSlice

export default schedulesApiSlice
