import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import TicketCard from '../components/Ticket/TicketCard'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'
import SearchFilter from '../components/SearchFilter'
import { Dropdown } from 'flowbite-react'
import { fetchData } from '../utils'
import Snackbar from '../components/Snackbar'
import { Categories } from '../components/types'
import { categoriesArray } from '../utils'
import CategoryCard from '../components/Booking/CategoryCard'
import { useSearchParams } from 'react-router-dom'

const BookingDetailsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()
    const [tickets, setTickets] = useState<any[]>([])
    const [filteredTickets, setFilteredTickets] = useState<any[]>([])

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
        const fetchTickets = async () => {
            try {
                const data = await fetchData(`/Ticket/booking/${bookingId}`)
                setTickets(data)
                setFilteredTickets(data)

                setSnackbar({
                    message: 'Tickets fetched successfully!',
                    type: 'success',
                    visible: true,
                })
            } catch (error) {
                console.error('Error fetching tickets:', error)
                setSnackbar({
                    message: 'Failed to fetch tickets.',
                    type: 'error',
                    visible: true,
                })
            }
        }
        fetchTickets()
    }, [bookingId])

    useEffect(() => {
        filterTicketsByCategory(category)
    }, [])

    const filterTicketsByCategory = (newCategory) => {
        setSearchParams({ category: newCategory })
        if (newCategory) {
            const filtered = tickets.filter(
                (ticket) => ticket.category === category
            )
            setFilteredTickets(filtered)
        } else {
            setFilteredTickets(tickets)
        }
    }

    const goToAddTicketPage = () => {
        navigate(`/booking/${bookingId}/add-ticket`)
    }

    const goToEditTicketPage = () => {
        navigate(`./edit-ticket`)
    }
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen relative">
            <SearchFilter />
            <div className="flex flex-row items-baseline">
                <h2 className="text-2xl font-bold">
                    {category !== 'null' ? category : 'All'}{' '}
                </h2>
                <Dropdown inline>
                    <Dropdown.Item
                        key={'all'}
                        onClick={() => filterTicketsByCategory(null)}
                    >
                        All
                    </Dropdown.Item>
                    {categoriesArray.map((category) => (
                        <Dropdown.Item
                            key={category}
                            onClick={() => filterTicketsByCategory(category)}
                        >
                            {category}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>

            <div className="mt-5 space-y-4">
                {filteredTickets.map((ticket, index) => {
                    return (
                        <TicketCard
                            key={index}
                            id={ticket.id}
                            imageUrl={
                                ticket.imageUrl ||
                                'https://via.placeholder.com/64'
                            }
                            title={ticket.title}
                            type={ticket.category}
                            username={
                                ticket.assignedUser?.name ||
                                ticket.assignedUnregisteredUser?.name
                            }
                            price={`${ticket.price} kr`}
                            startDate={new Date(
                                ticket.startDate
                            ).toLocaleDateString()}
                            endDate={new Date(
                                ticket.endDate
                            ).toLocaleDateString()}
                        />
                    )
                })}
                <button
                    className="fab bottom-6 right-6"
                    onClick={goToAddTicketPage}
                >
                    <PlusIcon className="text-white size-6" />
                </button>
            </div>
            {snackbar.visible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={handleCloseSnackbar}
                />
            )}
        </div>
    )
}

export default BookingDetailsPage
