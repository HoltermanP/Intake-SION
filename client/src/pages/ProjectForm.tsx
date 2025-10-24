import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ProjectData } from '../types';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/forms/projects`,
  PROJECT: (projectNumber: string) => `${API_BASE_URL}/api/forms/projects/${projectNumber}`,
};

const steps = [
  'Projectgegevens',
  'Initiatiefnemer',
  'Documenten',
  'Algemene vragen',
  'Water & Elektra'
];

const projectTypeOptions = [
  'Nieuwe aanleg',
  'Reconstructie', 
  'Sloop/nieuwbouw',
  'Sanering'
];

const groundOwnershipOptions = [
  'Openbaar (overheid)',
  'Particulier'
];

const contaminatedGroundOptions = [
  'Ja',
  'Nee, rapport opvragen'
];

const fireHydrantsOptions = [
  'Ja',
  'Nee'
];

const schema = yup.object({
  projectNumber: yup.string().required('Projectnummer is verplicht'),
  projectName: yup.string().required('Projectnaam is verplicht'),
  projectLeader: yup.string().required('Projectleider is verplicht'),
  projectType: yup.string().required('Projecttype is verplicht'),
  location: yup.string().required('Plaats/gemeente is verplicht'),
  groundOwnership: yup.string().required('Eigendom grond is verplicht'),
  workDescription: yup.string().required('Omschrijving werkzaamheden is verplicht'),
  client: yup.string().required('Opdrachtgever/Klant is verplicht'),
  clientName: yup.string().required('Naam is verplicht'),
  contactPerson: yup.string().required('Contactpersoon is verplicht'),
  phoneNumber: yup.string().required('Telefoonnummer is verplicht'),
  email: yup.string().email('Ongeldig e-mailadres').required('E-mailadres is verplicht'),
  address: yup.string().required('Adres is verplicht')
});

const ProjectForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, watch } = useForm<ProjectData>({
    resolver: yupResolver(schema),
    defaultValues: {
      projectNumber: '',
      projectName: '',
      projectLeader: '',
      projectType: '',
      location: '',
      groundOwnership: '',
      workDescription: '',
      client: '',
      clientName: '',
      contactPerson: '',
      phoneNumber: '',
      email: '',
      address: '',
      applicationNumber: '',
      contaminatedGround: 'Nee, rapport opvragen',
      fireHydrants: 'Nee',
      designPlan: false,
      trackDrawing: false,
      soilData: false,
      natura2000Report: false,
      archaeologyResearch: false,
      ngeReport: false,
      apartments: 0,
      apartmentsArea: 0,
      rowHouses: 0,
      rowHousesArea: 0,
      twoUnderOneRoof: 0,
      twoUnderOneRoofArea: 0,
      detachedHouses: 0,
      detachedHousesArea: 0,
      commercialSpaces: 0,
      commercialSpacesArea: 0,
      generalSpaces: 0,
      generalSpacesArea: 0,
      connectionType1: 0,
      connectionType2: 0,
      connectionType3: 0,
      totalSolarPanels: 0,
      totalInverterPower: 0,
      totalPrivateChargingStations: 0,
      totalPublicChargingStations: 0,
      totalHeatPumps: 0,
      pvOnCvzConnection: 'NVT',
      largeConsumptionConnection: ''
    }
  });

  const onSubmit = async (data: ProjectData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(API_ENDPOINTS.PROJECTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      const result = await response.json();
      navigate(`/projects/${data.projectNumber}`);
    } catch (error) {
      setSubmitError('Er is een fout opgetreden bij het opslaan van het project');
      console.error('Error saving project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="projectNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Projectnummer"
                    error={!!errors.projectNumber}
                    helperText={errors.projectNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="projectName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Projectnaam"
                    error={!!errors.projectName}
                    helperText={errors.projectName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="projectLeader"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Combi Projectleider"
                    error={!!errors.projectLeader}
                    helperText={errors.projectLeader?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.projectType}>
                    <InputLabel>Type project</InputLabel>
                    <Select {...field}>
                      {projectTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Plaats/gemeente"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="groundOwnership"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.groundOwnership}>
                    <InputLabel>Eigendom grond</InputLabel>
                    <Select {...field}>
                      {groundOwnershipOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="workDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label="Omschrijving werkzaamheden"
                    error={!!errors.workDescription}
                    helperText={errors.workDescription?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="client"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Opdrachtgever/Klant"
                    error={!!errors.client}
                    helperText={errors.client?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="clientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Naam"
                    error={!!errors.clientName}
                    helperText={errors.clientName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="contactPerson"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Contactpersoon"
                    error={!!errors.contactPerson}
                    helperText={errors.contactPerson?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefoonnummer"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="E-mailadres"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Postcode/huisnummer/plaats"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="applicationNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Aanvraagnummer Mijnaansluiting.nl"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Documenten die initiatiefnemer stuurt (ja/nee)
              </Typography>
            </Grid>
            {[
              { name: 'designPlan', label: 'Ontwerp vh plan (PDF en DWG op RD-coordinaat)' },
              { name: 'trackDrawing', label: 'Tracé tekening (PDF en DWG op RD-coördinaat)' },
              { name: 'soilData', label: 'Bodemgegevens (bodemonderzoek)' },
              { name: 'natura2000Report', label: 'Natura2000 rapport' },
              { name: 'archaeologyResearch', label: 'Archeologie onderzoek' },
              { name: 'ngeReport', label: 'NGE rapport' }
            ].map(({ name, label }) => (
              <Grid item xs={12} key={name}>
                <Controller
                  name={name as keyof ProjectData}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value as boolean}
                          onChange={field.onChange}
                        />
                      }
                      label={label}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Algemene vragen
              </Typography>
            </Grid>
            {[
              { name: 'apartments', label: 'Appartement', areaName: 'apartmentsArea' },
              { name: 'rowHouses', label: 'Rijtjes-/eengezinswoning', areaName: 'rowHousesArea' },
              { name: 'twoUnderOneRoof', label: 'Twee onder één kap', areaName: 'twoUnderOneRoofArea' },
              { name: 'detachedHouses', label: '(Vrijstaande) woning', areaName: 'detachedHousesArea' },
              { name: 'commercialSpaces', label: 'Commerciële ruimtes', areaName: 'commercialSpacesArea' },
              { name: 'generalSpaces', label: 'Algemene ruimtes', areaName: 'generalSpacesArea' }
            ].map(({ name, label, areaName }) => (
              <React.Fragment key={name}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name={name as keyof ProjectData}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label={`Aantal ${label}`}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name={areaName as keyof ProjectData}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label={`Oppervlakte per stuk (m²)`}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Oppervlakte totaal (m²)"
                    value={((watch(name as keyof ProjectData) as number) || 0) * ((watch(areaName as keyof ProjectData) as number) || 0)}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12} sm={6}>
              <Controller
                name="contaminatedGround"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Is het tracé vrij van vervuilde grond?</InputLabel>
                    <Select {...field}>
                      {contaminatedGroundOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="fireHydrants"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Zijn er brandkranen benodigd?</InputLabel>
                    <Select {...field}>
                      {fireHydrantsOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Water
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="connectionType1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Aansluiting type 1 (m³/u)"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="connectionType2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Aansluiting type 2 (m³/u)"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="connectionType3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Aansluiting type 3 (v.a. 6,3 m³/u)"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Elektra (wordt ingevuld vanuit invulformulier)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="totalSolarPanels"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Totaal aantal zonnepanelen"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="totalInverterPower"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Totaal vermogen omvormer(s)"
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      default:
        return 'Onbekende stap';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Nieuw Project
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}

            {submitError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {submitError}
              </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Terug
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Opslaan...' : 'Project Opslaan'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    Volgende
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectForm;
