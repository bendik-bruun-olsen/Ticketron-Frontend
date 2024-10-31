import React from 'react'
import { BookingSummary } from './types'
import { Router, useParams } from 'react-router'
import { Paths } from '../../paths'

interface BookingCardProps {
    booking: BookingSummary
}

export function BookingCard({ booking }: BookingCardProps) {
    const { imageUrl, title, fromDate, toDate, participants, id } = booking

    const handleClick = () => {
        location.replace(`/booking/${id}`)
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
