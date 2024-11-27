import React, { useEffect, useState } from 'react'
import { Booking, BookingSummary } from '../types'
import { useNavigate } from 'react-router-dom'
import { getPicture } from '../../utils'

interface BookingCardProps {
    booking: Booking
}

export function BookingCard({ booking }: BookingCardProps) {
    const { title, startDate, endDate, id, users } = booking
    const [imageUrl, setImageUrl] = useState<string>(
        'https://via.placeholder.com/150'
    )
    const Navigate = useNavigate()

    const handleClick = () => {
        Navigate(`/booking/${id}`)
    }

    useEffect(() => {
        const fetchImage = async () => {
            if (!title) return
            const fetchedImage = await getPicture(title)

            if (fetchedImage) {
                setImageUrl(fetchedImage)
            }
        }
        fetchImage()
    }, [title])

    return (
        <button className="flex flex-col gap-1 text-left" onClick={handleClick}>
            <div className="h-48 w-full">
                <img
                    src={imageUrl ?? 'https://placehold.co/173x173'}
                    alt={`Picture for booking ${title}`}
                    className="rounded-xl object-cover h-full w-full object-center"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="text-black font-bold">{title}</h2>
                <p>
                    {new Date(startDate).toLocaleDateString()} -{' '}
                    {new Date(endDate).toLocaleDateString()}
                </p>
                <p>
                    {users.length + 1}{' '}
                    {users.length + 1 > 1 ? 'Participants' : 'Participant'}
                </p>
            </div>
        </button>
    )
}
