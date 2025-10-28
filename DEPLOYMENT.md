# 🚀 Nieuwe Deployment Guide - Vercel

## ✅ Schone Start

Alle oude Vercel configuratie is verwijderd. Nu kunnen we opnieuw beginnen met een werkende setup.

## 📋 Stap-voor-stap Deployment

### Stap 1: Verwijder oude Vercel project
1. Ga naar [vercel.com](https://vercel.com)
2. Ga naar je dashboard
3. Zoek je oude project
4. Klik op **Settings** → **General** → **Delete Project**

### Stap 2: Maak nieuw Vercel project
1. Klik op **"New Project"**
2. Selecteer je GitHub repository: `Intake-SION`
3. **BELANGRIJK**: Configureer de volgende instellingen:

#### Frontend Project Instellingen:
- **Framework Preset**: `Other` (Node.js)
- **Root Directory**: `client` ⚠️ **Dit is cruciaal!**
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Node.js Version**: `18.x` (of hoger)

### Stap 3: Environment Variables
In Vercel Dashboard > Settings > Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

### Stap 4: Deploy
- Klik op **"Deploy"**
- Wacht tot deployment klaar is
- Je krijgt een URL zoals: `https://intakeformulier-app.vercel.app`

## 🔧 Backend Deployment (apart project)

### Stap 1: Maak tweede Vercel project
1. Maak een nieuw Vercel project
2. Selecteer dezelfde GitHub repository
3. Configureer:
   - **Framework Preset**: `Other`
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Stap 2: Environment Variables
```
NODE_ENV=production
```

### Stap 3: Update Frontend
1. Ga terug naar je frontend project
2. Update Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-name.vercel.app
   ```
3. Redeploy de frontend

## ✅ Waarom dit werkt

- **Node.js deployment** - Je app draait nu als een Node.js server
- **Express server** - Serveert de React build met correcte routing
- **Geen conflicterende configuratie** - Schone start
- **Correcte Root Directory** - Vercel weet waar de Node.js app staat
- **'N' symbool** - Vercel herkent het als een Node.js project

## 🎯 Resultaat

Na deze stappen zou je moeten hebben:
- ✅ Werkende React frontend op Vercel
- ✅ Werkende Node.js backend op Vercel
- ✅ Correcte API communicatie tussen frontend en backend

## 🐛 Troubleshooting

Als je nog steeds problemen hebt:
1. **Controleer Root Directory** - Moet `client` zijn voor frontend
2. **Controleer Node.js versie** - Gebruik 18.x of hoger
3. **Controleer Environment Variables** - Zorg dat ze correct zijn ingesteld
4. **Check build logs** - Kijk naar de deployment logs voor specifieke fouten

## 📝 Volgende stappen

Na succesvolle deployment:
1. Test de frontend URL
2. Test de backend API endpoints
3. Controleer dat frontend en backend communiceren
4. Configureer custom domain (optioneel)