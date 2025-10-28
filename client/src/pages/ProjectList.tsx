'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ProjectData } from '../types';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/forms/projects`,
};

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.PROJECTS);
      const result = await response.json();
      
      if (result.success) {
        setProjects(result.data || []);
      } else {
        setError('Fout bij het ophalen van projecten');
      }
    } catch (err) {
      setError('Fout bij het ophalen van projecten');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Projecten Overzicht
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/projects/new')}
        >
          Nieuw Project
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Zoek projecten..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchTerm ? 'Geen projecten gevonden' : 'Nog geen projecten'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchTerm 
                ? 'Probeer een andere zoekterm' 
                : 'Start met het maken van je eerste project'
              }
            </Typography>
            {!searchTerm && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => router.push('/projects/new')}
              >
                Eerste Project Maken
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Projectnummer</TableCell>
                <TableCell>Projectnaam</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Locatie</TableCell>
                <TableCell>Projectleider</TableCell>
                <TableCell>Acties</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.projectNumber} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {project.projectNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {project.projectName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={project.projectType}
                      color={getProjectTypeColor(project.projectType) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {project.location}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {project.projectLeader}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/projects/${project.projectNumber}`)}
                      title="Bekijken"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/projects/${project.projectNumber}/edit`)}
                      title="Bewerken"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      title="Verwijderen"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {filteredProjects.length > 0 && (
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 'en' : ''} gevonden
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectList;
