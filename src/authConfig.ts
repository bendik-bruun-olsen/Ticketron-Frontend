import { LogLevel } from '@azure/msal-browser'

const isDevEnv = process.env.NODE_ENV === 'development'

export const msalConfig = {
    auth: {
        clientId: '4aa092b2-22e7-4cb7-b379-da3a640f27e0',
        authority: 'https://login.microsoftonline.com/organizations',
        redirectUri: isDevEnv
            ? 'http://localhost:5173/auth/callback'
            : 'https://white-cliff-06c7dbb03.5.azurestaticapps.net/3/auth/callback',
    },
    system: isDevEnv
        ? {
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
          }
        : {},
}

export const loginRequest = {
    scopes: ['api://df97ce3a-c8f7-4e2a-9918-fc7c693d3064/user.read'],
}
