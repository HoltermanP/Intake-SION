import { Router, Request, Response } from 'express';
import axios from 'axios';
import { ApiResponse, SharePointListItem } from '../types';

const router = Router();

// SharePoint configuration
const SHAREPOINT_SITE_URL = process.env.SHAREPOINT_SITE_URL;
const SHAREPOINT_LIST_ID = process.env.SHAREPOINT_LIST_ID;

// Helper function to get SharePoint access token
async function getSharePointToken(userToken: string): Promise<string> {
  // In a real implementation, you would exchange the user token for a SharePoint token
  // For now, we'll return the user token (this is a simplified approach)
  return userToken;
}

// Helper function to make SharePoint API calls
async function makeSharePointRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  userToken: string,
  data?: any
) {
  const token = await getSharePointToken(userToken);
  
  const config = {
    method,
    url: `${SHAREPOINT_SITE_URL}/_api/web/lists('${SHAREPOINT_LIST_ID}')${endpoint}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose'
    },
    data
  };

  return axios(config);
}

// Get all items from SharePoint list
router.get('/items', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const userToken = authHeader.substring(7);
    const response = await makeSharePointRequest('/items', 'GET', userToken);
    
    res.json({
      success: true,
      data: response.data.d.results
    } as ApiResponse<SharePointListItem[]>);
  } catch (error) {
    console.error('SharePoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch SharePoint items'
    } as ApiResponse<never>);
  }
});

// Get specific item by ID
router.get('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const userToken = authHeader.substring(7);
    const response = await makeSharePointRequest(`/items(${id})`, 'GET', userToken);
    
    res.json({
      success: true,
      data: response.data.d
    } as ApiResponse<SharePointListItem>);
  } catch (error) {
    console.error('SharePoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch SharePoint item'
    } as ApiResponse<never>);
  }
});

// Create new item in SharePoint list
router.post('/items', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const userToken = authHeader.substring(7);
    const itemData = req.body;
    
    const response = await makeSharePointRequest('/items', 'POST', userToken, {
      __metadata: {
        type: 'SP.Data.ProjectsListItem'
      },
      ...itemData
    });
    
    res.status(201).json({
      success: true,
      data: response.data.d,
      message: 'Item created successfully'
    } as ApiResponse<SharePointListItem>);
  } catch (error) {
    console.error('SharePoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create SharePoint item'
    } as ApiResponse<never>);
  }
});

// Update item in SharePoint list
router.put('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const userToken = authHeader.substring(7);
    const itemData = req.body;
    
    const response = await makeSharePointRequest(`/items(${id})`, 'PATCH', userToken, {
      __metadata: {
        type: 'SP.Data.ProjectsListItem'
      },
      ...itemData
    });
    
    res.json({
      success: true,
      data: response.data.d,
      message: 'Item updated successfully'
    } as ApiResponse<SharePointListItem>);
  } catch (error) {
    console.error('SharePoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update SharePoint item'
    } as ApiResponse<never>);
  }
});

// Delete item from SharePoint list
router.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const userToken = authHeader.substring(7);
    
    await makeSharePointRequest(`/items(${id})`, 'DELETE', userToken);
    
    res.json({
      success: true,
      message: 'Item deleted successfully'
    } as ApiResponse<never>);
  } catch (error) {
    console.error('SharePoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete SharePoint item'
    } as ApiResponse<never>);
  }
});

// Search items
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, filter } = req.query;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header required'
      } as ApiResponse<never>);
    }

    const userToken = authHeader.substring(7);
    
    let endpoint = '/items';
    if (q || filter) {
      const queryParams = [];
      if (q) queryParams.push(`$filter=substringof('${q}',Title)`);
      if (filter) queryParams.push(`$filter=${filter}`);
      endpoint += `?${queryParams.join('&')}`;
    }
    
    const response = await makeSharePointRequest(endpoint, 'GET', userToken);
    
    res.json({
      success: true,
      data: response.data.d.results
    } as ApiResponse<SharePointListItem[]>);
  } catch (error) {
    console.error('SharePoint search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search SharePoint items'
    } as ApiResponse<never>);
  }
});

export { router as sharepointRoutes };
