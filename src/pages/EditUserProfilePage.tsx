import React, { useEffect, useState } from 'react'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'
import Snackbar from '../components/Snackbar'
import { fetchData, putData, uploadImage } from '../utils'
import { useMsal } from '@azure/msal-react'

const EditUserProfilePage: React.FC = () => {
    const navigate = useNavigate()
    const { instance, accounts } = useMsal()
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phonenumber: '',
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
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    useEffect(() => {
        const getUserData = async () => {
            const userId = accounts[0]?.localAccountId
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
                const { name, email, phone } = userData

                setUserDetails({
                    name: name || '',
                    email: email || '',
                    phonenumber: phone || '',
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
    }, [])
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfileImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }
    const handleSaveDetails = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const { name, phonenumber } = form.elements as any
        let uploadedImageUrl: string | undefined
        if (profileImage) {
            uploadedImageUrl = await uploadImage(profileImage)
            if (!uploadedImageUrl) {
                setSnackbar({
                    message: 'Failed to upload profile image.',
                    type: 'error',
                    visible: true,
                })
                return
            }
        }
        const body = {
            name: name.value,
            phone: phonenumber.value,
        }
        if (profileImage) {
            body['imageUrl'] = uploadedImageUrl
        }
        try {
            await putData(`/User/update`, body)
            setSnackbar({
                message: 'Details saved successfully!',
                type: 'success',
                visible: true,
            })
            navigate(Paths.USER_PROFILE)
        } catch (error) {
            console.error('Error saving user details:', error)
            setSnackbar({
                message: 'Failed to save details. Please try again.',
                type: 'error',
                visible: true,
            })
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, visible: false }))
    }

    return (
        <div className="p-4 flex flex-col gap-9 mt-10">
            <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSaveDetails}
            >
                <div className="flex flex-col items-center">
                    <img
                        src={previewImage || 'https://placehold.co/100x100'}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                    />
                    <label className="btn-secondary">
                        Upload Profile Image
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <input
                    required
                    className="input-contained"
                    name="name"
                    placeholder="Name"
                    value={userDetails.name}
                    onChange={(e) =>
                        setUserDetails((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
                <input
                    className="input-contained"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    disabled
                />
                <input
                    type="number"
                    className="input-contained"
                    name="phonenumber"
                    placeholder="Phonenumber"
                    value={userDetails.phonenumber}
                    onChange={(e) =>
                        setUserDetails((prev) => ({
                            ...prev,
                            phonenumber: e.target.value,
                        }))
                    }
                />
                <button className="btn-primary" type="submit">
                    Save details
                </button>
            </form>

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

export default EditUserProfilePage
