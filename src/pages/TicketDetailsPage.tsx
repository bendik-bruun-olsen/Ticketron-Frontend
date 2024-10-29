import React from 'react'
import Navbar from '../components/Navbar'
import TicketCard from '../components/TicketCard'

const TicketDetailsPage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <TicketCard
                imageUrl="https://via.placeholder.com/150"
                title="Ticket Name"
                type="Flybillett"
                username="Bruker Navn"
                price="1000kr"
                startDate="10.10.2024"
                endDate="10.10.2024"
            />
        </div>
    )
}

export default TicketDetailsPage
