import React, { useEffect, useState } from 'react'
import { BookingCard } from '../components/Booking/BookingCard'
import BookingsList from '../components/Booking/BookingsList'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'
import { Link, useNavigate } from 'react-router-dom'
import { fetchData } from '../utils'
import { useMsal } from '@azure/msal-react'
import dayjs from 'dayjs'
import Snackbar from '../components/Snackbar'

const HomePage: React.FC = () => {
    const { instance, accounts } = useMsal()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(Paths.ADD_BOOKING)
    }

    const [bookings, setBookings] = useState([])
    const [error, setError] = useState<{
        code: number
        message: string
    } | null>(null)

    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    const showSnackbar = (
        message: string,
        type: 'success' | 'error' | 'info'
    ) => {
        setSnackbar({ message, type, visible: true })
        setTimeout(
            () => setSnackbar((prev) => ({ ...prev, visible: false })),
            3000
        )
    }

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await fetchData(`/Booking`)
                const filteredBookings = data
                    .filter(
                        (booking: any) =>
                            dayjs(booking.date).isAfter(dayjs(), 'day') ||
                            dayjs(booking.date).isSame(dayjs(), 'day')
                    )
                    .slice(0, 4)
                setBookings(filteredBookings)
                showSnackbar('Bookings loaded successfully', 'success')
            } catch (error) {
                setError({
                    code: (error as any).code,
                    message: (error as any).message,
                })
                showSnackbar('Failed to load bookings', 'error')
            }
        }

        fetchBookings()
    }, [])

    // if (true) {
    //     throw new Error('Intentional error for testing ErrorBoundary')
    // }

    return (
        <>
            <div className=" p-4 flex flex-col gap-10">
                <h1 className="text-2xl font-bold">
                    Welcome back {accounts[0]?.name}!
                </h1>
                <div className="flex items-center justify-between">
                    <h2 className="font-bold mb-4">Upcoming Bookings</h2>
                    <Link
                        to="/bookings"
                        className="text-sm text-red-600 hover:text-red-700 hover:underline px-3 py-1 rounded"
                    >
                        See All
                    </Link>
                </div>
                <BookingsList bookings={bookings} />
                <button className="fab bottom-6 right-6" onClick={handleClick}>
                    <PlusIcon className="text-white size-6" />
                </button>
                {snackbar.visible && (
                    <Snackbar
                        message={snackbar.message}
                        type={snackbar.type}
                        onClose={() =>
                            setSnackbar((prev) => ({ ...prev, visible: false }))
                        }
                    />
                )}
            </div>
        </>
    )
}

export default HomePage
