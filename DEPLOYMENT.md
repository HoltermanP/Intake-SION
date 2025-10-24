# 🚀 Deployment Guide - Vercel

## Frontend Deployment (React App)

### Stap 1: Vercel Project Maken
1. Ga naar [vercel.com](https://vercel.com)
2. Klik op "New Project"
3. Import je GitHub repository: `intakeformulier-app`
4. Configureer:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Stap 2: Environment Variables
In Vercel Dashboard > Settings > Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

### Stap 3: Deploy
- Klik op "Deploy"
- Wacht tot deployment klaar is
- Je krijgt een URL zoals: `https://intakeformulier-app.vercel.app`

## Backend Deployment (Node.js API)

### Stap 1: Aparte Vercel Project
1. Maak een nieuw Vercel project
2. Selecteer dezelfde GitHub repository
3. Configureer:
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` (of laat leeg)

### Stap 2: Environment Variables
```
NODE_ENV=production
```

### Stap 3: Deploy Backend
- Deploy de backend
- Noteer de URL: `https://your-backend-name.vercel.app`

### Stap 4: Update Frontend
1. Ga terug naar je frontend project
2. Update Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-name.vercel.app
   ```
3. Redeploy de frontend

## 🔧 Alternative: Single Repository Deployment

Als je alles in één project wilt:

### Option 1: Frontend + Backend Functions
1. Deploy frontend als hoofdproject
2. Backend als Vercel Functions in `/api` folder
3. Move server code naar `client/api/`

### Option 2: Monorepo Setup
1. Configure Vercel voor monorepo
2. Set build commands voor beide apps
3. Deploy als separate services

## 📝 Post-Deployment Checklist

- [ ] Frontend accessible via Vercel URL
- [ ] Backend API responding
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Database/SharePoint integration (future)
- [ ] SSL certificates working
- [ ] Custom domain (optional)

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Errors**: Configure CORS in backend
2. **API Not Found**: Check environment variables
3. **Build Failures**: Check Node.js version
4. **Environment Variables**: Ensure they're set in Vercel

### Debug Commands:
```bash
# Check build locally
cd client && npm run build
cd server && npm run build

# Test API locally
curl http://localhost:5001/api/forms/projects
```

## 🔄 Updates

Na code changes:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically redeploys on push to main branch.
