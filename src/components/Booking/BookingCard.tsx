import React from 'react'
import { BookingSummary } from '../types'
import { useNavigate } from 'react-router-dom'

interface BookingCardProps {
    booking: BookingSummary
}

export function BookingCard({ booking }: BookingCardProps) {
    const { imageUrl, title, fromDate, toDate, participants, id } = booking
    const Navigate = useNavigate()

    const handleClick = () => {
        Navigate(`/booking/${id}`)
    }

    return (
        <button className="flex flex-col gap-1 text-left" onClick={handleClick}>
            <img
                src={imageUrl}
                alt={`Picture for booking ${title}`}
                className="rounded-xl"
            />{' '}
            <div className="flex flex-col gap-1">
                <h2 className="text-black font-bold">{title}</h2>
                <p>
                    {fromDate} - {toDate}
                </p>
                <p>
                    {participants}{' '}
                    {participants > 1 ? 'Participants' : 'Participant'}
                </p>
            </div>
        </button>
    )
}
