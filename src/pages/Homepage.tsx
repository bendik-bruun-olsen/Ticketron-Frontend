import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { BookingCard } from '../components/BookingCard'
import BookingsList from '../components/BookingsList'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import Logout from '../components/Logout'

const BookingDummy = {
    imageUrl: 'https://placehold.co/173x173',
    title: 'Trip to Paris',
    fromDate: 'June 10, 2023',
    toDate: 'June 12, 2023',
    participants: 1,
    id: '1',
}

const bookings = [
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '1',
    },
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '1',
    },
    {
        imageUrl: 'https://placehold.co/173x173',
        title: 'Trip to Paris',
        fromDate: 'June 10, 2023',
        toDate: 'June 12, 2023',
        participants: 1,
        id: '1',
    },
]

interface ApiConfig {
    method: 'get' | 'post' | 'put' | 'delete'
    url: string
    headers?: Record<string, string>
}

const HomePage: React.FC = () => {
    const [data, setData] = useState({})
    const { instance, accounts } = useMsal()
    const isAuthenticated = accounts.length > 0
    let apiConfig = {} as ApiConfig

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Handling form submission')

        const Id = e.currentTarget.search.value
        if (Id) {
            apiConfig = {
                method: 'get',
                url: `https://ticketron-web-cbbednduhza8hwgt.northeurope-01.azurewebsites.net/api/Booking/${Id}`,
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

            const response = await fetch(apiConfig.url, {
                method: apiConfig.method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                console.log('No response from API :(')
                return
            }
            setData(response)
        } catch (error) {
            console.log('Error fetching data: ', error)
        }
    }

    return (
        <div className="p-4 flex flex-col gap-10">
            <h1 className="text-2xl font-bold">Welcome back, User!</h1>
            <Logout />
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" />
                <button type="submit">Submit</button>
            </form>
            <BookingsList bookings={bookings} />
        </div>
    )
}

export default HomePage
