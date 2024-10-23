/// <reference types="vite/client" />
export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_AZURE_AD_TENANT_ID
    }`,
    redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI,
  },
};

export const loginRequest = {
  scopes: ["user.read"],
  prompt: "select_account",
};
