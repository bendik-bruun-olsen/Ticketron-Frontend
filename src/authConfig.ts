/// <reference types="vite/client" />

import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
    auth: {
        // clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID,
        clientId: 'c25154b0-eb29-4136-a072-08b3bb41e3de',
        // authority: import.meta.env.VITE_AZURE_AD_AUTHORITY,
        authority:
            'https://login.microsoftonline.com/6f734ef6-d94c-4140-bacf-6bf10c7abe86',
        redirectUri: 'https://localhost:5173/auth/callback',
    },
    system: {
        loggerOptions: {
            loggerCallback: (
                level: LogLevel,
                message: string,
                containsPii: boolean
            ) => {
                if (containsPii) {
                    return
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message)
                        return
                    case LogLevel.Info:
                        console.info(message)
                        return
                    case LogLevel.Verbose:
                        console.debug(message)
                        return
                    case LogLevel.Warning:
                        console.warn(message)
                        return
                    default:
                        return
                }
            },
        },
    },
}

export const loginRequest = {
    scopes: ['api://49be23aa-eb3c-48e8-b7aa-8aa96d3688c3/user.read'],
}
