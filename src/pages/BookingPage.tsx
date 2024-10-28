import React from 'react'
import Navbar from '../components/Navbar'
import { BookingCard } from '../components/BookingCard'

const BookingDummy = {
    imageUrl: 'https://placehold.co/173x173',
    title: '',
    fromDate: 'June 10, 2023',
    toDate: 'June 12, 2023',
    participants: 1,
    id: '1',
}

const BookingPage: React.FC = () => {
    return (
        <div>
            <h2>Welcome to the booking page</h2>
            <BookingCard booking={BookingDummy} />
        </div>
    )
}

export default BookingPage
