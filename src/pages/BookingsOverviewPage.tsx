import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import CategoryCard from '../components/Booking/CategoryCard'
import { fetchData, getPicture } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Booking } from '../components/types'
import { Paths } from '../../paths'

function BookingsOverviewPage() {
    const { bookingId } = useParams<{ bookingId: string }>()

    const [booking, setBooking] = useState<Booking>()
    const [imageUrl, setImageUrl] = useState<string>(
        'https://placehold.co/600x200'
    )

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await fetchData(`/Booking/${bookingId}`)
            setBooking(data)
        }
        fetchBookings()
    }, [])

    useEffect(() => {
        const fetchImage = async () => {
            if (!booking?.title) return
            const fetchedImage = await getPicture(booking.title)
            if (fetchedImage) {
                setImageUrl(fetchedImage)
            } else {
                console.log('No image found for this title')
            }
        }
        fetchImage()
    }, [booking])

    const goToAddTicketPage = () => {
        navigate(`./add-ticket`)
    }

    const goToEditBookingPage = () => {
        navigate(`./edit-booking`)
    }
    return (
        <>
            {booking && (
                <div className="flex flex-col">
                    <div className="h-48">
                        <img
                            src={imageUrl}
                            alt=""
                            className="justify-center h-full w-full object-cover"
                        />
                    </div>
                    <div className="mr-4 ml-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="h1 mt-8">{booking?.title}</h1>
                            <span className="opacity-50">
                                {new Date(
                                    booking?.startDate
                                ).toLocaleDateString()}{' '}
                                -{' '}
                                {new Date(
                                    booking?.endDate
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="mt-5">
                            <CategoryCard
                                imageUrl="https://placehold.co/50x50"
                                categoryTitle="Plane"
                                participants={3}
                                amountOfTickets={5}
                                startDate="21.01.2024"
                                endDate="10.02.2024"
                                id="3"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 mr-4">
                        <button
                            className="fab bottom-6 right-20  absolute"
                            onClick={goToEditBookingPage}
                        >
                            <PencilIcon className="size-6" color="white" />
                        </button>
                        <button
                            className="fab bottom-6 right-6"
                            onClick={goToAddTicketPage}
                        >
                            <PlusIcon className="text-white size-6" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BookingsOverviewPage
