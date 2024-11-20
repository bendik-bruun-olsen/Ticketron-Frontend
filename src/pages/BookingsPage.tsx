import { useMsal } from '@azure/msal-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { fetchData } from '../utils'
import BookingsList from '../components/Booking/BookingsList'
import { BookingCard } from '../components/Booking/BookingCard'
import { PlusIcon } from '@heroicons/react/24/solid'

const BookingPage: React.FC = () => {
    const { instance, accounts } = useMsal()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(Paths.ADD_BOOKING)
    }

    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await fetchData(
                `/Booking/user/${accounts[0]?.localAccountId}`
            )
            setBookings(data)
        }
        fetchBookings()
    }, [])

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
                <BookingsList bookings={bookings} />
                <button className="fab bottom-6 right-6" onClick={handleClick}>
                    <PlusIcon className="text-white size-6" />
                </button>
            </div>
            <div id="history" />
        </>
    )
}

export default BookingPage
