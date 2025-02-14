import React, { useEffect, useState } from 'react'
import { BookingCard } from './BookingCard'
import { Booking } from './../types'

interface ListProps {
    bookings: Array<Booking>
}

const BookingsList = ({ bookings }: ListProps): JSX.Element => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                {bookings?.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    )
}

export default BookingsList
