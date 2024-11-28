import React, { useEffect, useState } from 'react'
import { UserIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Autocomplete } from '../components/Autocomplete'
import { User } from '../components/types'
import { fetchData, postData } from '../utils'

const NewGroupPage: React.FC = () => {
    const navigate = useNavigate()
    const [selectedUsers, setSelectedUsers] = useState<Array<User>>([])
    const [groupName, setGroupName] = useState('')

    const editGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value)
    }
    const [options, setOptions] = useState<Array<User> | null>(null)

    useEffect(() => {
        const fetchUserOptions = async () => {
            try {
                const data = await fetchData(`/users`)
                setOptions(data)
            } catch (error) {
                console.log(error)
            }
        }
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
                members: selectedUsers.map((user) => user.id.toString()),
            }
            const result = await postData('/Group/create', data)
            alert('Group created successfully')
            console.log('createdgroup:', result)
            navigate('/groups')
        } catch (error) {
            console.log(error)
            alert('Failed to create group')
        }
    }

    const handleClick = () => {
        navigate('/groups')
    }

    return (
        <>
            <div className="mt-4 ml-2 mr-2">
                <h1 className="h1 ml-2 mb-2.5">Create a New Group</h1>
                <input
                    type="text"
                    className="input-contained"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={editGroupName}
                />
            </div>
            <div className="mt-7 ml-2 mr-2">
                <h1 className="h1 ml-2 mb-2.5">Add members</h1>
                <div className="relative">
                    <UserIcon className="size-6 p-1 absolute box-border top-1/2 left-0.5 transform -translate-y-1/2 " />
                    <Autocomplete
                        field="name"
                        selected={selectedUsers}
                        setSelected={setSelectedUsers}
                        options={options ?? []}
                        placeholder="Member Name"
                    />
                </div>
            </div>

            <button className="fab relative h-10 w-10 mt-5 ml-3">
                <PlusIcon className="size-6" color="white" />
            </button>
            <div className="flex justify-center" onClick={handleSaveGroup}>
                <button className="btn-primary mt-24 w-11/12 justify-center">
                    Save
                </button>
            </div>
        </>
    )
}

export default NewGroupPage
