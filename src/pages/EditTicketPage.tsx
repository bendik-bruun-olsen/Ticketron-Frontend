import React from 'react'
import TicketForm from '../components/Ticket/TicketForm'

const EditTicketPage: React.FC<{ initialData: any }> = ({ initialData }) => {
    const handleEditTicket = (ticketdata: any) => {
        console.log('Adding Ticket', ticketdata)
    }
    return (
        <div>
            <h1> EditTicketPage</h1>
            <TicketForm
                mode="edit"
                onSubmit={handleEditTicket}
                initialData={initialData}
            />
        </div>
    )
}

export default EditTicketPage
