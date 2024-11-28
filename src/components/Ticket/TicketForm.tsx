import React, { useEffect, useState } from 'react'
import DaterangePicker from '../Datepicker'
import { categoriesArray, fetchData, uploadImage } from '../../utils'
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

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        initialData?.category || ''
    )
    const toggleDropdown = () => setDropdownOpen((prev) => !prev)

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await fetchData(`/booking/${bookingId}`)
                setOptions([...data.users, data.createdBy])
            } catch (error) {
                console.log(error)
            }
        }
        fetchOptions()
        console.log(initialData)
        if (initialData) {
            setSelected([initialData.assignedUser])
            setDateRange({
                startDate: new Date(initialData.startDate || ''),
                endDate: new Date(initialData.endDate || ''),
            })
        }
    }, [initialData])

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title, category, price, purchasedDate, purchasedBy } =
            formProps as HTMLFormElement

        let imageUrl: string | undefined
        if (selectedFile) {
            imageUrl = await uploadImage(selectedFile)
        }

        const ticket = {
            title,
            category: selectedCategory,
            price,
            purchasedDate,
            purchasedBy,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
            bookingId,
            assignedUser: selected.map((user) => user.id),
            imageUrl,
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

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category)
        setDropdownOpen(false)
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
                placeholder="Ticket Title"
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
            <div className="relative">
                <button
                    type="button"
                    className="btn-primary w-fit flex justify-between items-center bg-white text-red-700 dark:bg-red-700 dark:text-red-200 border border-red-300 rounded-lg px-4 py-2 shadow-md hover:bg-red-100 dark:hover:bg-red-600"
                    onClick={toggleDropdown}
                >
                    {selectedCategory || 'Select Category'}
                    <span className="ml-2">▼</span>
                </button>

                {dropdownOpen && (
                    <ul className="absolute z-10 w-full bg-white divide-y divide-red-100 rounded-lg shadow-lg mt-2 dark:bg-red-700">
                        {categoriesArray.map((category) => (
                            <li
                                key={category}
                                className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:text-red-200 dark:hover:bg-red-600 dark:hover:text-white cursor-pointer"
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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
