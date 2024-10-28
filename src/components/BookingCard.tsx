import React from 'react'

type BookingSummary = {
    imageUrl: string
    title: string
    fromDate: string
    toDate: string
    participants: number
    id: string
}

interface BookingCardProps {
    booking: BookingSummary
}

export function BookingCard({ booking }: BookingCardProps) {
    const { imageUrl, title, fromDate, toDate, participants, id } = booking
    return (
        <>
            <img
                src="https://placehold.co/173x173"
                alt="Placeholder image"
                className="rounded-xl"
            />
            <h2>{title}</h2>
        </>
    )
}
