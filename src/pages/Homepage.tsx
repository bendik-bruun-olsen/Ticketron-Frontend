import React from 'react'
import { BookingCard } from '../components/Booking/BookingCard'
import BookingsList from '../components/Booking/BookingsList'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'

const bookings = [
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '1',
    },
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '2',
    },
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '3',
    },
]

const HomePage: React.FC = () => {
    const handleClick = () => {
        location.replace(Paths.ADD_BOOKING)
    }

    return (
        <div className=" p-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold">Welcome back, User!</h1>
            <BookingsList bookings={bookings} />
            <button
                className="fab absolute bottom-6 right-6"
                onClick={handleClick}
            >
                <PlusIcon className="text-white" />
            </button>
        </div>
    )
}

export default HomePage
