import React, { useState } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Snackbar from '../components/Snackbar'

const LoginPage: React.FC = () => {
    const isAuthenticated = useIsAuthenticated()
    const [snackbar, setSnackbar] = useState<{
        message: string
        type: 'success' | 'error' | 'info'
        visible: boolean
    }>({
        message: '',
        type: 'info',
        visible: false,
    })
    const showSnackbar = (
        message: string,
        type: 'success' | 'error' | 'info'
    ) => {
        setSnackbar({ message, type, visible: true })
        setTimeout(() => setSnackbar({ ...snackbar, visible: false }), 3000)
    }

    if (isAuthenticated) {
        showSnackbar('Login successful', 'success')
        return <Navigate to="/" />
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Login />
            {snackbar.visible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({ ...snackbar, visible: false })}
                />
            )}
        </div>
    )
}

export default LoginPage
