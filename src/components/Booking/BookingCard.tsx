import React from 'react'
import { Booking, BookingSummary } from '../types'
import { useNavigate } from 'react-router-dom'

interface BookingCardProps {
    booking: Booking
}

export function BookingCard({ booking }: BookingCardProps) {
    const { title, startDate, endDate, id } = booking
    const imageUrl = 'https://placehold.co/173x173'
    const participants = 1
    const Navigate = useNavigate()

    const handleClick = () => {
        Navigate(`/booking/${id}`)
    }

    return (
        <button className="flex flex-col gap-1 text-left" onClick={handleClick}>
            <img
                src={imageUrl ?? 'https://placehold.co/173x173'}
                alt={`Picture for booking ${title}`}
                className="rounded-xl"
            />{' '}
            <div className="flex flex-col gap-1">
                <h2 className="text-black font-bold">{title}</h2>
                <p>
                    {new Date(startDate).toLocaleDateString()} -{' '}
                    {new Date(endDate).toLocaleDateString()}
                </p>
                <p>
                    {participants}{' '}
                    {participants > 1 ? 'Participants' : 'Participant'}
                </p>
            </div>
        </button>
    )
}
