import React from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Ticket } from '../components/types'

const AddTicketPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()

    // const newTicket.Id = 1

    const handleAddTicket = async (ticket: Ticket) => {
        const body = {
            title: ticket.title,
            participantId: 2,
            startDate: new Date(ticket.startDate).toISOString(),
            endDate: new Date(ticket.endDate).toISOString(),
            userId: 1,
            bookingId: bookingId,
        }
        try {
            const newTicket = await postData(`/Ticket/create`, body)
            navigate(`./tickets/${newTicket.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <TicketForm mode="add" onSubmit={handleAddTicket} />
        </div>
    )
}

export default AddTicketPage
