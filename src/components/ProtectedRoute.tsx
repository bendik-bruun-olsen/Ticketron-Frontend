// components/ProtectedRoute.tsx
import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useIsAuthenticated()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}

export default ProtectedRoute
