import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  Edit as EditIcon,
  Engineering as EngineeringIcon,
  Calculate as CalculateIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Gavel as GavelIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectData, D2FormData, ElectricalCalculationData } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProjectDetail: React.FC = () => {
  const { projectNumber } = useParams<{ projectNumber: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [d2Form, setD2Form] = useState<D2FormData | null>(null);
  const [electrical, setElectrical] = useState<ElectricalCalculationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (projectNumber) {
      fetchProjectData();
    }
  }, [projectNumber]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/forms/projects/${projectNumber}/forms`);
      const result = await response.json();
      
      if (result.success) {
        setProject(result.data.project);
        setD2Form(result.data.d2Form);
        setElectrical(result.data.electrical);
      } else {
        setError('Fout bij het ophalen van projectgegevens');
      }
    } catch (err) {
      setError('Fout bij het ophalen van projectgegevens');
      console.error('Error fetching project data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'Nieuwe aanleg':
        return 'success';
      case 'Reconstructie':
        return 'warning';
      case 'Sloop/nieuwbouw':
        return 'error';
      case 'Sanering':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Project niet gevonden'}
        </Alert>
        <Button onClick={() => navigate('/projects')}>
          Terug naar Projecten
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {project.projectName}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Projectnummer: {project.projectNumber}
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            <Chip
              label={project.projectType}
              color={getProjectTypeColor(project.projectType) as any}
            />
            <Chip
              label={project.location}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/projects/${projectNumber}/edit`)}
          >
            Bewerken
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="project tabs">
          <Tab icon={<AssignmentIcon />} label="Projectgegevens" />
          <Tab icon={<EngineeringIcon />} label="D2 Formulier" />
          <Tab icon={<CalculateIcon />} label="Elektrisch Berekenen" />
          <Tab icon={<GavelIcon />} label="Algemene Voorwaarden" />
          <Tab icon={<CheckCircleIcon />} label="Validatie" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Projectinformatie
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Projectleider
                    </Typography>
                    <Typography variant="body1">
                      {project.projectLeader}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Locatie
                    </Typography>
                    <Typography variant="body1">
                      {project.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Eigendom grond
                    </Typography>
                    <Typography variant="body1">
                      {project.groundOwnership}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Type project
                    </Typography>
                    <Typography variant="body1">
                      {project.projectType}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Omschrijving werkzaamheden
                </Typography>
                <Typography variant="body1">
                  {project.workDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contactgegevens
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Opdrachtgever/Klant
                    </Typography>
                    <Typography variant="body1">
                      {project.client}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Naam
                    </Typography>
                    <Typography variant="body1">
                      {project.clientName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Contactpersoon
                    </Typography>
                    <Typography variant="body1">
                      {project.contactPerson}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Telefoon
                    </Typography>
                    <Typography variant="body1">
                      {project.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      E-mail
                    </Typography>
                    <Typography variant="body1">
                      {project.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Adres
                    </Typography>
                    <Typography variant="body1">
                      {project.address}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Woningen & Ruimtes
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: 'Appartementen', count: project.apartments, area: project.apartmentsArea },
                    { label: 'Rijtjes-/eengezinswoningen', count: project.rowHouses, area: project.rowHousesArea },
                    { label: 'Twee onder één kap', count: project.twoUnderOneRoof, area: project.twoUnderOneRoofArea },
                    { label: 'Vrijstaande woningen', count: project.detachedHouses, area: project.detachedHousesArea },
                    { label: 'Commerciële ruimtes', count: project.commercialSpaces, area: project.commercialSpacesArea },
                    { label: 'Algemene ruimtes', count: project.generalSpaces, area: project.generalSpacesArea }
                  ].map(({ label, count, area }) => (
                    <Grid item xs={12} sm={6} md={4} key={label}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {count}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {label}
                        </Typography>
                        {area > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {area} m² totaal
                          </Typography>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {d2Form ? (
          <Typography>D2 Formulier gegevens komen hier...</Typography>
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <EngineeringIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                D2 Formulier nog niet ingevuld
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Vul het D2 formulier in om de checklist te voltooien
              </Typography>
              <Button
                variant="contained"
                startIcon={<EngineeringIcon />}
                onClick={() => navigate(`/projects/${projectNumber}/d2`)}
              >
                D2 Formulier Invullen
              </Button>
            </CardContent>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {electrical ? (
          <Typography>Elektrische berekeningen komen hier...</Typography>
        ) : (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <CalculateIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Elektrische berekeningen nog niet gemaakt
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Maak de elektrische berekeningen om het vermogen te bepalen
              </Typography>
              <Button
                variant="contained"
                startIcon={<CalculateIcon />}
                onClick={() => navigate(`/projects/${projectNumber}/electrical`)}
              >
                Elektrisch Berekenen
              </Button>
            </CardContent>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <GavelIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Algemene Voorwaarden
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Bekijk de algemene voorwaarden voor dit project
            </Typography>
            <Button
              variant="contained"
              startIcon={<GavelIcon />}
              onClick={() => navigate(`/projects/${projectNumber}/terms`)}
            >
              Algemene Voorwaarden Bekijken
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Project Validatie
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Controleer alle ingevoerde gegevens op volledigheid en juistheid
            </Typography>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={() => navigate(`/projects/${projectNumber}/validation`)}
            >
              Project Valideren
            </Button>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default ProjectDetail;
