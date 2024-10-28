import React from 'react'
import Navbar from '../components/Navbar'
import { BookingCard } from '../components/BookingCard'
import BookingsList from '../components/BookingsList'

const BookingDummy = {
    imageUrl: 'https://placehold.co/173x173',
    title: 'Trip to Paris',
    fromDate: 'June 10, 2023',
    toDate: 'June 12, 2023',
    participants: 1,
    id: '1',
}

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
        id: '1',
    },
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '1',
    },
]

const HomePage: React.FC = () => {
    return (
        <div className="p-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold">Welcome back, User!</h1>
            <BookingsList bookings={bookings} />
        </div>
    )
}

export default HomePage
