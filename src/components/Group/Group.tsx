import { PlusIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupMember, UnregUser, User } from '../types'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteData } from '../../utils'
import Snackbar from '../Snackbar'
import DeleteModal from '../DeleteModal'

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
        setIsModalVisible(true)
    }

    const handleConfirmDelete = async () => {
        try {
            await onDelete(groupId)
            setSnackbar({
                message: 'Group deleted successfully!',
                type: 'success',
                visible: true,
            })
            setIsModalVisible(false)
        } catch (error) {
            console.error('Failed to delete group:', error)
            setSnackbar({
                message: 'Failed to delete group.',
                type: 'error',
                visible: true,
            })
        }
    }

    const handleCancelDelete = () => {
        setIsModalVisible(false)
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
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
            <DeleteModal
                isVisible={isModalVisible}
                onCancel={handleCancelDelete}
                onDelete={handleConfirmDelete}
            />
            {snackbar.visible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={handleCloseSnackbar}
                />
            )}
        </div>
    )
}

export default GroupComponent
