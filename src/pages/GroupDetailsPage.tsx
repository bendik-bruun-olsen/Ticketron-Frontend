import React, { useEffect, useState } from 'react'
import Group from '../components/Group/Group'
import { fetchData } from '../utils'

const groups = [
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
    const [groups, setGroups] = useState<
        { title: string; participants: string[]; id: number }[]
    >([])
    const [error, setError] = useState<{
        code: number
        message: string
    } | null>(null)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await fetchData('/groups')
                setGroups(data)
            } catch (error) {
                setError({
                    code: (error as any).code,
                    message: (error as any).message,
                })
            }
        }
        fetchGroups()
    }, [])

    return (
        <div className="p-4 flex flex-col gap-4">
            {groups.map((group) => (
                <Group key={group.id} group={group} />
            ))}
        </div>
    )
}

export default GroupDetailsPage
