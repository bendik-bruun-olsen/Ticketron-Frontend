// App.tsx
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'
import Navbar from './components/Navbar'

const App: React.FC = () => {
    const env_location = import.meta.env.VITE_ENV

    console.log('env_location: ', env_location)

    return <RouterProvider router={router} />
}

export default App
