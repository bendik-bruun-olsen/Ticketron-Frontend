import React, { useEffect, useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { Ticket } from '../components/types'
import { fetchData, postData, putData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import Snackbar from '../components/Snackbar'

const EditTicketPage: React.FC = () => {
    const { bookingId, ticketId } = useParams<{
        bookingId: string
        ticketId: string
    }>()
    const [tickets, setTickets] = useState<Ticket>()

    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    const navigate = useNavigate()

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data: Ticket = await fetchData(`/Ticket/${ticketId}`)
                setTickets(data)
            } catch (error) {
                console.error('Error fetching tickets:', error)
            }
        }
        getTickets()
    }, [])

    const handleEditTicket = async (ticket: Ticket) => {
        const body = {
            id: ticketId,
            title: ticket.title,
            startDate: ticket.startDate,
            endDate: ticket.endDate,
            AssignedUserId: ticket.assignedUser[0],
            bookingId: bookingId,
            category: ticket.category,
            price: ticket.price,
            purchasedDate: ticket.purchasedDate,
            purchasedBy: ticket.purchasedBy?.name,
        }
        try {
            const newTicket = await putData(`/Ticket/update`, body)
            navigate(`/booking/${bookingId}/ticket/${newTicket.id}`, {
                replace: true,
            })
            setSnackbar({
                message: 'Ticket added successfully!',
                type: 'success',
                visible: true,
            })
        } catch (error) {
            console.error(error)
            setSnackbar({
                message: 'Failed to update ticket.',
                type: 'error',
                visible: true,
            })
        }
    }
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }
    return (
        <div>
            <h1> EditTicketPage</h1>
            <TicketForm
                mode="edit"
                onSubmit={handleEditTicket}
                initialData={tickets}
            />
            {snackbar.visible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={handleCloseSnackbar}
                />
            )}
        </div>
    )
}

export default EditTicketPage
