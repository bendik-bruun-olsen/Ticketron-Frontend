import React from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'

const AddTicketPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()

    // const newTicket.Id = 1

    const handleAddTicket = async (ticketData: {
        ticketName: string
        ticketType: string
        userName: string
        startDate: string
        endDate: string
        price: string
        purchasedBy?: string
        purchasedDate?: string
    }) => {
        const body = {
            title: ticketData.ticketName,
            participantId: 2,
            startDate: new Date(ticketData.startDate).toISOString(),
            endDate: new Date(ticketData.endDate).toISOString(),
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
            <h1>Add Ticket</h1>
            <TicketForm mode="add" onSubmit={handleAddTicket} />
        </div>
    )
}

export default AddTicketPage
