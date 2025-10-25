# 🚀 Deployment Guide - Vercel

## Frontend Deployment (React App)

### Stap 1: Vercel Project Maken voor Frontend
1. Ga naar [vercel.com](https://vercel.com)
2. Klik op "New Project"
3. Import je GitHub repository: `intakeformulier-app`
4. **BELANGRIJK**: Configureer de volgende instellingen:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client` ⚠️ **Dit is cruciaal!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
   - **Node.js Version**: 18.x (of hoger)

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

### Stap 1: Aparte Vercel Project voor Backend
1. Maak een nieuw Vercel project
2. Selecteer dezelfde GitHub repository
3. Configureer:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` (of laat leeg)
   - **Install Command**: `npm install`

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
1. **"react-scripts: command not found"**: 
   - ✅ **Oplossing**: Zorg dat Root Directory = `client` in Vercel
   - ✅ **Oplossing**: Controleer dat Node.js versie 18+ is
   - ✅ **Oplossing**: Verwijder en herinstalleer dependencies
2. **CORS Errors**: Configure CORS in backend
3. **API Not Found**: Check environment variables
4. **Build Failures**: Check Node.js version
5. **Environment Variables**: Ensure they're set in Vercel
6. **Monorepo Issues**: 
   - ✅ **Oplossing**: Gebruik aparte Vercel projecten voor frontend/backend
   - ✅ **Oplossing**: Zet Root Directory correct in elk project

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
