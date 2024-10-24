import React from 'react'

const BookingCardProps = {
    imageUrl: 'https://placehold.co/173x173',
    title: '',
    fromDate: 'June 10, 2023',
    toDate: 'June 12, 2023',
    participants: 1,
}

export function BookingCard() {
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
