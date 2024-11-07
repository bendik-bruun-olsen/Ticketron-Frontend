import React, { Component, ErrorInfo, ReactNode } from 'react'
import ErrorComponent from './ErrorComponent'

interface ErrorBoundaryProps {
    children: ReactNode
}
interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorCode: number
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null, errorCode: 500 }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        const errorCode = (error as any).code || 500
        return { hasError: true, error, errorCode }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return (
                <ErrorComponent
                    errorCode={this.state.errorCode}
                    errorMessage={
                        this.state.error?.message || 'Something went wrong'
                    }
                />
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary
