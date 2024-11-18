import React, { useEffect, useState } from 'react'
import { getPicture, postData } from '../utils'
import DaterangePicker from '../components/Datepicker'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../components/Booking/BookingForm'
import { useMsal } from '@azure/msal-react'
import Snackbar from '../components/Snackbar'

const AddNewBookingPage: React.FC = () => {
    const { instance, accounts } = useMsal()

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
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

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title } = formProps as HTMLFormElement
        const imageUrl = await getPicture(title)

        const body = {
            title: title,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
            userId: accounts[0]?.localAccountId,
            image: 'https://via.placeholder.com/64',
            imageUrl,
        }

        try {
            const newBooking = await postData('/Booking/create', body)
            navigate(`/booking/${newBooking.id}`)
            setSnackbar({
                message: 'Booking created successfully!',
                type: 'success',
                visible: true,
            })
        } catch (error) {
            console.error(error)
            setSnackbar({
                message: 'Failed to create booking.',
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

export default AddNewBookingPage
