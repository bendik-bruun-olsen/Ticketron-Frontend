import { useMsal } from '@azure/msal-react'
import { loginRequest } from './authConfig'
import { msalInstance } from './main'

export interface ApiConfig {
    url: string
}

//EXAMPLE USE:
//const Id = 1
//const url = `/Booking/${Id}`
//const data = await fetchData(url)
//console.log(data)

export const fetchData = async (url: string) => {
    const account = msalInstance.getActiveAccount()
    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }
    const targetUrl = `${import.meta.env.VITE_API_URL}${url}`
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    })
    const token = `Bearer ${response.accessToken}`

    const options = {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }

    return fetch(targetUrl, options)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

//EXAMPLE USE:
//const body = { title: 'Trip to Paris', startDate: '2023-06-10', endDate: '2023-06-12', userId: 1}
//const id = await postData('/Booking/create', body)
//console.log(id) -> This will get the id of the created booking
export const postData = async (
    url: string,
    body: Record<string, string | number | undefined>
) => {
    const account = msalInstance.getActiveAccount()
    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }
    const targetUrl = `${import.meta.env.VITE_API_URL}${url}`
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    })
    const token = `Bearer ${response.accessToken}`

    const options = {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }

    return fetch(targetUrl, options)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
