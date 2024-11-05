import { useEffect, useState } from 'react'
import { Datepicker } from 'flowbite-datepicker'
import 'flowbite/dist/flowbite.css'
import React from 'react'
import { CalendarIcon } from '@heroicons/react/24/solid'

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
    useEffect(() => {
        const startDatePicker = document.getElementById(
            'datepicker-range-start'
        )
        const endDatePicker = document.getElementById('datepicker-range-end')

        if (startDatePicker && endDatePicker) {
            new Datepicker(startDatePicker, {
                format: 'yyyy-mm-dd',
                autohide: true,
                onSelect: (e) => {
                    setDateRange({ ...dateRange, startDate: e })
                    startDatePicker.blur()
                },
            })

            new Datepicker(endDatePicker, {
                format: 'yyyy-mm-dd',
                autohide: true,
                onSelect: (e) => {
                    setDateRange({ ...dateRange, endDate: e })
                    endDatePicker.blur()
                },
            })
        }
    }, [])

    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor="datepicker-range-start"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Start Date
                </label>
                <div className="relative">
                    <CalendarIcon className="p-1 absolute box-border top-1/2 size-7 left-0.5 transform -translate-y-1/2 " />
                    <input
                        id="datepicker-range-start"
                        name="startDate"
                        type="text"
                        className="input-contained-icon !important "
                        required
                    />
                </div>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="datepicker-range-end"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    End Date
                </label>
                <div className="relative">
                    <CalendarIcon className=" p-1 absolute box-border top-1/2 size-7 left-0.5 transform -translate-y-1/2 " />
                    <input
                        id="datepicker-range-end"
                        name="endDate"
                        type="text"
                        className="input-contained-icon pl-10"
                    />
                </div>
            </div>
        </>
    )
}

export default DaterangePicker
