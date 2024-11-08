import React, { useEffect, useState } from 'react'
import { postData } from '../utils'
import DaterangePicker from '../components/Datepicker'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../components/Booking/BookingForm'

const AddNewBookingPage: React.FC = () => {
    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title } = formProps as HTMLFormElement

        const body = {
            title: title,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
            userId: 1,
        }

        try {
            const newBooking = await postData('/Booking/create', body)
            navigate(`/booking/${newBooking.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <BookingForm
            handleSubmit={handleSubmit}
            dateRange={dateRange}
            setDateRange={setDateRange}
        />
    )
}

export default AddNewBookingPage
