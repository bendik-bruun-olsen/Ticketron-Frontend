import React from 'react'
import { useNavigate, useParams } from 'react-router'
import TicketCard from '../components/Ticket/TicketCard'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Paths } from '../../paths'
import SearchFilter from '../components/SearchFilter'

const BookingDetailsPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()

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

    const goToAddTicketPage = () => {
        navigate(Paths.ADD_TICKET)
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen relative">
            <SearchFilter></SearchFilter>

            <h2 className="text-xl font-bold mb-4">Plane tickets</h2>

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
