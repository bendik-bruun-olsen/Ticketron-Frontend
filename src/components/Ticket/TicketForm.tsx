import React, { useEffect, useState } from 'react'
import { Datepicker } from 'flowbite-datepicker'
import 'flowbite/dist/flowbite.css'

interface TicketFormProps {
    mode: 'add' | 'edit'
    initialData?: {
        ticketName?: string
        ticketType?: string
        userName?: string
        startDate?: string
        endDate?: string
        price?: string
        purchasedBy?: string
        purchasedDate?: string
    }
    onSubmit: (data: any) => void
}

const TicketForm: React.FC<TicketFormProps> = ({
    mode,
    initialData,
    onSubmit,
}) => {
    const [isFormEdited, setIsFormEdited] = useState(false)
    const [startDateSelected, setStartDateSelected] = useState(false)
    const [endDateSelected, setEndDateSelected] = useState(false)

    const [formData, setFormData] = useState({
        ticketName: '',
        ticketType: '',
        userName: '',
        startDate: '',
        endDate: '',
        price: '',
        purchasedBy: '',
        purchasedDate: '',
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFormEdited(true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
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
                onSelect: () => setStartDateSelected(true),
            })
            new Datepicker(endDatePicker, {
                format: 'yyyy-mm-dd',
                autohide: true,
                onSelect: () => setStartDateSelected(true),
            })
        }
    }, [])
    const handleIconClick = (id: string, iconId: string) => {
        const datePicker = document.getElementById(id)
        if (datePicker) {
            datePicker.focus()
        }
        hideIcon(iconId)
    }

    const hideIcon = (iconId: string) => {
        const iconElement = document.getElementById(iconId)
        if (iconElement) {
            iconElement.style.display = 'none'
        }
    }

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
                defaultValue={initialData?.ticketName}
                onChange={handleInputChange}
            />
            <button className="soft-input">Upload Ticket Image</button>
            <input
                required
                className="input-contained"
                name="tickettype"
                placeholder="Ticket Type"
                defaultValue={initialData?.ticketType}
                onChange={handleInputChange}
            />
            <input
                required
                className="input-contained"
                name="userName"
                placeholder="User Name"
                defaultValue={initialData?.userName}
                onChange={handleInputChange}
            />
            <div className="mb-4">
                <label
                    htmlFor="datepicker-range-start"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Start Date
                </label>
                <div className="relative">
                    <input
                        id="datepicker-range-start"
                        name="startDate"
                        type="text"
                        className="input-contained pl-10"
                        defaultValue={initialData?.startDate}
                    />
                    <div
                        id="start-icon"
                        className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
                        onClick={() =>
                            handleIconClick(
                                'datepicker-range-start',
                                'start-icon'
                            )
                        }
                    >
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
                    <input
                        id="datepicker-range-end"
                        name="endDate"
                        type="text"
                        className="input-contained pl-10"
                        defaultValue={initialData?.endDate}
                    />
                    <div
                        id="end-icon"
                        className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
                        onClick={() =>
                            handleIconClick('datepicker-range-end', 'end-icon')
                        }
                    >
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
                </div>
            </div>
            <input
                required
                className="input-contained"
                name="price"
                placeholder="Price"
                defaultValue={initialData?.price}
                onChange={handleInputChange}
            />
            <input
                className="input-contained"
                name="purchasedBy"
                placeholder="Purchased By (Optional)"
                defaultValue={initialData?.purchasedBy}
                onChange={handleInputChange}
            />
            <input
                className="input-contained"
                name="purchasedDate"
                placeholder="Purchased Date (Optional)"
                defaultValue={initialData?.purchasedDate}
                onChange={handleInputChange}
            />

            <button type="submit" className="btn-primary">
                {mode === 'add' ? 'Submit' : 'Update'}
            </button>
        </form>
    )
}

export default TicketForm
