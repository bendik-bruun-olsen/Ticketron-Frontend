import React from 'react'
import Group from '../components/Group/Group'

const allGroups = [
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
        id: 1,
    },
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
        id: 2,
    },
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
        id: 3,
    },
    {
        title: 'Workout',
        participants: ['Anne', 'Kokila'],
        id: 4,
    },
]

const GroupDetailsPage: React.FC = () => {
    return (
        <div className="p-4 flex flex-col gap-4">
            {allGroups.map((group) => (
                <Group key={group.id} group={group} />
            ))}
        </div>
    )
}

export default GroupDetailsPage
