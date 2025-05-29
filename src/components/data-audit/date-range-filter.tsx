"use client"

import * as React from "react"
import { addMonths, subMonths } from "date-fns"
import { DatePicker } from "@/components/ui/date-picker"

interface DateRangeFilterProps {
    onDateRangeChange: (fromDate: Date | null, toDate: Date | null) => void
    fromDate: Date | null
    toDate: Date | null
}

export function DateRangeFilter({ onDateRangeChange, fromDate, toDate }: DateRangeFilterProps) {
    const today = new Date()
    const maxDate = addMonths(today, 3)
    const minDate = subMonths(today, 3) // 3 months back from today

    const handleFromDateChange = (date: Date | undefined) => {
        const selectedDate = date || null
        onDateRangeChange(selectedDate, toDate)
    }

    const handleToDateChange = (date: Date | undefined) => {
        const selectedDate = date || null
        onDateRangeChange(fromDate, selectedDate)
    }

    const isFromDateDisabled = (date: Date): boolean => {
        return date < minDate ||
            date > maxDate ||
            (toDate !== null && date > toDate)
    }

    const isToDateDisabled = (date: Date): boolean => {
     
        return  date < minDate ||
        date > maxDate ||
        (toDate !== null && date > toDate)
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Date Range:</span>

            <DatePicker
                date={fromDate || undefined}
                onDateChange={handleFromDateChange}
                placeholder="From"
                disabled={isFromDateDisabled}
                className="w-[140px] text-xs"
            />

            <span className="text-sm text-muted-foreground">to</span>

            <DatePicker
                date={toDate || undefined}
                onDateChange={handleToDateChange}
                placeholder="To"
                disabled={isToDateDisabled}
                className="w-[140px] text-xs"
            />
        </div>
    )
} 