import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const Login: React.FC = () => {
    const { instance } = useMsal()
    const navigate = useNavigate()

    const handleLogin = () => {
        instance
            .loginPopup(loginRequest)
            .then(() => {
                navigate('/home')
            })
            .catch((error) => {
                console.error('Login failed', error)
            })
    }

    return (
        <div>
            <h2 className="text-3xl font-bold underline">Login Page</h2>
            <input type="email" id="email" className="input" />
            <button onClick={handleLogin} className="btn-primary w-3/4">
                Login
            </button>
        </div>
    )
}

export default Login
