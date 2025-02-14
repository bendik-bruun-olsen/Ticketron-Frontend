import React from 'react'
import { createRoot } from 'react-dom/client'
import {
    AuthenticationResult,
    EventMessage,
    EventType,
    PublicClientApplication,
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import App from './App'
import { msalConfig } from './authConfig'

export const msalInstance = new PublicClientApplication(msalConfig)

msalInstance.initialize().then(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0])
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult
            const account = payload.account
            msalInstance.setActiveAccount(account)
        }
    })

    const container = document.getElementById('root')

    if (container) {
        const root = createRoot(container)
        root.render(
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        )
    } else {
        console.error('Root element not found!')
    }
})
