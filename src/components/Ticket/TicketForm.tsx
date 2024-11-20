import React, { useEffect, useState } from 'react'
import DaterangePicker from '../Datepicker'
import { Button, Dropdown, DropdownItem } from 'flowbite-react'

interface TicketFormProps {
    mode: 'add' | 'edit'
    initialData?: {
        title: string
        category: string
        userName: string
        startDate: string
        endDate: string
        price: string
        purchasedBy: string
        purchasedDate: string
    }
    onSubmit: (data: any) => void
}

const CustomDropdown: React.FC<{
    selectedCategory: string
    onCategorySelect: (category: string) => void
}> = ({ selectedCategory, onCategorySelect }) => {
    const categories = [
        'Plane',
        'Concert',
        'Train',
        'Bus',
        'Boat',
        'Other',
        'ThemeParks',
        'Cinema',
        'Theatre',
        'Museum',
        'Zoo',
        'Festival',
        'Sports',
        'Restaurant',
        'Hotel',
    ]
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
        title: '',
        category: '',
        userName: '',
        startDate: '',
        endDate: '',
        price: '',
        purchasedBy: '',
        purchasedDate: '',
    })

    const categories = [
        'Plane',
        'Concert',
        'Train',
        'Bus',
        'Boat',
        'Other',
        'ThemeParks',
        'Cinema',
        'Theatre',
        'Museum',
        'Zoo',
        'Festival',
        'Sports',
        'Restaurant',
        'Hotel',
    ]

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        initialData?.category || ''
    )

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

    const toggleDropdown = () => setDropdownOpen((prev) => !prev)

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
                name="ticketName"
                placeholder="Ticket Name"
                defaultValue={initialData?.title}
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
                        {categories.map((category) => (
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
