import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import TicketCard from '../components/Ticket/TicketCard'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'
import SearchFilter from '../components/SearchFilter'
import { Dropdown } from 'flowbite-react'
import { fetchData } from '../utils'

const BookingDetailsPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()

    const [tickets, setTickets] = useState<any[]>([])
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetchData(`/ticket/booking/${bookingId}`)

                if (!response.ok) throw new Error('Failed to fetch tickets')
                const data = await response.json()
                setTickets(data)
            } catch (error) {
                console.error('Error fetching tickets:', error)
            }
        }
        fetchTickets()
    }, [bookingId])

    // const tickets = [
    //     {
    //         imageUrl: 'https://via.placeholder.com/64',
    //         title: 'Ticket Name',
    //         type: 'Flybillett',
    //         username: 'Bruker Navn',
    //         price: '1000kr',
    //         startDate: ' 10.10.2024',
    //         endDate: ' 10.10.2024',
    //         id: '1',
    //     },
    //     {
    //         imageUrl: 'https://via.placeholder.com/64',
    //         title: 'Ticket Name',
    //         type: 'Flybillett',
    //         username: 'Bruker Navn',
    //         price: '1000kr',
    //         startDate: ' 10.10.2024',
    //         endDate: ' 10.10.2024',
    //         id: '2',
    //     },
    // ]

    const goToAddTicketPage = () => {
        navigate(`/booking/${bookingId}/add-ticket`)
    }

    const goToEditTicketPage = () => {
        navigate(`./edit-ticket`)
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen relative">
            <SearchFilter></SearchFilter>
            <div className="flex flex-row items-baseline">
                <h2 className="text-xl font-bold mb-4">Plane tickets</h2>
                <Dropdown inline label="Options">
                    <Dropdown.Item onClick={goToAddTicketPage}>
                        Add Ticket
                    </Dropdown.Item>
                    <Dropdown.Item onClick={goToEditTicketPage}>
                        Edit Ticket
                    </Dropdown.Item>
                </Dropdown>
            </div>

            <div className="space-y-4">
                {tickets.map((ticket, index) => (
                    <TicketCard key={index} {...ticket} />
                ))}
                <button
                    className="fab bottom-6 right-6"
                    onClick={goToAddTicketPage}
                >
                    <PlusIcon className="text-white size-6" />
                </button>
            </div>
        </div>
    )
}

export default BookingDetailsPage
