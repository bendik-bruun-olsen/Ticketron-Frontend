import React, { useEffect, useState } from 'react'
import {
    CalendarDaysIcon,
    CreditCardIcon,
    PencilIcon,
    TagIcon,
    TrashIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import TicketDetail from '../components/Ticket/TicketDetail'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'
import { deleteData, fetchData } from '../utils'
import Snackbar from '../components/Snackbar'
import { Ticket } from '../components/types'

const TicketDetailsPage: React.FC = () => {
    const [ticketDetails, setTicketDetails] = useState<any>()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { bookingId, ticketId } = useParams<{
        bookingId: string
        ticketId: string
    }>()
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

    useEffect(() => {
        const getTicketDetails = async () => {
            if (!ticketId) return
            try {
                const data = await fetchData(`/Ticket/${ticketId}`)
                setTicketDetails(data)
                setSnackbar({
                    message: 'Ticket details fetched successfully!',
                    type: 'success',
                    visible: true,
                })
            } catch (error) {
                console.error('Error fetching ticket details:', error)
                setSnackbar({
                    message: 'Failed to fetch ticket details.',
                    type: 'error',
                    visible: true,
                })
            }
        }

        getTicketDetails()
    }, [bookingId, ticketId])

    const handleEdit = () => {
        navigate(`./edit-ticket/`)
    }

    const handleDelete = () => {
        setIsModalVisible(true)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteData(`/tickets/${ticketId}`)
            setSnackbar({
                message: 'Ticket deleted successfully!',
                type: 'success',
                visible: true,
            })
            setIsModalVisible(false)
            navigate(`/booking/${bookingId}`)
        } catch (error) {
            console.error('Error deleting ticket:', error)
            setSnackbar({
                message: 'Failed to delete ticket.',
                type: 'error',
                visible: true,
            })
        }
    }

    const handleCancelDelete = () => {
        setIsModalVisible(false)
    }
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    if (!ticketDetails) {
        return <p>Loading...</p>
    }

    const {
        title,
        assignedUser,
        assignedUnregUser,
        startDate,
        endDate,
        price,
        purchasedDate,
        category,
        purchasedBy,
    } = ticketDetails

    return (
        <div className="w-full">
            <img
                src={ticketDetails.imageUrl || 'https://placehold.co/173x173'}
                className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col gap-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex flex-col gap-6">
                    <TicketDetail
                        title={'Navn'}
                        subtitle={assignedUser?.name || assignedUnregUser?.name}
                        icon={<UserIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'Start Date'}
                        subtitle={new Date(startDate).toLocaleDateString()}
                        icon={<CalendarDaysIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'End Date'}
                        subtitle={new Date(endDate).toLocaleDateString()}
                        icon={<CalendarDaysIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'Price'}
                        subtitle={price}
                        icon={<CreditCardIcon className="size-6" />}
                    />
                </div>
                <h2 className="text-xl font-bold">Purchase details</h2>
                <div className="flex flex-col gap-6">
                    <TicketDetail
                        title={'Purchased by'}
                        subtitle={purchasedBy}
                        icon={<UserIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'Purchase date'}
                        subtitle={purchasedDate}
                        icon={<CalendarDaysIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'Category'}
                        subtitle={category}
                        icon={<TagIcon className="size-6" />}
                    />
                </div>
            </div>
            <button className="fab bottom-6 right-6" onClick={handleEdit}>
                <PencilIcon className="text-white size-6" />
            </button>
            <button
                className="fab bottom-6 right-20"
                onClick={() => handleDelete()}
            >
                <TrashIcon className="text-white size-6" />
            </button>
            <DeleteModal
                isVisible={isModalVisible}
                onCancel={handleCancelDelete}
                onDelete={handleConfirmDelete}
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

export default TicketDetailsPage
