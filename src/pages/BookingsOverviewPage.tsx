import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import CategoryCard from '../components/Booking/CategoryCard'
import { fetchData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Booking } from '../components/types'
import { Paths } from '../../paths'
import Snackbar from '../components/Snackbar'

function BookingsOverviewPage() {
    const { bookingId } = useParams<{ bookingId: string }>()

    const [booking, setBooking] = useState<Booking>()

    const navigate = useNavigate()

    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await fetchData(`/Booking/${bookingId}`)
                setBooking(data)
                setSnackbar({
                    message: 'Booking fetched successfully!',
                    type: 'success',
                    visible: true,
                })
            } catch (error) {
                console.error(error)
                setSnackbar({
                    message: 'Failed to fetch booking.',
                    type: 'error',
                    visible: true,
                })
            }
        }
        fetchBookings()
    }, [bookingId])

    const goToAddTicketPage = () => {
        navigate(`./add-ticket`)
    }

    const goToEditBookingPage = () => {
        navigate(`./edit-booking`)
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    return (
        <>
            {booking && (
                <div className="flex flex-col">
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
            {snackbar.visible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={handleCloseSnackbar}
                />
            )}
        </>
    )
}

export default BookingsOverviewPage
