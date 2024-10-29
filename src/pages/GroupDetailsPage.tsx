import React from 'react'
import Group from '../components/Group'

const allGroups = [
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
    },
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
    },
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
    },
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
    },
]

const GroupDetailsPage: React.FC = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col gap-4">
                {allGroups.map((group) => (
                    <Group group={group} />
                ))}
            </div>
        </div>
    )
}

export default GroupDetailsPage
