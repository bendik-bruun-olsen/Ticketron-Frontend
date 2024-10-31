import React from 'react'
import { UserIcon } from '@heroicons/react/24/outline'
import TicketDetail from '../components/Ticket/TicketDetail'

const TicketDetailsPage: React.FC = () => {
    return (
        <TicketDetail
            title={'Name'}
            subtitle={'Anne'}
            icon={<UserIcon className="size-8" />}
        />
    )
}

export default TicketDetailsPage
