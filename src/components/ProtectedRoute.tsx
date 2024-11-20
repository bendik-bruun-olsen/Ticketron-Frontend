// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react'
import { useAccount, useIsAuthenticated } from '@azure/msal-react'
import { Navigate } from 'react-router-dom'
import { fetchData } from '../utils'
import { User } from './types'

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
