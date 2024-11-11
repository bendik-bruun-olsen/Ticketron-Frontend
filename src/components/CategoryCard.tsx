import React from 'react'
import { useNavigate } from 'react-router-dom'

interface CategoryCardProps {
    imageUrl: string
    categoryTitle: string
    participants: number
    amountOfTickets: number
    startDate: string
    endDate: string
    id: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    imageUrl,
    categoryTitle,
    participants,
    amountOfTickets,
    startDate,
    endDate,
    id,
}) => {
    const navigate = useNavigate()

    return (
        <div
            className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200"
            onClick={() => navigate(`./tickets`)}
        >
            <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img
                    src={imageUrl}
                    alt={categoryTitle}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex-grow pl-4">
                <h3 className="font-bold text-sm">{categoryTitle}</h3>
                <p className="text-gray-600 text-sm">
                    Tickets: {amountOfTickets}
                </p>
                <p className="text-gray-600 text-sm">
                    Participants: {participants}
                </p>
                <div className="flex justify-between text-gray-500 text-xs mt-2">
                    <p>From {startDate}</p>
                    <p>To {endDate}</p>
                </div>
            </div>

            <div className="flex items-center">
                <span className="ml-2 text-gray-400">&gt;</span>
            </div>
        </div>
    )
}

export default CategoryCard
