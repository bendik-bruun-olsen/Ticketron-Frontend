import React from 'react'

interface TicketDetailprops {
    title: string
    subtitle: string
    icon: JSX.Element
}

const TicketDetail: React.FC<TicketDetailprops> = ({
    title,
    subtitle,
    icon,
}) => {
    return (
        <div className="flex gap-4 items-center">
            {icon}
            <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm">{subtitle}</p>
            </div>
        </div>
    )
}

export default TicketDetail
