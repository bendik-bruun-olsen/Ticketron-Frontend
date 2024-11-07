import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '../routes'
import ErrorBoundary from './components/Error/ErrorBoundary'

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    )
}

export default App
