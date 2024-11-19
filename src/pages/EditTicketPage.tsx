import React, { useEffect, useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { Ticket } from '../components/types'
import { fetchData } from '../utils'
import { useParams } from 'react-router-dom'

const EditTicketPage: React.FC<{ initialData: any }> = ({ initialData }) => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const ticketId = useParams<{ ticketId: string }>()

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data: Ticket[] = await fetchData(`/Ticket/${ticketId}`)
                setTickets(data)
            } catch (error) {
                console.error('Error fetching tickets:', error)
            }
        }
        getTickets()
    }, [bookingId])

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
