import { PlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupMember } from '../types'

interface GroupProps {
    name?: string
    users: GroupMember[] | string[]
}

const GroupComponent: React.FC<GroupProps> = ({ name, users }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/new-group')
    }

    return (
        <div className="rounded-xl bg-red-200 w-60 p-4">
            <h3 className="font-bold text-xl">{name}</h3>
            <div className="mt-3">
                {users?.map((user, index) => (
                    <p key={index}>
                        {typeof user === 'string' ? user : user.id}
                    </p>
                ))}
            </div>
            <button className="fab bottom-6 right-6" onClick={handleClick}>
                <PlusIcon className="text-white size-6" />
            </button>
        </div>
    )
}

export default GroupComponent
