/// <reference types="vite/client" />

import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID,
        authority: import.meta.env.VITE_AZURE_AD_AUTHORITY,
        redirectUri: import.meta.env.BASE_URL + 'auth/callback',
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
    scopes: ['api://df97ce3a-c8f7-4e2a-9918-fc7c693d3064/user.read'],
}
