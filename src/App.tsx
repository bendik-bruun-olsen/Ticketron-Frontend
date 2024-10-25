// App.tsx
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'
import Navbar from './components/Navbar'

const App: React.FC = () => {
    return <RouterProvider router={router} />
}

export default App
