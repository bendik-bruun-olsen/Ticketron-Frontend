// App.tsx
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'
import Navbar from './components/Navbar'

const App: React.FC = () => {
    const env = import.meta.env.MODE as string
    const clientId = import.meta.env.VITE_AZURE_AD_CLIENT_ID as string

    console.log('clientId from App.tsx: ', clientId)
    console.log('env-mode: ', env)

    return <RouterProvider router={router} />
}

export default App
