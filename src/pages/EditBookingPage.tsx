import React, { useEffect, useState } from 'react'
import BookingForm from '../components/Booking/BookingForm'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchData, postData, putData } from '../utils'
import { Booking } from '../components/types'

const EditBookingPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const [booking, setBooking] = useState<Booking>()

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooking = async () => {
            const data = await fetchData(`/Booking/${bookingId}`)
            setBooking(data)
        }
        fetchBooking()
    }, [])

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
            const updatedBooking = await putData(`/Booking/${bookingId}`, body)
            navigate(`/booking/${bookingId}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <BookingForm
            booking={booking}
            handleSubmit={handleSubmit}
            dateRange={dateRange}
            setDateRange={setDateRange}
        />
    )
}

export default EditBookingPage
