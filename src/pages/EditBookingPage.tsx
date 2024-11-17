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
        startDate: null,
        endDate: null,
    })

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooking = async () => {
            const data = await fetchData(`/Booking/${bookingId}`)
            setDateRange({
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
            })

            setBooking(data)
        }
        fetchBooking()
    }, [])

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title, endDate, startDate } = formProps as HTMLFormElement

        const body = {
            title: title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId: 1,
        }

        try {
            await putData(`/Booking/${bookingId}`, body)
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
