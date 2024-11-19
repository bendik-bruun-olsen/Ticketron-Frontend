import React, { useEffect, useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { Ticket } from '../components/types'
import { fetchData } from '../utils'
import { useParams } from 'react-router-dom'
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
    }, [bookingId])

    const handleEditTicket = (ticketdata: any) => {
        console.log('Adding Ticket', ticketdata)
        setSnackbar({
            message: 'Ticket edited successfully!',
            type: 'success',
            visible: true,
        })
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
