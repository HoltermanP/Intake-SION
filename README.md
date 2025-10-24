# Intakeformulier App

Een moderne webapplicatie ter vervanging van het Excel intakeformulier voor D2N projecten.

## 🚀 Features

- **Project Management**: Volledig projectbeheer met CRUD operaties
- **D2 Formulier**: Digitale D2N checklist met automatische data transfer
- **Elektrische Berekeningen**: Geavanceerde berekeningen voor energievoorziening
- **Algemene Voorwaarden**: Statische pagina met voorwaarden
- **Validatie**: Projectdata validatie en controle
- **Responsive Design**: Werkt op alle apparaten

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- React Hook Form
- React Router

### Backend
- Node.js
- Express
- TypeScript
- SharePoint REST API (gepland)

## 📦 Installatie

### Vereisten
- Node.js 18+
- npm

### Lokale ontwikkeling

1. **Clone de repository**
```bash
git clone <repository-url>
cd intakeformulier-app
```

2. **Installeer dependencies**
```bash
# Root dependencies
npm install

# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

3. **Start de applicatie**
```bash
# Terminal 1: Backend server
cd server
npm run dev

# Terminal 2: Frontend client
cd client
npm start
```

4. **Open de applicatie**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 🏗️ Project Structuur

```
intakeformulier-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Server entry point
│   └── package.json
└── package.json           # Root package.json
```

## 🔧 API Endpoints

### Projecten
- `GET /api/forms/projects` - Alle projecten ophalen
- `GET /api/forms/projects/:projectNumber` - Specifiek project ophalen
- `POST /api/forms/projects` - Nieuw project aanmaken
- `PUT /api/forms/projects/:projectNumber` - Project bijwerken

### D2 Formulier
- `GET /api/forms/d2/:projectNumber` - D2 formulier ophalen
- `POST /api/forms/d2` - D2 formulier opslaan

### Elektrische Berekeningen
- `GET /api/forms/electrical/:projectNumber` - Elektrische data ophalen
- `POST /api/forms/electrical` - Elektrische berekeningen opslaan

## 🚀 Deployment

### Vercel (Aanbevolen)

1. **Push naar GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy op Vercel**
- Ga naar [vercel.com](https://vercel.com)
- Import project vanuit GitHub
- Configureer build settings:
  - **Root Directory**: `client`
  - **Build Command**: `npm run build`
  - **Output Directory**: `build`

3. **Backend deployment**
- Gebruik Vercel Functions of een andere service
- Configureer environment variables

## 🔐 Environment Variables

### Backend
```env
PORT=5001
NODE_ENV=production
```

### Frontend
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## 📝 Development

### Scripts
```bash
# Root level
npm run dev          # Start both frontend and backend
npm run build        # Build both applications

# Backend only
cd server
npm run dev          # Start backend in development mode
npm run build        # Build backend
npm start            # Start backend in production mode

# Frontend only
cd client
npm start            # Start frontend in development mode
npm run build        # Build frontend for production
```

## 🤝 Contributing

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 License

Dit project is gelicenseerd onder de MIT License.

## 📞 Support

Voor vragen of ondersteuning, neem contact op via:
- Email: support@example.com
- GitHub Issues: [Issues](https://github.com/your-username/intakeformulier-app/issues)
