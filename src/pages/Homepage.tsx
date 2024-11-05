import React, { useEffect, useState } from 'react'
import { BookingCard } from '../components/Booking/BookingCard'
import BookingsList from '../components/Booking/BookingsList'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'
import BackendTest from '../testing/BackendTest'
import { fetchData } from '../utils'
import { useMsal } from '@azure/msal-react'

const HomePage: React.FC = () => {
    const { instance, accounts } = useMsal()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(Paths.ADD_BOOKING)
    }

    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await fetchData('/Booking/user/1')
            setBookings(data)
        }
        fetchBookings()
    }, [])

    return (
        <>
            <div className=" p-4 flex flex-col gap-10">
                <h1 className="text-2xl font-bold">
                    Welcome back {accounts[0]?.name}!
                </h1>
                <BookingsList bookings={bookings} />
                <button className="fab bottom-6 right-6" onClick={handleClick}>
                    <PlusIcon className="text-white size-6" />
                </button>
            </div>
            <BackendTest />
        </>
    )
}

export default HomePage
