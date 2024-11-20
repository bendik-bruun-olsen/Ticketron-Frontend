import React, { useEffect, useState } from 'react'
import DaterangePicker from '../Datepicker'
import { fetchData } from '../../utils'
import { useParams } from 'react-router-dom'
import { Autocomplete } from '../Autocomplete'
import { User, Group, Ticket } from '../types'

interface TicketFormProps {
    mode: 'add' | 'edit'
    initialData?: Ticket
    onSubmit: (data: any) => void
}

const TicketForm: React.FC<TicketFormProps> = ({
    mode,
    initialData,
    onSubmit,
}) => {
    const { bookingId } = useParams<{ bookingId: string }>()

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [options, setOptions] = useState<any>([])

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const [selected, setSelected] = useState<(User | Group)[]>([])

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await fetchData(`/booking/${bookingId}`)
                setOptions([...data.users])
            } catch (error) {
                console.log(error)
            }
        }
        fetchOptions()

        if (initialData) {
            setSelected([initialData.assignedUser])
            setDateRange({
                startDate: new Date(initialData.startDate || ''),
                endDate: new Date(initialData.endDate || ''),
            })
        }
    }, [])

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title, category, price, purchasedDate, purchasedBy } =
            formProps as HTMLFormElement

        const ticket = {
            title,
            category,
            price,
            purchasedDate,
            purchasedBy,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
            bookingId,
            assignedUser: selected.map((user) => user.id),
        }

        if (selectedFile) {
            onSubmit({ ...ticket, selectedFile })
        }
        if (!selectedFile) {
            onSubmit(ticket)
        }
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
                name="title"
                placeholder="Ticket Name"
                defaultValue={initialData?.title}
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
                name="category"
                placeholder="Ticket Type"
                defaultValue={initialData?.category}
            />
            <Autocomplete
                field={'name'}
                selected={selected}
                setSelected={setSelected}
                options={options}
                multiple={false}
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
            />
            <input
                className="input-contained"
                name="purchasedBy"
                placeholder="Purchased By (Optional)"
                defaultValue={initialData?.purchasedBy?.name}
            />
            <input
                className="input-contained"
                name="purchasedDate"
                placeholder="Purchased Date (Optional)"
                defaultValue={initialData?.purchasedDate}
            />

            <button type="submit" className="btn-primary">
                {mode === 'add' ? 'Submit' : 'Update'}
            </button>
        </form>
    )
}

export default TicketForm
