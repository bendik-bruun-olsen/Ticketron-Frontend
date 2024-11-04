import React, { useEffect, useState } from 'react'
import { Datepicker } from 'flowbite-datepicker'
import 'flowbite/dist/flowbite.css'

const AddTicketPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
    }

    const [isFormEdited, setIsFormEdited] = useState(false)
    const handleInputChange = () => {
        setIsFormEdited(true)
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
        <form
            className="flex flex-col gap-4 p-4 bg-white
             rounded-lg shadow-md"
            onSubmit={handleSubmit}
        >
            <input
                required
                className="input-contained"
                name="ticketname"
                placeholder="Ticket Name"
            />
            <button className="soft-input">Upload Ticket Image</button>
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
                placeholder="User Name"
            />
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                </div>
                <input
                    id="datepicker-range-start"
                    name="startDate"
                    type="text"
                    className="input-contained pl-10"
                    placeholder="Date From"
                />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                </div>
                <input
                    id="datepicker-range-end"
                    name="endDate"
                    type="text"
                    className="input-contained pl-10 "
                    placeholder="Date To"
                />
            </div>
            <input
                required
                className="input-contained"
                name="price"
                placeholder="Price"
            />
            <input
                className="input-contained"
                name="purchasedBy"
                placeholder="Purchased By (Optional)"
            />
            <input
                className="input-contained"
                name="purchasedDate"
                placeholder="Purchased Date (Optional)"
            />

            <button
                type="submit"
                className={`btn-primary ${isFormEdited ? 'active' : ''}`}
            >
                Submit
            </button>
        </form>
    )
}

export default AddTicketPage
