import React, { useEffect, useState } from 'react'
import BookingForm from '../components/Booking/BookingForm'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchData, postData, putData } from '../utils'
import { Booking } from '../components/types'
import { useMsal } from '@azure/msal-react'

const EditBookingPage: React.FC = () => {
    const { instance, accounts } = useMsal()
    const { bookingId } = useParams<{ bookingId: string }>()
    const [booking, setBooking] = useState<Booking>()
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])

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
            id: bookingId,
            title: title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        }

        try {
            await putData(`/Booking/update`, body)
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
            selectedUsers={selectedUsers}
            setSelectedUser={setSelectedUsers}
        />
    )
}

export default EditBookingPage
