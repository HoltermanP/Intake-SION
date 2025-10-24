import { Router, Request, Response } from 'express';
// import { ConfidentialClientApplication } from '@azure/msal-node';
import { ApiResponse, AuthToken } from '../types';

const router = Router();

// Azure AD configuration - temporarily disabled for development
// const msalConfig = {
//   auth: {
//     clientId: process.env.CLIENT_ID!,
//     clientSecret: process.env.CLIENT_SECRET!,
//     authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`
//   }
// };

// const cca = new ConfidentialClientApplication(msalConfig);

// Get authorization URL - temporarily disabled
router.get('/login', async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: { authUrl: 'http://localhost:3000' }
  } as ApiResponse<{ authUrl: string }>);
});

// Handle callback and get tokens - temporarily disabled
router.post('/callback', async (req: Request, res: Response) => {
  const authToken: AuthToken = {
    accessToken: 'mock-token',
    expiresIn: 3600
  };

  res.json({
    success: true,
    data: authToken
  } as ApiResponse<AuthToken>);
});

// Get user profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const token = authHeader.substring(7);
    
    // In a real implementation, you would validate the token and get user info
    // For now, we'll return a mock response
    res.json({
      success: true,
      data: {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        roles: ['user']
      }
    } as ApiResponse<any>);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile'
    } as ApiResponse<never>);
  }
});

export { router as authRoutes };
