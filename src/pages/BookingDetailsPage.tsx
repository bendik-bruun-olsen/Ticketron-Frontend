import React from 'react'
import { useParams } from 'react-router'
import TicketCard from '../components/Ticket/TicketCard'
import Navbar from '../components/Navigation/Navbar'

const BookingDetailsPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const tickets = [
        {
            imageUrl: 'https://via.placeholder.com/64',
            title: 'Ticket Name',
            type: 'Flybillett',
            username: 'Bruker Navn',
            price: '1000kr',
            startDate: ' 10.10.2024',
            endDate: ' 10.10.2024',
        },
        {
            imageUrl: 'https://via.placeholder.com/64',
            title: 'Ticket Name',
            type: 'Flybillett',
            username: 'Bruker Navn',
            price: '1000kr',
            startDate: ' 10.10.2024',
            endDate: ' 10.10.2024',
        },
    ]

    return (
        <div className="p-4 bg-gray-100 min-h-screen relative">
            <Navbar />

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter Tickets"
                    className="w-full px-4 py-2 rounded-full bg-gray-200 text-gray-600"
                />
            </div>

            <h2 className="text-xl font-bold mb-4">Planetickets</h2>

            <div className="space-y-4">
                {tickets.map((ticket, index) => (
                    <TicketCard key={index} {...ticket} />
                ))}
                <div className="fixed bottom-4 right-4 flex space-x-2">
                    <button className="p-4 bg-red-600 rounded-full text-white">
                        <i className="material-icons">add</i>
                    </button>
                    <button className="p-4 bg-red-600 rounded-full text-white">
                        <i className="material-icons">edit</i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingDetailsPage
