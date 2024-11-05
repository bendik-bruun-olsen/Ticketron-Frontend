/// <reference types="vite/client" />

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID,
        authority: import.meta.env.VITE_AZURE_AD_AUTHORITY,
        redirectUri: '/auth/callback',
    },
}

export const loginRequest = {
    scopes: ['api://49be23aa-eb3c-48e8-b7aa-8aa96d3688c3/user.read'],
}
