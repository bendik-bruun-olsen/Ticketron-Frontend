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
    const [hasAccount, setHasAccount] = useState(false)

    const account = useAccount()

    useEffect(() => {
        const fetchUser = async () => {
            await fetchData('/user').then((data: Array<User>) => {
                const foundAccount = data.find(
                    (user) => user.email === account?.username
                )
                setHasAccount(foundAccount ? true : false)
            })
        }
        fetchUser()
    }, [account])

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    if (!hasAccount) {
        return <Navigate to="/create-user" />
    }

    return <>{children}</>
}

export default ProtectedRoute
