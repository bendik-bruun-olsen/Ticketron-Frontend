// App.tsx
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'
import Navbar from './components/Navbar'

const App: React.FC = () => {
    const env = import.meta.env.MODE
    const env_loc = import.meta.env.VITE_ENV_NAME
    const base_url = import.meta.env.VITE_BASE_URL
    const clientId = import.meta.env.VITE_AZURE_AD_CLIENT_ID
    const test = import.meta.env.VITE_TEST

    setTimeout(() => {
        console.log('clientId with delay: ', clientId)
    }, 1000)

    console.log('clientId: ', clientId)
    console.log('env_loc: ', env_loc)
    console.log('env-mode: ', env)
    console.log('base_url: ', base_url)
    console.log('test: ', test)

    return <RouterProvider router={router} />
}

export default App
