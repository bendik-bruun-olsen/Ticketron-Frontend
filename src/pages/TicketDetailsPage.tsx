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
import { fetchData } from '../utils'

const TicketDetailsPage: React.FC = () => {
    const [ticketDetails, setTicketDetails] = useState<any>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { bookingId, ticketId } = useParams<{
        bookingId: string
        ticketId: string
    }>()
    const navigate = useNavigate()

    useEffect(() => {
        const getTicketDetails = async () => {
            if (!ticketId) return
            try {
                const data = await fetchData(`/Ticket/${ticketId}`)
                setTicketDetails(data)
            } catch (error) {
                console.error('Error fetching ticket details:', error)
            }
        }

        getTicketDetails()
    }, [bookingId, ticketId])

    const handleEdit = () => {
        navigate(`./edit-ticket/${ticketId}`)
    }

    const handleDelete = () => {
        setIsModalVisible(true)
    }

    const handleConfirmDelete = () => {
        console.log('Item Deleted')
        setIsModalVisible(false)
        navigate(`/booking/${bookingId}`)
    }

    const handleCancelDelete = () => {
        setIsModalVisible(false)
    }

    if (!ticketDetails) {
        return <p>Loading...</p>
    }

    const {
        title,
        user,
        startDate,
        endDate,
        price,
        purchaseDate,
        category,
        purchasedBy,
    } = ticketDetails

    return (
        <div className="w-full">
            <img
                src="https://placehold.co/173x173"
                className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col gap-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex flex-col gap-6">
                    <TicketDetail
                        title={'Navn'}
                        subtitle={user}
                        icon={<UserIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'Start Date'}
                        subtitle={startDate}
                        icon={<CalendarDaysIcon className="size-6" />}
                    />
                    <TicketDetail
                        title={'End Date'}
                        subtitle={endDate}
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
                        subtitle={purchaseDate}
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
        </div>
    )
}

export default TicketDetailsPage
