"use client"

import { SchedulesQuery, SortType } from "@/types"
import dayjs, { Dayjs } from "dayjs"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDebounceValue } from "usehooks-ts"

export const useSchedulesQuery = () => {
  const searchParams = useSearchParams()

  // Initialize state from URL search params
  const [page, setPage] = useState(searchParams.get("page") || "")
  const [from, setFrom] = useState(searchParams.get("from") || "")
  const [to, setTo] = useState(searchParams.get("to") || "")
  const [date, setDate] = useState(
    searchParams.get("date") ? dayjs(searchParams.get("date")) : null
  )
  const [sort, setSort] = useState<SortType | string>(
    searchParams.get("sort") || ""
  )
  const hasQuery = !!(page || from || to || date || sort)

  // Computed query object
  const computedQuery = useMemo((): SchedulesQuery => {
    const result: SchedulesQuery = {}

    if (page) {
      const pageNum = parseInt(page, 10)
      if (!isNaN(pageNum)) {
        result.page = pageNum
      }
    }

    if (from) {
      result.from = from
    }

    if (to) {
      result.to = to
    }

    if (date) {
      result.date = date.format("YYYY-MM-DD")
    }

    if (sort) {
      result.sort = sort as SortType
    }

    return result
  }, [page, from, to, date, sort])

  const [debouncedQuery] = useDebounceValue(computedQuery, 300)

  // Update URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    // Update from parameter
    if (debouncedQuery.from) {
      params.set("from", debouncedQuery.from)
    } else {
      params.delete("from")
    }

    // Update to parameter
    if (debouncedQuery.to) {
      params.set("to", debouncedQuery.to)
    } else {
      params.delete("to")
    }

    // Update date parameter
    if (debouncedQuery.date) {
      params.set("date", debouncedQuery.date)
    } else {
      params.delete("date")
    }

    // Update sort parameter
    if (debouncedQuery.sort) {
      params.set("sort", debouncedQuery.sort)
    } else {
      params.delete("sort")
    }

    // Update page parameter
    if (debouncedQuery.page) {
      params.set("page", debouncedQuery.page.toString())
    } else {
      params.delete("page")
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname

    // Only update if URL actually changed
    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.pushState(null, "", newUrl)
    }
  }, [debouncedQuery])

  // Handler functions
  const handlePageChange = (newPage: number) => {
    setPage(newPage > 1 ? newPage.toString() : "")
  }

  const handleFromChange = (newFrom: string) => {
    setFrom(newFrom)
    setPage("")
  }

  const handleToChange = (newTo: string) => {
    setTo(newTo)
    setPage("")
  }

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate)
    setPage("")
  }

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort)
    setPage("")
  }

  const handleClear = () => {
    setPage("")
    setFrom("")
    setTo("")
    setDate(null)
    setSort("")
  }

  return {
    // State
    page,
    from,
    to,
    date,
    sort: sort as SortType,
    debouncedQuery,
    hasQuery,

    // Handlers
    handlePageChange,
    handleFromChange,
    handleToChange,
    handleDateChange,
    handleSortChange,
    handleClear,
  }
}
