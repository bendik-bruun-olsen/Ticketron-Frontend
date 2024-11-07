import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import CategoryCard from '../components/CategoryCard'
import { fetchData } from '../utils'

function BookingsOverviewPage() {
    const bookingTitle = 'Plane'
    const bookingStartDate = '21.01.2024'
    const bookingEndDate = '10.02.2024'

    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await fetchData('/Booking/user/1')
            setBookings(data)
        }
        fetchBookings()
    }, [])

    return (
        <div className="flex flex-col">
            <img
                src="https://placehold.co/600x200"
                alt=""
                className="justify-center"
            />
            <div className="mr-4 ml-4">
                <div className="flex flex-col gap-1">
                    <h1 className="h1 mt-8">{bookingTitle}</h1>
                    <span className="opacity-50">
                        {bookingStartDate} - {bookingEndDate}
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
                <button className="fab h-10 w-10  mr-12">
                    <PencilIcon className="size-6" color="white" />
                </button>
                <button className="fab h-10 w-10">
                    <PlusIcon className="size-6" color="white" />
                </button>
            </div>
        </div>
    )
}

export default BookingsOverviewPage
