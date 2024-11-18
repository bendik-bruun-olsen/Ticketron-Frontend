import React, { useEffect, useState } from 'react'
import BookingForm from '../components/Booking/BookingForm'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchData, postData, putData } from '../utils'
import { Booking } from '../components/types'
import Snackbar from '../components/Snackbar'

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
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await fetchData(`/Booking/${bookingId}`)
                setDateRange({
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                })

                setBooking(data)
            } catch (error) {
                console.error(error)
                setSnackbar({
                    message: 'Failed to fetch booking.',
                    type: 'error',
                    visible: true,
                })
            }
            fetchBooking()
        }
    }, [bookingId])

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
            setSnackbar({
                message: 'Booking updated successfully!',
                type: 'success',
                visible: true,
            })
        } catch (error) {
            console.error(error)
            setSnackbar({
                message: 'Failed to update booking.',
                type: 'error',
                visible: true,
            })
        }
    }
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }
    return (
        <>
            <BookingForm
                booking={booking}
                handleSubmit={handleSubmit}
                dateRange={dateRange}
                setDateRange={setDateRange}
            />
            {snackbar.visible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={handleCloseSnackbar}
                />
            )}
        </>
    )
}

export default EditBookingPage
