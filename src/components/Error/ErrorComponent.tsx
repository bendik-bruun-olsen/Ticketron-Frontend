import React from 'react'

interface ErrorComponentProps {
    errorCode: number
    errorMessage: string
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
    errorCode,
    errorMessage,
}) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-current">
            <h1 className="text-6xl font-bold text-red-700">{errorCode}</h1>
            <p className="mt-4 text-gray-500">{errorMessage}</p>
            <p className="mt-4 text-gray-500">Please try again later</p>
        </div>
    )
}
export default ErrorComponent
