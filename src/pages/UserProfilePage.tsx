import React from 'react'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = (): void => {
        navigate(Paths.EDIT_USER_PROFILE)
    }

    return (
        <div className="flex items-center flex-col gap-4 text-center pt-12 w-full">
            <img
                src="https://placehold.co/80x80"
                width={'80px'}
                height={'80px'}
                className="rounded-full"
            />
            <div>
                <h1 className="text-bold text-3xl">Username</h1>
                <p className="text-red-600 text-xs">email@email.com</p>
            </div>
            <button onClick={handleClick} className="btn-primary w-3/4">
                Edit profile
            </button>
        </div>
    )
}

export default UserProfilePage
