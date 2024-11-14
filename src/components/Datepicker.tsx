import { useEffect, useState } from 'react'
import 'flowbite/dist/flowbite.css'
import React from 'react'
import { CalendarIcon } from '@heroicons/react/24/solid'
import { CustomFlowbiteTheme, Datepicker, Flowbite } from 'flowbite-react'

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

const customTheme: CustomFlowbiteTheme = {
    textInput: {
        field: {
            input: {
                base: 'input-contained-icon',
            },
        },
    },
}

const DaterangePicker = ({ dateRange, setDateRange }: DaterangePickerProps) => {
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <div>
                <label
                    htmlFor="datepicker-range-start"
                    className="block text-sm pl-2 font-medium text-gray-900 dark:text-white"
                >
                    Start Date
                </label>
                <Datepicker
                    name="startDate"
                    id="startDate"
                    onChange={(date) =>
                        setDateRange({ ...dateRange, startDate: date })
                    }
                    value={dateRange.startDate ?? new Date()}
                />{' '}
            </div>
            <div>
                <label
                    htmlFor="datepicker-range-end"
                    className="block text-sm pl-2 font-medium text-gray-900 dark:text-white"
                >
                    End Date{' '}
                </label>

                <Datepicker
                    name="endDate"
                    onChange={(date) =>
                        setDateRange({ ...dateRange, endDate: date })
                    }
                    value={dateRange.endDate ?? new Date()}
                />
            </div>
        </Flowbite>
    )
}

export default DaterangePicker
