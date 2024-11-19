import React, { useEffect, useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData, fetchData } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Ticket } from '../components/types'
import { useMsal } from '@azure/msal-react'
import Snackbar from '../components/Snackbar'

const AddTicketPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    // const newTicket.Id = 1

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data: Ticket[] = await fetchData(
                    `/tickets?bookingId=${bookingId}`
                )
                setTickets(data)
            } catch (error) {
                console.error('Error fetching tickets:', error)
            }
        }
        getTickets()
    }, [bookingId])

    const handleAddTicket = async (ticket: Ticket) => {
        const { instance, accounts } = useMsal()
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
            setSnackbar({
                message: 'Ticket added successfully!',
                type: 'success',
                visible: true,
            })
        } catch (error) {
            console.error(error)
            setSnackbar({
                message: 'Failed to add ticket.',
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
            <TicketForm mode="add" onSubmit={handleAddTicket} />
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

export default AddTicketPage
