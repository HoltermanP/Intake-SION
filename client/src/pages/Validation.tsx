'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Grid,
  Chip,
  Alert,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useParams } from 'next/navigation';

interface ValidationResult {
  field: string;
  status: 'valid' | 'warning' | 'error';
  message: string;
  category: string;
}

interface ValidationSummary {
  total: number;
  valid: number;
  warnings: number;
  errors: number;
}

const Validation: React.FC = () => {
  const params = useParams();
  const projectNumber = params?.projectNumber as string;
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [summary, setSummary] = useState<ValidationSummary>({ total: 0, valid: 0, warnings: 0, errors: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const validateProject = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/forms/validate/${projectNumber}`);
      if (!response.ok) {
        throw new Error('Failed to validate project');
      }

      const results = await response.json();
      setValidationResults(results.validations);
      
      // Calculate summary
      const summary = results.validations.reduce((acc: ValidationSummary, result: ValidationResult) => {
        acc.total++;
        if (result.status === 'valid') acc.valid++;
        else if (result.status === 'warning') acc.warnings++;
        else if (result.status === 'error') acc.errors++;
        return acc;
      }, { total: 0, valid: 0, warnings: 0, errors: 0 });
      
      setSummary(summary);
    } catch (err) {
      setError('Er is een fout opgetreden bij het valideren van het project');
      console.error('Validation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateProject();
  }, [projectNumber]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const groupedResults = validationResults.reduce((groups, result) => {
    if (!groups[result.category]) {
      groups[result.category] = [];
    }
    groups[result.category].push(result);
    return groups;
  }, {} as Record<string, ValidationResult[]>);

  const categories = [
    { key: 'project', name: 'Project Informatie', description: 'Basis projectgegevens en contactinformatie' },
    { key: 'd2n', name: 'D2N Checklist', description: 'D2N specifieke vereisten en controles' },
    { key: 'electrical', name: 'Elektrische Berekening', description: 'Aansluitwaarden en vermogensberekeningen' },
    { key: 'technical', name: 'Technische Specificaties', description: 'Technische eisen en specificaties' },
    { key: 'compliance', name: 'Compliance', description: 'Wettelijke en regelgevingsvereisten' }
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Project Validatie
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Validatie van Project: {projectNumber}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Controleer alle ingevoerde gegevens op volledigheid en juistheid
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {summary.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Totaal Controles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {summary.valid}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Geldig
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {summary.warnings}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Waarschuwingen
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {summary.errors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fouten
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Overall Status */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Algemene Status
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={validateProject}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Opnieuw Valideren'}
            </Button>
          </Box>
          
          {summary.errors > 0 ? (
            <Alert severity="error">
              <Typography variant="h6">Project heeft {summary.errors} fout(en) die opgelost moeten worden</Typography>
              <Typography variant="body2">
                Controleer de onderstaande validatieresultaten en los de fouten op voordat u doorgaat.
              </Typography>
            </Alert>
          ) : summary.warnings > 0 ? (
            <Alert severity="warning">
              <Typography variant="h6">Project heeft {summary.warnings} waarschuwing(en)</Typography>
              <Typography variant="body2">
                Het project kan doorgaan, maar controleer de waarschuwingen voor optimale resultaten.
              </Typography>
            </Alert>
          ) : (
            <Alert severity="success">
              <Typography variant="h6">Project is volledig gevalideerd</Typography>
              <Typography variant="body2">
                Alle controles zijn succesvol doorlopen. Het project kan doorgaan naar de volgende fase.
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Validation Results by Category */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {categories.map((category) => {
            const results = groupedResults[category.key] || [];
            const categorySummary = results.reduce((acc, result) => {
              acc.total++;
              if (result.status === 'valid') acc.valid++;
              else if (result.status === 'warning') acc.warnings++;
              else if (result.status === 'error') acc.errors++;
              return acc;
            }, { total: 0, valid: 0, warnings: 0, errors: 0 });

            return (
              <Grid item xs={12} md={6} key={category.key}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">
                        {category.name}
                      </Typography>
                      <Box display="flex" gap={1}>
                        {categorySummary.errors > 0 && (
                          <Chip label={`${categorySummary.errors} fout`} color="error" size="small" />
                        )}
                        {categorySummary.warnings > 0 && (
                          <Chip label={`${categorySummary.warnings} waarschuwing`} color="warning" size="small" />
                        )}
                        {categorySummary.valid > 0 && (
                          <Chip label={`${categorySummary.valid} geldig`} color="success" size="small" />
                        )}
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {category.description}
                    </Typography>

                    {results.length === 0 ? (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Geen validaties beschikbaar voor deze categorie
                      </Typography>
                    ) : (
                      <List dense>
                        {results.map((result, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon>
                              {getStatusIcon(result.status)}
                            </ListItemIcon>
                            <ListItemText
                              primary={result.field}
                              secondary={result.message}
                              secondaryTypographyProps={{
                                color: getStatusColor(result.status) + '.main'
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Action Buttons */}
      <Box display="flex" gap={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
        >
          Terug
        </Button>
        {summary.errors === 0 && (
          <Button
            variant="contained"
            color="success"
            size="large"
          >
            Project Goedkeuren
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Validation;
