import { PlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Group = {
    title: string
    participants: Array<string>
}

interface GroupProps {
    group: Group
}

const Group: React.FC<GroupProps> = ({ group }) => {
    const { title, participants } = group
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/new-group')
    }

    return (
        <div className="rounded-xl bg-red-200 w-60 p-4">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="mt-3">
                {participants.map((participant, index) => (
                    <p key={index}>{participant}</p>
                ))}
            </div>
            <button className="fab bottom-6 right-6" onClick={handleClick}>
                <PlusIcon className="text-white size-6" />
            </button>{' '}
        </div>
    )
}

export default Group
