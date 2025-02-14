import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import CategoryCard from '../components/Booking/CategoryCard'
import { fetchData, getPicture, uniqueUsers } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Booking, Ticket } from '../components/types'
import { Paths } from '../../paths'
import Snackbar from '../components/Snackbar'
import TicketCard from '../components/Ticket/TicketCard'

function BookingsOverviewPage() {
    const { bookingId } = useParams<{ bookingId: string }>()
    const [booking, setBooking] = useState<Booking>()
    const [tickets, setTickets] = useState<any[]>([])

    const [imageUrl, setImageUrl] = useState<string>(
        'https://placehold.co/600x200'
    )

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
        const fetchBookingAndTickets = async () => {
            try {
                const bookingData = await fetchData(`/Booking/${bookingId}`)
                setBooking(bookingData)
                setTickets(bookingData.tickets)
                setSnackbar({
                    message: 'Booking fetched successfully!',
                    type: 'success',
                    visible: true,
                })
            } catch (error) {
                console.error('Error fetching booking and tickets:', error)
                setSnackbar({
                    message: 'Failed to fetch booking.',
                    type: 'error',
                    visible: true,
                })
            }
        }
        fetchBookingAndTickets()
    }, [bookingId])

    const findMaxDate = (tickets: Array<Ticket>) =>
        tickets.reduce(
            (acc: Date, ticket: Ticket) =>
                new Date(ticket.endDate) > acc ? new Date(ticket.endDate) : acc,
            new Date(-8640000000000000)
        )

    const findMinDate = (tickets: Array<Ticket>) =>
        tickets.reduce(
            (acc: Date, ticket: Ticket) =>
                new Date(ticket.startDate) < acc
                    ? new Date(ticket.startDate)
                    : acc,
            new Date(8640000000000000)
        )

    const createCategories = () => {
        //dict = {[category] : Array<Ticket>[]}
        const obj = {}
        tickets.forEach((ticket) => {
            if (obj[ticket.category]) {
                obj[ticket.category].push(ticket)
            } else {
                obj[ticket.category] = [ticket]
            }
        })

        const objects = Object.keys(obj).map((category) => {
            const tickets = obj[category]
            const maxDate = findMaxDate(tickets)
            const minDate = findMinDate(tickets)
            const participants = uniqueUsers(
                tickets.map(
                    (ticket: Ticket) =>
                        ticket?.assignedUser || ticket?.assignedUnregUser
                )
            )

            return (
                <CategoryCard
                    key={category}
                    categoryTitle={category}
                    participants={participants.length}
                    amountOfTickets={tickets.length}
                    endDate={new Date(maxDate).toLocaleDateString()}
                    startDate={new Date(minDate).toLocaleDateString()}
                />
            )
        })
        return objects
    }

    useEffect(() => {
        const fetchImage = async () => {
            if (!booking?.title) return
            const fetchedImage = await getPicture(booking.title)
            if (fetchedImage) {
                setImageUrl(fetchedImage)
            } else {
                console.warn('No image found for this title')
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

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
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
                        <div className="mt-5 flex flex-col gap-2">
                            {tickets.length > 5
                                ? createCategories()
                                : tickets?.map((ticket) => (
                                      <TicketCard
                                          key={ticket.id}
                                          title={ticket.title}
                                          username={
                                              ticket.assignedUser?.name ||
                                              ticket.assignedUnregUser?.name
                                          }
                                          imageUrl={
                                              ticket.imageUrl ??
                                              'https://placehold.co/50x50'
                                          }
                                          price={ticket.price}
                                          type={ticket.category}
                                          startDate={new Date(
                                              ticket.startDate
                                          ).toLocaleDateString()}
                                          endDate={new Date(
                                              ticket.endDate
                                          ).toLocaleDateString()}
                                          id={ticket.id}
                                      />
                                  ))}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 mr-4">
                        <button
                            className="fab bottom-6 right-20 "
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
