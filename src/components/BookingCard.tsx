import React, { useEffect, useState } from 'react'
import { BookingSummary } from './types'
import { Router, useNavigate, useParams } from 'react-router'
import { Paths } from '../../paths'
import { getPicture } from '../utils'

interface BookingCardProps {
    booking: BookingSummary
}

export function BookingCard({ booking }: BookingCardProps) {
    const { title, fromDate, toDate, participants, id } = booking
    const [imageUrl, setImageUrl] = useState<string>(
        'https://via.placeholder.com/150'
    )
    console.log('BookingCardProps:', booking)
    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log('BookingCard component mounted')
    //     fetchImage()
    // }, [])

    // const fetchImage = async () => {
    //     console.log('fetchImage called')
    //     try {
    //         const response = await getPicture(title)
    //         console.log('Response from Pexels API:', response)
    //         setImageUrl(response?.url || 'https://via.placeholder.com/150')
    //     } catch (error) {
    //         console.error('Error fetching image:', error)
    //     }

    useEffect(() => {
        const fetchImage = async () => {
            console.log('Fetching image for title:', title)
            const fetchedImage = await getPicture(title)
            console.log('Fetched image:', fetchedImage)
            if (fetchedImage) {
                setImageUrl(fetchedImage)
            } else {
                console.log('No image found for this title')
            }
        }
        fetchImage()
    }, [title])

    const handleClick = () => {
        location.replace(`/booking/${id}`)
    }

    return (
        <button className="flex flex-col gap-1 text-left" onClick={handleClick}>
            <img
                src={imageUrl}
                alt={`Picture for booking ${title}`}
                className="rounded-xl"
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                }}
            />
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
