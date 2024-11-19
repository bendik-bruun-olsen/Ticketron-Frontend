import React from 'react'

type SnackbarProps = {
    message: string
    type?: 'success' | 'error' | 'info'
    onClose: () => void
}

const Snackbar: React.FC<SnackbarProps> = ({
    message,
    type = 'info',
    onClose,
}) => {
    const backgroundColors = {
        success: 'bg-green-400 text-white',
        error: 'bg-red-900 text-white',
        info: 'bg-blue-700 text-white',
    }

    return (
        <div
            className={`fixed bottom-4 left-2 w-72 p-4 rounded-lg shadow-md flex items-center justify-between animate-slide-up ${backgroundColors[type]}`}
        >
            <span className="flex-1 text-sm">{message}</span>
            <button
                onClick={onClose}
                className="ml-4 bg-white text-red-700 rounded-full p-1 hover:bg-red-200 focus:outline-none"
            >
                ✕
            </button>
        </div>
    )
}

export default Snackbar
