export interface Credentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
}

export interface User {
  id: number
  email: string
  createdAt: string
}

export interface Schedule {
  id: string
  from: string
  to: string
  date: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export type Sort = "price_asc" | "price_desc" | "date_asc" | "date_desc"

export interface SchedulesQuery {
  from?: string
  to?: string
  date?: string
  sort?: Sort
  page?: number
  limit?: number
}

export type CreateSchedule = Omit<Schedule, "id" | "createdAt" | "updatedAt">

export type UpdateSchedule = Partial<CreateSchedule>
