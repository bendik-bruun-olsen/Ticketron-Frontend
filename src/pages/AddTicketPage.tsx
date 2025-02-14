import React, { useEffect, useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import { postData, fetchData, categoriesArray } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Ticket } from '../components/types'
import { useMsal } from '@azure/msal-react'
import Snackbar from '../components/Snackbar'

const AddTicketPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>()
    const navigate = useNavigate()
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    const handleAddTicket = async (ticket: Ticket) => {
        const body = {
            title: ticket.title,
            category: ticket.category ?? categoriesArray[5],
            startDate: ticket.startDate,
            endDate: ticket.endDate,
            bookingId: bookingId,
            price: ticket.price,
            purchasedDate: ticket.purchasedDate,
            purchasedBy: ticket.purchasedBy?.name,
            imageUrl: ticket.imageUrl,
        }

        if (!ticket.assignedUser?.email) {
            body['AssignedUnregUserId'] = ticket.assignedUser?.id
        } else {
            body['AssignedUserId'] = ticket.assignedUser.id
        }

        try {
            const newTicket = await postData(`/Ticket/create`, body)
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
