import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import CategoryCard from '../components/Booking/CategoryCard'
import { fetchData } from '../utils'
import { useParams } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { Booking } from '../components/types'
import { Paths } from '../../paths'


function BookingsOverviewPage() {
    const { bookingId } = useParams<{ bookingId: string }>()

    const [booking, setBooking] = useState<Booking>()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await fetchData(`/Booking/${bookingId}`)
            setBooking(data)
        }
        fetchBookings()
    }, [])

    const goToAddTicketPage = () => {
        navigate(`./add-ticket`)
    }

    const goToEditBookingPage = () => {
        navigate(`./edit-booking`)
    }
    return (
        <>
            {booking && (
                <div className="flex flex-col p-4">
                    <img
                        src="https://placehold.co/600x200"
                        alt=""
                        className="justify-center"
                    />
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
