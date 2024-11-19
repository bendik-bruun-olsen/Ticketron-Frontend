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

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

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
        if (selectedFile) {
            onSubmit(formData, selectedFile)
        }
        if (!selectedFile) {
            onSubmit(formData)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFormEdited(true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
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
                name="ticketName"
                placeholder="Ticket Name"
                defaultValue={initialData?.ticketName}
                onChange={handleInputChange}
            />
            <div className="relative">
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    name="Upload Ticket Image"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <label htmlFor="file-upload" className="btn-primary">
                    Upload Ticket
                </label>
                {selectedFile && (
                    <span className="ml-4 text-gray-700">
                        {selectedFile.name}
                    </span>
                )}
            </div>
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
