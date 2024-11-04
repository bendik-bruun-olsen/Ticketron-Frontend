import React, { useState } from 'react'
import { UserIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const NewGroupPage: React.FC = () => {
    const navigate = useNavigate()

    const [groupName, setGroupName] = useState('')

    const editGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value)
        console.log(groupName)
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
                    <UserIcon className="h-6 w-6 p-1 absolute box-border top-1/2 left-0.5 transform -translate-y-1/2 " />
                    <input
                        type="text"
                        className="input-contained h-50 box-border pl-6"
                        placeholder="Member Name"
                    />
                </div>
            </div>
            <button className="fab relative h-10 w-10 mt-5 ml-3">
                <PlusIcon className="size-6" color="white" />
            </button>
            <div className="flex justify-center" onClick={handleClick}>
                <button className="btn-primary mt-24 w-11/12 justify-center">
                    Save
                </button>
            </div>
        </>
    )
}

export default NewGroupPage
