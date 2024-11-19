import React, { useState } from 'react'
import TicketForm from '../components/Ticket/TicketForm'
import Snackbar from '../components/Snackbar'

const EditTicketPage: React.FC<{ initialData: any }> = ({ initialData }) => {
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })
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
                initialData={initialData}
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
