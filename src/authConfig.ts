/// <reference types="vite/client" />

import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
    // auth: {
    //     clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID,
    //     clientId: 'bba522b8-6c6e-46a1-b557-753cbfb7ae8b',
    //     authority: import.meta.env.VITE_AZURE_AD_AUTHORITY,
    //     authority: 'https://ticketrontestingb2c.b2clogin.com/ticketrontestingb2c.onmicrosoft.com/B2C_1_signupsignintest1',
    //     authority: 'https://login.microsoftonline.com/organizations',
    //     redirectUri: import.meta.env.BASE_URL + 'auth/callback',
    //     redirectUri:
    //         'https://white-cliff-06c7dbb03-development.westeurope.5.azurestaticapps.net/auth/callback',
    // },
    auth: {
        clientId: '022c740d-bfb5-4a4e-a3ec-75a52838db97',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri:
            ' https://white-cliff-06c7dbb03-development.westeurope.5.azurestaticapps.net/auth/callback',
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
