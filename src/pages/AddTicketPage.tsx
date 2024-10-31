import React, { useEffect } from 'react'
import { DateRangePicker } from 'flowbite-datepicker'
import { Datepicker } from 'flowbite-datepicker'
import 'flowbite/dist/flowbite.css'
import 'flowbite'

const AddTicketPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        const { title, dateFrom, dateTo, participants } =
            e.target as HTMLFormElement
    }
    useEffect(() => {
        const startDatePicker = document.getElementById(
            'datepicker-range-start'
        )
        const endDatePicker = document.getElementById('datepicker-range-end')
        if (startDatePicker && endDatePicker) {
            new Datepicker(startDatePicker, {
                format: 'yyyy-mm-dd',
                autohide: true,
            })
            new Datepicker(endDatePicker, {
                format: 'yyyy-mm-dd',
                autohide: true,
            })
        }
    }, [])
    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
                required
                className="input-contained"
                name="ticketname"
                placeholder="Ticket Name"
            />
            <input
                required
                className="input-contained"
                name="tickettype"
                placeholder="Ticket Type"
            />
            <input
                required
                className="input-contained"
                name="userName"
                placeholder="Username"
            />

            <div
                id="date-range-picker"
                date-range-picker="true"
                className="flex items-center"
            >
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input
                        id="datepicker-range-start"
                        name="start"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date start"
                    />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>
                    <input
                        id="datepicker-range-end"
                        name="end"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date end"
                    />
                </div>
            </div>

            <input
                required
                className="input-contained"
                name="Price"
                placeholder="Price"
            />
            <input
                className="input-contained"
                name="purchasedBy"
                placeholder="Purchased By(Optional)"
            />
        </form>
    )
}

export default AddTicketPage
