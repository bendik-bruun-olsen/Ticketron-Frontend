import React, { useEffect, useState } from 'react'
import BookingForm from '../components/Booking/BookingForm'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteData, fetchData, postData, putData } from '../utils'
import { Booking } from '../components/types'
import Snackbar from '../components/Snackbar'
import DeleteModal from '../components/DeleteModal'
import { useMsal } from '@azure/msal-react'

const EditBookingPage: React.FC = () => {
    const { instance, accounts } = useMsal()
    const { bookingId } = useParams<{ bookingId: string }>()
    const [booking, setBooking] = useState<Booking>()
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)

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
                setSelectedUsers(data.users)
            } catch (error) {
                console.error(error)
                setSnackbar({
                    message: 'Failed to fetch booking.',
                    type: 'error',
                    visible: true,
                })
            }
        }
        fetchBooking()
    }, [bookingId])

    useEffect(() => {
        if (booking) setSelectedUsers(booking.users)
    }, [booking])

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
            userIds: selectedUsers.map((user) => user.id),
        }

        try {
            await putData(`/Booking/update`, body)
            navigate(`/booking/${bookingId}`, {
                replace: true,
            })
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
    const handleDelete = () => {
        setIsModalVisible(true)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteData(`/Booking/${bookingId}`)
            setSnackbar({
                message: 'Ticket deleted successfully!',
                type: 'success',
                visible: true,
            })
            setIsModalVisible(false)
            navigate(`/bookings`)
        } catch (error) {
            console.error('Error deleting ticket:', error)
            setSnackbar({
                message: 'Failed to delete ticket.',
                type: 'error',
                visible: true,
            })
        }
    }

    const handleCancelDelete = () => {
        setIsModalVisible(false)
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
                selectedUsers={selectedUsers}
                setSelectedUser={setSelectedUsers}
            />
            <button
                className="btn-primary ml-8 w-10/12"
                onClick={() => handleDelete()}
            >
                Delete
            </button>
            <DeleteModal
                isVisible={isModalVisible}
                onCancel={handleCancelDelete}
                onDelete={handleConfirmDelete}
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
