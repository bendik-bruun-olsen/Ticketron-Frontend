import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { fetchData } from '../utils'
import BookingsList from '../components/Booking/BookingsList'
import { BookingCard } from '../components/Booking/BookingCard'
import { PlusIcon } from '@heroicons/react/24/solid'
import dayjs from 'dayjs'
import SnackBar from '../components/Snackbar'
import Snackbar from '../components/Snackbar'

const BookingPage: React.FC = () => {
    const { instance, accounts } = useMsal()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(Paths.ADD_BOOKING)
    }

    const [upcomingBookings, setUpcomingBookings] = useState([])
    const [historyBookings, setHistoryBookings] = useState([])
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
        const fetchBookings = async () => {
            try {
                const data = await fetchData(
                    `/Booking/user/${accounts[0]?.localAccountId}`
                )
                const today = dayjs()
                const upcomingBookings = data
                    .filter(
                        (booking: any) =>
                            dayjs(booking.date).isAfter(today, 'day') ||
                            dayjs(booking.date).isSame(today, 'day')
                    )
                    .sort((a: any, b: any) => dayjs(a.date).diff(dayjs(b.date)))

                const historyBookings = data
                    .filter((booking: any) =>
                        dayjs(booking.date).isBefore(today, 'day')
                    )
                    .sort((a: any, b: any) => dayjs(b.date).diff(dayjs(a.date)))

                setUpcomingBookings(upcomingBookings)
                setHistoryBookings(historyBookings)
                setSnackbar({
                    message: 'Bookings fetched successfully!',
                    type: 'success',
                    visible: true,
                })
            } catch (error) {
                console.error(error)
                setSnackbar({
                    message: 'Failed to fetch bookings.',
                    type: 'error',
                    visible: true,
                })
            }
        }
        fetchBookings()
    }, [])
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    return (
        <>
            <div className=" p-4 flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold mb-4">All Bookings</h2>
                    <Link
                        to="/bookings#history"
                        className="text-sm text-red-600 hover:text-red-700 hover:underline px-3 py-1 rounded"
                    >
                        History
                    </Link>
                </div>
                <BookingsList bookings={upcomingBookings} />
                <button className="fab bottom-6 right-6" onClick={handleClick}>
                    <PlusIcon className="text-white size-6" />
                </button>
            </div>
            <div id="history" className="p-4 mt-10">
                <h2 className="font-bold mb-4">History</h2>
                <BookingsList bookings={historyBookings} />
            </div>
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

export default BookingPage
