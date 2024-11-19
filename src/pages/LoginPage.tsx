import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { Navigate } from 'react-router-dom'
import Login from '../components/Login'

const LoginPage: React.FC = () => {
    const isAuthenticated = useIsAuthenticated()

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Login />
}

export default LoginPage
