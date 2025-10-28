'use client';

import React, { useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

interface MSALWrapperProps {
  children: React.ReactNode;
}

export default function MSALWrapper({ children }: MSALWrapperProps) {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);

  useEffect(() => {
    // Only initialize MSAL on client side
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
    
    const instance = new PublicClientApplication(msalConfig);
    setMsalInstance(instance);
  }, []);

  // Don't render MSAL provider until instance is ready
  if (!msalInstance) {
    return <>{children}</>;
  }

  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
}
