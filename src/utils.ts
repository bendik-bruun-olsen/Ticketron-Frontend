import { useMsal } from '@azure/msal-react'
import { loginRequest } from './authConfig'
import { msalInstance } from './main'

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const BASE_URL = 'https://api.pexels.com/v1/search'

export interface ApiConfig {
    url: string
}

//EXAMPLE USE:
//const Id = 1
//const url = `/Booking/${Id}`
//const data = await fetchData(url)
//console.log(data)

export const fetchData = async (url: string) => {
    try {
        const account = msalInstance.getActiveAccount()
        if (!account) {
            throw Error(
                'No active account! Verify a user has been signed in and setActiveAccount has been called.'
            )
        }
        const targetUrl = `${import.meta.env.VITE_API_URL}${url}`
        console.log(targetUrl)
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

        const result = await fetch(targetUrl, options)
        return await result.json()
    } catch (error) {
        console.log(error)
    }
}

//EXAMPLE USE:
//const body = { title: 'Trip to Paris', startDate: '2023-06-10', endDate: '2023-06-12', userId: 1}
//const id = await postData('/Booking/create', body)
//console.log(id) -> This will get the id of the created booking
export const postData = async (
    url: string,
    body: Record<string, string | number | undefined | boolean | Array<string>>
) => {
    try {
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

        const result = await fetch(targetUrl, options)
        return await result.json()
    } catch (error) {
        console.log(error)
    }
}

export const putData = async (
    url: string,
    body: Record<string, string | number | undefined | Date>
) => {
    try {
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
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        const result = await fetch(targetUrl, options)
        return await result.json()
    } catch (error) {
        console.log(error)
    }
}

export const getPicture = async (
    query: string
): Promise<string | undefined> => {
    try {
        if (!API_KEY) {
            console.error('API key not found!')
            return
        }
        const params: URLSearchParams = new URLSearchParams({
            query,
            per_page: '1',
        })
        const requestURL = new URL(`${BASE_URL}?${params.toString()}`)
        const options = {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
            },
        }
        const photos = await fetch(requestURL, options)
            .then((response) => response.json())
            .catch((error) => console.log(error))

        return photos.photos[0]?.src.medium
    } catch (error) {
        console.log(error)
    }
}
