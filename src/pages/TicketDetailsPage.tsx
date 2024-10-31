import React from 'react'
import {
    CalendarDateRangeIcon,
    CalendarDaysIcon,
    CalendarIcon,
    CreditCardIcon,
    PencilIcon,
    TagIcon,
    TrashIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import TicketDetail from '../components/Ticket/TicketDetail'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'

const DummyTicket = {
    title: 'Norway to sweden',
    user: 'Anne',
    startDate: '04.04.2020',
    endDate: '05.05.2020',
    price: '100kr',
    purchasedBy: 'Navn',
    purchaseDate: '01.01.2020',
    category: 'Flybillett',
    bookingId: 1,
}

const TicketDetailsPage: React.FC = () => {
    const {
        title,
        user,
        startDate,
        endDate,
        price,
        purchaseDate,
        category,
        purchasedBy,
        bookingId,
    } = DummyTicket

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('edit-ticket')
    }

    const handleDelete = () => {
        navigate(`/booking/${bookingId}`)
    }

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
                    />{' '}
                    <TicketDetail
                        title={'End Date'}
                        subtitle={endDate}
                        icon={<CalendarDaysIcon className="size-6" />}
                    />{' '}
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
                    />{' '}
                    <TicketDetail
                        title={'Category'}
                        subtitle={category}
                        icon={<TagIcon className="size-6" />}
                    />{' '}
                </div>
            </div>
            <button className="fab bottom-6 right-6" onClick={handleEdit}>
                <PencilIcon className="text-white size-6" />
            </button>
            <button className="fab bottom-6 right-20" onClick={handleDelete}>
                <TrashIcon className="text-white size-6" />
            </button>
        </div>
    )
}

export default TicketDetailsPage
