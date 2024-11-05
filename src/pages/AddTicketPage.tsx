import React from 'react'
import TicketForm from '../components/Ticket/TicketForm'

const AddTicketPage: React.FC = () => {
    const handleAddTicket = (ticketdata: any) => {
        console.log('Adding Ticket', ticketdata)
    }

    return (
        <div>
            <h1>Add Ticket</h1>
            <TicketForm mode="add" onSubmit={handleAddTicket} />
        </div>
    )
}

export default AddTicketPage
