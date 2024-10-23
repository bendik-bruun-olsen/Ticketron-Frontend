// index.tsx or main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
} else {
  console.error("Root element not found!");
}
