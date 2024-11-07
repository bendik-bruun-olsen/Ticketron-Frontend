import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
}
interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-center text-red-700">
                    <h2 className="text-2xl font-bold">
                        Something went wrong.
                    </h2>
                    <p>
                        {this.state.error?.message ||
                            'An unexpected error occurred.'}
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary
