import { useEffect, useState } from 'react'
import 'flowbite/dist/flowbite.css'
import React from 'react'
import { CalendarIcon } from '@heroicons/react/24/solid'
import { Datepicker } from 'flowbite-react'

interface DaterangePickerProps {
    dateRange: {
        startDate: Date | null
        endDate: Date | null
    }
    setDateRange: React.Dispatch<
        React.SetStateAction<{
            startDate: Date | null
            endDate: Date | null
        }>
    >
}

const DaterangePicker = ({ dateRange, setDateRange }: DaterangePickerProps) => {
    return (
        <>
            <div className="mb-4">
                <Datepicker
                    name="startDate"
                    title="Start Date"
                    onChange={(date) =>
                        setDateRange({ ...dateRange, startDate: date })
                    }
                    value={dateRange.startDate ?? new Date()}
                />
            </div>
            <div className="mb-4">
                <Datepicker
                    name="endDate"
                    title="Start Date"
                    onChange={(date) =>
                        setDateRange({ ...dateRange, endDate: date })
                    }
                    value={dateRange.endDate ?? new Date()}
                />
            </div>
        </>
    )
}

export default DaterangePicker
