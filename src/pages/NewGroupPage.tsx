import React, { useEffect, useState } from 'react'
import { UserIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Autocomplete } from '../components/Autocomplete'
import { User } from '../components/types'
import { fetchData, postData } from '../utils'
import { useMsal } from '@azure/msal-react'

const NewGroupPage: React.FC = () => {
    const navigate = useNavigate()
    const [selectedUsers, setSelectedUsers] = useState<Array<User>>([])
    const [groupName, setGroupName] = useState('')
    const { instance, accounts } = useMsal()

    const editGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value)
    }
    const [options, setOptions] = useState<Array<User> | null>(null)
    const fetchUserOptions = async () => {
        try {
            const data = await fetchData(`/user`)
            const unregUssers = await fetchData(
                `/UnregUser/user/${accounts[0].localAccountId}`
            )
            setOptions([...data, ...unregUssers])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserOptions()
    }, [])
    const handleSaveGroup = async () => {
        if (!groupName.trim() || selectedUsers.length === 0) {
            alert('Please provide a group name and add at least one member.')
            return
        }

        try {
            const data = {
                name: groupName,
                userIds: selectedUsers
                    .filter((user) => user && user.hasOwnProperty('email'))
                    .map((user) => user.id),
                unregUserIds: selectedUsers
                    .filter((user) => user && !user.hasOwnProperty('email'))
                    .map((user) => user && user.id),
            }
            const result = await postData('/Group/create', data)
            alert('Group created successfully')
            console.log('createdgroup:', result)
            navigate('/groups', { replace: true })
        } catch (error) {
            console.log(error)
            alert('Failed to create group')
        }
    }

    const handleClick = () => {
        navigate('/groups')
    }

    return (
        <div className="flex gap-6 flex-col m-4">
            <div className="">
                <h1 className="h1 ml-2 mb-2.5">Create a New Group</h1>
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
                Save
            </button>
        </div>
    )
}

export default NewGroupPage
