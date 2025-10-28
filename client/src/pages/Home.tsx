'use client';
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Engineering as EngineeringIcon,
  Calculate as CalculateIcon,
  List as ListIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();

  const features = [
    {
      title: 'Projectformulier',
      description: 'Vul projectgegevens in met automatische validatie',
      icon: <AssignmentIcon />,
      path: '/projects/new',
      color: '#1976d2'
    },
    {
      title: 'D2 Formulier',
      description: 'D2N checklist met automatische data overname',
      icon: <EngineeringIcon />,
      path: '/d2',
      color: '#dc004e'
    },
    {
      title: 'Elektrisch Berekenen',
      description: 'Bereken elektrisch vermogen automatisch',
      icon: <CalculateIcon />,
      path: '/electrical',
      color: '#2e7d32'
    },
    {
      title: 'Projecten Overzicht',
      description: 'Bekijk en beheer alle projecten',
      icon: <ListIcon />,
      path: '/projects',
      color: '#ed6c02'
    }
  ];

  const benefits = [
    'Automatische data validatie en berekeningen',
    'Integratie met SharePoint voor data opslag',
    'Moderne, gebruiksvriendelijke interface',
    'Mobiel-vriendelijk design',
    'Real-time samenwerking mogelijk',
    'Automatische backup en versiebeheer'
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welkom bij de Intakeformulier App
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Moderne web applicatie ter vervanging van Excel formulieren
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
          Deze applicatie vervangt de Excel intakeformulieren en biedt automatische data opslag in SharePoint.
        </Typography>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Functionaliteiten
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: feature.color, mb: 2 }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => router.push(feature.path)}
                  sx={{ 
                    backgroundColor: feature.color,
                    '&:hover': {
                      backgroundColor: feature.color,
                      opacity: 0.9
                    }
                  }}
                >
                  Openen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Voordelen van de App
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Hoe te gebruiken
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="1. Start een nieuw project"
                    secondary="Klik op 'Nieuw Project' om te beginnen"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="2. Vul de gegevens in"
                    secondary="Alle formulieren hebben automatische validatie"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="3. Data wordt automatisch opgeslagen"
                    secondary="In SharePoint voor veilige opslag en samenwerking"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
