'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import Layout from '../src/components/Layout';

// MSAL configuration - only initialize on client side
let msalInstance: PublicClientApplication | null = null;

if (typeof window !== 'undefined') {
  const msalConfig = {
    auth: {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || 'your-client-id',
      authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID || 'your-tenant-id'}`,
      redirectUri: window.location.origin
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false
    }
  };
  msalInstance = new PublicClientApplication(msalConfig);
}

// Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MsalProvider instance={msalInstance!}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              <Layout>
                {children}
              </Layout>
            </Box>
          </ThemeProvider>
        </MsalProvider>
      </body>
    </html>
  );
}
