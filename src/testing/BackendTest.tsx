import React, { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import Logout from '../components/Logout'
import Login from '../components/Login'

interface ApiConfig {
    method: 'get' | 'post' | 'put' | 'delete'
    url: string
    headers?: Record<string, string>
}

const BackendTest: React.FC = () => {
    const [data, setData] = useState({})
    const { instance, accounts } = useMsal()
    const [isAuthenticated, setIsAuthenticated] = useState(accounts.length > 0)
    let apiConfig = {} as ApiConfig

    useEffect(() => {
        setIsAuthenticated(() => {
            const isAuth = accounts.length > 0
            console.log('isAuthenticated:', isAuth)
            return isAuth
        })
    }, [accounts])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Handling form submission')

        const Id = e.currentTarget.search.value
        if (Id) {
            apiConfig = {
                method: 'get',
                url: `${import.meta.env.VITE_API_URL}/Booking/${Id}`,
            }

            console.log('Fetching data in handleSubmit')
            fetchData(apiConfig)
        } else {
            console.log('Error in handleSubmit')
        }
    }

    const acquireToken = async () => {
        const request = { ...loginRequest, account: accounts[0] }
        const response = await instance.acquireTokenSilent(request)

        return response.accessToken
    }

    const fetchData = async (apiConfig: ApiConfig) => {
        const readyToFetch = apiConfig && isAuthenticated
        if (!readyToFetch) return

        try {
            const token = await acquireToken()
            if (token) console.log('Token acquired: ', token)

            console.log('Modifying apiConfig: ', apiConfig)

            const configWithToken = {
                ...apiConfig,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            console.log('Fetching data with modified config: ', configWithToken)

            const apiResponse = await fetch(apiConfig.url, {
                method: apiConfig.method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!apiResponse.ok) {
                console.log('No response from API :(')
                return
            }
            setData(await apiResponse.json())
        } catch (error) {
            console.log('Error fetching data: ', error)
        }
    }

    useEffect(() => {
        console.log('Data: ', data)
    }, [data])

    return (
        <>
            {isAuthenticated ? <Logout /> : <Login />}
            {isAuthenticated && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search" />
                    <button type="submit">Submit</button>
                </form>
            )}
        </>
    )
}

export default BackendTest
