import React, { useEffect, useState } from 'react'
import GroupComponent from '../components/Group/Group'
import { deleteData, fetchData } from '../utils'
import { useMsal } from '@azure/msal-react'
import { Group, UnregUser, User } from '../components/types'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'

const GroupDetailsPage: React.FC = () => {
    const { accounts } = useMsal()
    const [groups, setGroups] = useState<Group[]>([])
    const [error, setError] = useState<{
        code: number
        message: string
    } | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await fetchData(`/Group`)
                console.log(data)
                if (data.length === 0) {
                    console.log('No groups found')
                }
                const groupData = data.map((group: Group) => ({
                    ...group,
                    users: [
                        ...group.users.map((user: User) => ({
                            id: user.id,
                            name: user.name,
                        })),
                    ],
                }))
                console.log('GroupData', groupData)
                setGroups(groupData)
            } catch (error) {
                console.error('Error fetching groups', error)
                setError({
                    code: (error as any).code,
                    message: (error as any).message,
                })
            }
        }
        fetchGroups()
    }, [accounts])

    const handleClick = () => {
        navigate(Paths.NEW_GROUP)
    }
    const handleDeleteGroup = async (id: number) => {
        try {
            await deleteData(`/Group/${id}`)
            setGroups((prevGroups) =>
                prevGroups.filter((group) => group.id !== id)
            )
            alert('Group deleted successfully')
        } catch (error) {
            console.error('Error deleting group', error)
        }
    }
    return (
        <div className="p-4 flex flex-col gap-4">
            {groups?.map((group) => (
                <div key={group.id}>
                    <GroupComponent
                        name={group.name}
                        users={group.users}
                        groupId={group.id}
                        onDelete={handleDeleteGroup}
                    />
                </div>
            ))}{' '}
            <button className="fab bottom-6 right-6" onClick={handleClick}>
                <PlusIcon className="text-white size-6" />
            </button>
            {error && <div>Error: {error.message}</div>}
        </div>
    )
}

export default GroupDetailsPage
