import React from 'react'
import { useNavigate, useParams } from 'react-router'
import TicketCard from '../components/Ticket/TicketCard'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'
import SearchFilter from '../components/SearchFilter'
import { Dropdown } from 'flowbite-react'

const BookingDetailsPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()

    // Mock data for tickets and dropdowns, replace with real data
    const tickets = [
        {
            imageUrl: 'https://via.placeholder.com/64',
            title: 'Ticket Name',
            type: 'Flybillett',
            username: 'Bruker Navn',
            price: '1000kr',
            startDate: ' 10.10.2024',
            endDate: ' 10.10.2024',
            id: '1',
        },
        {
            imageUrl: 'https://via.placeholder.com/64',
            title: 'Ticket Name',
            type: 'Flybillett',
            username: 'Bruker Navn',
            price: '1000kr',
            startDate: ' 10.10.2024',
            endDate: ' 10.10.2024',
            id: '2',
        },
    ]

    const dropdowns: string[] = [
        'Train tickets',
        'Bus tickets',
        'Concert tickets',
    ]

    const goToAddTicketPage = () => {
        navigate(`/booking/${bookingId}/add-ticket`)
    }

    const goToEditBookingPage = () => {
        navigate(`./edit-booking`)
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen relative">
            <SearchFilter></SearchFilter>
            <div className="flex flex-row items-baseline">
                <h2 className="text-xl font-bold mb-4">Plane tickets</h2>
                <Dropdown inline>
                    {dropdowns.map((dropdown, index) => (
                        <Dropdown.Item key={index}>{dropdown}</Dropdown.Item>
                    ))}
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
