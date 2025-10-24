import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

// Components
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import ProjectForm from './pages/ProjectForm.tsx';
import D2Form from './pages/D2Form.tsx';
import ElectricalForm from './pages/ElectricalForm.tsx';
import TermsAndConditions from './pages/TermsAndConditions.tsx';
import Validation from './pages/Validation.tsx';
import ProjectList from './pages/ProjectList.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || 'your-client-id',
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID || 'your-tenant-id'}`,
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

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

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/new" element={<ProjectForm />} />
                <Route path="/projects/:projectNumber" element={<ProjectDetail />} />
                <Route path="/projects/:projectNumber/d2" element={<D2Form />} />
                <Route path="/projects/:projectNumber/electrical" element={<ElectricalForm />} />
                <Route path="/projects/:projectNumber/terms" element={<TermsAndConditions />} />
                <Route path="/projects/:projectNumber/validation" element={<Validation />} />
              </Routes>
            </Layout>
          </Box>
        </Router>
      </ThemeProvider>
    </MsalProvider>
  );
}

export default App;