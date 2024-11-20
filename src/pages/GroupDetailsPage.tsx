import React, { useEffect, useState } from 'react'
import GroupComponent from '../components/Group/Group'
import { fetchData } from '../utils'
import { useMsal } from '@azure/msal-react'
import { Group } from '../components/types'

const GroupDetailsPage: React.FC = () => {
    const { accounts } = useMsal()
    const [groups, setGroups] = useState<Group[]>([])
    const [error, setError] = useState<{
        code: number
        message: string
    } | null>(null)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await fetchData(
                    `/Group/user/${accounts[0]?.localAccountId}`
                )
                console.log(data)
                setGroups(data)
            } catch (error) {
                setError({
                    code: (error as any).code,
                    message: (error as any).message,
                })
            }
        }
        fetchGroups()
    }, [accounts])

    return (
        <div className="p-4 flex flex-col gap-4">
            {groups?.map((group) => (
                <GroupComponent
                    key={group.id}
                    name={group.name}
                    users={group.users}
                />
            ))}
            {error && <div>Error: {error.message}</div>}
        </div>
    )
}

export default GroupDetailsPage
