import React from 'react'
import { useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'

const Logout: React.FC = () => {
    const { instance } = useMsal()
    const navigate = useNavigate()

    const handleLogout = () => {
        instance
            .logoutPopup()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error('Logout failed', error)
            })
    }

    return (
        <>
            <input type="email" id="email" className="input-contained" />
            <button onClick={handleLogout} className="btn-primary">
                Logout
            </button>
        </>
    )
}

export default Logout
