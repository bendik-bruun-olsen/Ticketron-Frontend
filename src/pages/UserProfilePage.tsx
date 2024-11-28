import React, { useEffect, useState } from 'react'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../utils'
import { useMsal } from '@azure/msal-react'
import Snackbar from '../components/Snackbar'

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate()
    const { accounts } = useMsal()

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        imageUrl: '',
    })
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
        const getUserData = async () => {
            const userId = accounts[0]?.localAccountId
            console.log(userId)
            if (!userId) {
                setSnackbar({
                    message: 'Failed to load user details. Please try again.',
                    type: 'error',
                    visible: true,
                })
                return
            }
            try {
                const userData = await fetchData(`/User/${userId}`)
                console.log(userData)
                const { name, email } = userData

                setUserDetails({
                    name: name,
                    email: email,
                    imageUrl: '',
                })
            } catch (error) {
                setSnackbar({
                    message: 'Failed to load user details. Please try again.',
                    type: 'error',
                    visible: true,
                })
            }
        }

        getUserData()
    }, [accounts])
    const handleClick = (): void => {
        navigate(Paths.EDIT_USER_PROFILE)
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    return (
        <div className="flex items-center flex-col gap-4 text-center pt-12 w-full">
            <img
                src={userDetails.imageUrl || 'https://placehold.co/80x80'}
                width={'80px'}
                height={'80px'}
                className="rounded-full"
            />
            <div>
                <h1 className="text-bold text-3xl">{userDetails.name}</h1>
                <p className="text-red-600 text-xs">{userDetails.email}</p>
            </div>
            <button onClick={handleClick} className="btn-primary w-3/4">
                Edit profile
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

export default UserProfilePage
