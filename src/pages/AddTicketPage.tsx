import React from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData } from '../utils'
import { useNavigate } from 'react-router-dom'

const AddTicketPage: React.FC = () => {
    const navigate = useNavigate()
    const bookingId = 1
    const newTicketId = 1

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
            startDate: ticketData.startDate,
            endDate: ticketData.endDate,
            price: ticketData.price,
            purchasedBy: ticketData.purchasedBy,
            purchasedDate: ticketData.purchasedDate,
            userId: 1,
        }
        try {
            const newTicket = await postData('/Ticket/create', body)
            navigate(`booking/${bookingId}/ticket/${newTicketId}`)
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
