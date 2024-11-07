import React from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'

const AddTicketPage: React.FC = () => {
    const navigate = useNavigate()
    const { bookingId } = useParams<{ bookingId: string }>()

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
            ticketName: ticketData.ticketName,
            ticketType: ticketData.ticketType,
            userName: ticketData.userName,
            startDate: new Date(ticketData.startDate).toISOString(),
            endDate: new Date(ticketData.endDate).toISOString(),
            purchasedBy: ticketData.purchasedBy,
            purchasedDate: ticketData.purchasedDate,
            userId: 1,
        }
        try {
            const newTicket = await postData(
                `/booking/${bookingId}/tickets/create`,
                body
            )
            navigate(`/booking/${bookingId}/tickets/${newTicket.id}`)
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
