import React from 'react'

interface TicketCardProps {
    imageUrl: string
    title: string
    type: string
    username: string
    price: string
    startDate: string
    endDate: string
}

const TicketCard: React.FC<TicketCardProps> = ({
    imageUrl,
    title,
    type,
    username,
    price,
    startDate,
    endDate,
}) => {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex-grow pl-4">
                <h3 className="font-bold text-sm">{title}</h3>
                <p className="text-gray-600 text-sm">{type}</p>
                <p className="text-gray-600 text-sm">{username}</p>
                <div className="flex justify-between text-gray-500 text-xs mt-2">
                    <p>Fra {startDate}</p>
                    <p>Til {endDate}</p>
                </div>
            </div>

            <div className="flex items-center">
                <p className="font-semibold text-sm">{price}</p>
                <span className="ml-2 text-gray-400">&gt;</span>
            </div>
        </div>
    )
}

export default TicketCard
