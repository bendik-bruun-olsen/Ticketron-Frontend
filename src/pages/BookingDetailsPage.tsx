import React from 'react'
import { useParams } from 'react-router'

const BookingDetailsPage: React.FC = () => {
    let params = useParams()
    return (
        <div>
            <h2>
                Welcome to the Booking Details Page for booking with id{' '}
                {params.bookingId}
            </h2>
        </div>
    )
}

export default BookingDetailsPage
