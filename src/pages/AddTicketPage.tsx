import React, { useEffect, useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData, fetchData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Ticket } from '../components/types'
import { useMsal } from '@azure/msal-react'

const AddTicketPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const { instance, accounts } = useMsal()
    // const newTicket.Id = 1

    const handleAddTicket = async (ticket: Ticket) => {
        const body = {
            title: ticket.title,
            participantId: 2,
            startDate: new Date(ticket.startDate).toISOString(),
            endDate: new Date(ticket.endDate).toISOString(),
            userId: accounts[0]?.localAccountId,
            bookingId: bookingId,
        }
        try {
            const newTicket = await postData(`/Ticket/create`, body)
            setTickets((prevTickets) => [...prevTickets, newTicket])
            navigate(`./tickets/${newTicket.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <h1>Add Ticket</h1>
            <TicketForm mode="add" onSubmit={handleAddTicket} />
        </div>
    )
}

export default AddTicketPage
