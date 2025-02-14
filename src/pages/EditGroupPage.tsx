import React, { useEffect, useState } from 'react'
import { UserIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import { Autocomplete } from '../components/Autocomplete'
import { UnregUser, User } from '../components/types'
import { fetchData, postData, putData } from '../utils'
import Snackbar from '../components/Snackbar'
import { useMsal } from '@azure/msal-react'

const EditGroupPage: React.FC = () => {
    const navigate = useNavigate()
    const [selectedUsers, setSelectedUsers] = useState<Array<User | UnregUser>>(
        []
    )
    const { instance, accounts } = useMsal()

    const [groupName, setGroupName] = useState('')
    const { groupId } = useParams<{ groupId: string }>()

    const editGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value)
    }
    const [options, setOptions] = useState<Array<User> | null>(null)
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const group = await fetchData(`/Group/${groupId}`)
                setGroupName(group.name)
                setSelectedUsers([...group.users, ...group.unregUsers])
            } catch (error) {
                console.error('error fetching group details', error)
                setSnackbar({
                    message: 'Failed to fetch group details.',
                    type: 'error',
                    visible: true,
                })
            }
        }
        if (groupId) fetchGroupDetails()
    }, [groupId])

    const fetchUserOptions = async () => {
        try {
            const data = await fetchData(`/user`)
            const unregUssers = await fetchData(
                `/UnregUser/user/${accounts[0].localAccountId}`
            )
            const groups = await fetchData(`/group`)
            setOptions([...data, ...unregUssers, ...groups])
        } catch (error) {
            console.log(error)
            setSnackbar({
                message: 'Failed to fetch user options.',
                type: 'error',
                visible: true,
            })
        }
    }
    useEffect(() => {
        fetchUserOptions()
    }, [])
    const handleSaveGroup = async () => {
        if (!groupName.trim() || selectedUsers.length === 0) {
            setSnackbar({
                message:
                    'Please provide a group name and add at least one member.',
                type: 'info',
                visible: true,
            })
            return
        }

        try {
            const data = {
                id: groupId,
                name: groupName,
                userIds: selectedUsers
                    .filter((user) => user && user.hasOwnProperty('email'))
                    .map((user) => user.id),
                unregUserIds: selectedUsers
                    .filter((user) => user && !user.hasOwnProperty('email'))
                    .map((user) => user && user.id),
            }

            await putData('/Group/update', data)
            setSnackbar({
                message: 'Group updated successfully!',
                type: 'success',
                visible: true,
            })

            navigate('/groups', { replace: true })
        } catch (error) {
            console.log(error)
            setSnackbar({
                message: 'Failed to update group.',
                type: 'error',
                visible: true,
            })
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    return (
        <div className="flex gap-6 flex-col m-4">
            <div className="">
                <h1 className="h1 ml-2 mb-2.5">Edit Group</h1>
                <input
                    type="text"
                    className="input-contained"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={editGroupName}
                />
            </div>
            <div className="">
                <h1 className="h1 ml-2 mb-2.5">Add members</h1>
                <Autocomplete
                    field="name"
                    selected={selectedUsers}
                    setSelected={setSelectedUsers}
                    options={options ?? []}
                    placeholder="Member Name"
                    addNewUser={true}
                    refetchOptions={fetchUserOptions}
                />
            </div>

            <button
                className="btn-primary w-full self-center"
                onClick={handleSaveGroup}
            >
                Update
            </button>
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

export default EditGroupPage
