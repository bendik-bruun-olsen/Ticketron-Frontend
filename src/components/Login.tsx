import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { fetchData, postData } from '../utils'
import { User } from './types'

const Login: React.FC = () => {
    const { instance } = useMsal()
    const navigate = useNavigate()

    const handleLoginMicrosoft = async () => {
        instance
            .loginPopup(loginRequest)

            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error('Login failed', error)
            })
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center pb-10 pt-10">
                Welcome back!
            </h2>
            <button
                onClick={handleLoginMicrosoft}
                className="btn-primary w-full"
            >
                Login with microsoft
            </button>
        </div>
    )
}

export default Login
