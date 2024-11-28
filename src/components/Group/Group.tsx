import { PlusIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupMember, UnregUser, User } from '../types'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteData } from '../../utils'

interface GroupProps {
    name?: string
    users: (User | UnregUser)[]
    groupId: number
    onDelete: (id: number) => void
}

const GroupComponent: React.FC<GroupProps> = ({
    name,
    users,
    groupId,
    onDelete,
}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/new-group')
    }
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    console.log('GroupComponent', users)

    const handleEdit = () => {
        navigate('/edit-group/:id')
    }

    const handleDelete = () => {
        onDelete(groupId)
    }

    return (
        <div className="rounded-xl bg-red-200 w-60 p-4">
            <h1 className="font-bold text-xl">{name}</h1>
            <div className="mt-3">
                {users?.map((user, index) => (
                    <p key={index}>
                        {typeof user === 'string' ? user : user.name}
                    </p>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button className="" onClick={handleEdit}>
                    <PencilIcon className="text-white size-6" />
                </button>
                <button className="" onClick={handleDelete}>
                    <TrashIcon className="text-white size-6" />
                </button>
            </div>
        </div>
    )
}

export default GroupComponent
