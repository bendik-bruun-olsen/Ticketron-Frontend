import React from 'react'
import { Paths } from '../../paths'
import { useNavigate } from 'react-router-dom'

const EditUserProfilePage: React.FC = () => {
    const navigate = useNavigate()

    const handleSaveDetails = (e: React.FormEvent) => {
        e.preventDefault()
        const { name, email, phonenumber } = e.target as HTMLFormElement
        navigate(Paths.USER_PROFILE)
    }

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault()
        const { password, confirmPassword } = e.target as HTMLFormElement
        navigate(Paths.USER_PROFILE)
    }

    return (
        <div className="p-4 flex flex-col gap-9 mt-10">
            <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSaveDetails}
            >
                <input
                    required
                    className="input-contained"
                    name="name"
                    placeholder="Name"
                />
                <input
                    required
                    className="input-contained"
                    name="email"
                    placeholder="Email"
                />
                <input
                    required
                    type="number"
                    className="input-contained"
                    name="phonenumber"
                    placeholder="Phonenumber"
                />
                <button className="btn-primary" type="submit">
                    Save details
                </button>
            </form>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg">Update password</h3>
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={handleUpdatePassword}
                >
                    <input
                        required
                        className="input-contained"
                        name="password"
                        placeholder="Password"
                        type="password"
                    />
                    <input
                        required
                        className="input-contained"
                        name="confirmPassword"
                        placeholder="Repeat password"
                        type="password"
                    />
                    <button className="btn-primary" type="submit">
                        Update password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditUserProfilePage
