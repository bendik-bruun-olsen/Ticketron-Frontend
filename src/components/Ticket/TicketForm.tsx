import React, { useEffect, useState } from 'react'
import DaterangePicker from '../Datepicker'

interface TicketFormProps {
    mode: 'add' | 'edit'
    initialData?: {
        ticketName: string
        ticketType: string
        userName: string
        startDate: string
        endDate: string
        price: string
        purchasedBy: string
        purchasedDate: string
    }
    onSubmit: (data: any) => void
}

const TicketForm: React.FC<TicketFormProps> = ({
    mode,
    initialData,
    onSubmit,
}) => {
    const [isFormEdited, setIsFormEdited] = useState(false)
    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const [formData, setFormData] = useState({
        title: '',
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
            setFormData({
                ...formData,
                ...initialData,
            })
            setDateRange({
                startDate: new Date(initialData.startDate || ''),
                endDate: new Date(initialData.endDate || ''),
            })
        }
    }, [initialData])

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        onSubmit({
            ...formData,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFormEdited(true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
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
                name="ticketName"
                placeholder="Ticket Name"
                defaultValue={initialData?.ticketName}
                onChange={handleInputChange}
            />
            <button className="soft-input">Upload Ticket Image</button>
            <input
                required
                className="input-contained"
                name="ticketType"
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
            <DaterangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
            />
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
