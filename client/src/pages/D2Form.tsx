'use client';
import React, { useState, useEffect } from 'react';
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
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { D2FormData } from '../types';

const schema = yup.object({
  projectNumber: yup.string().required(),
  projectName: yup.string().required(),
  projectLeader: yup.string().required(),
  projectType: yup.string().required(),
  meetingDate: yup.string().required('Datum bespreking is verplicht'),
  meetingLocation: yup.string().required('Plaats bespreking is verplicht'),
  numberOfHouses: yup.number().min(0).required(),
  numberOfApartments: yup.number().min(0).required(),
  numberOfCommercialSpaces: yup.number().min(0).required(),
  numberOfGeneralSpaces: yup.number().min(0).required()
});

const D2Form: React.FC = () => {
  const params = useParams();
  const projectNumber = params?.projectNumber as string;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<any>(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      projectNumber: projectNumber || '',
      projectName: '',
      projectLeader: '',
      projectType: '',
      meetingDate: '',
      meetingLocation: '',
      participatingUtilities: [],
      otherParticipants: '',
      numberOfHouses: 0,
      numberOfApartments: 0,
      numberOfCommercialSpaces: 0,
      numberOfGeneralSpaces: 0,
      electricityReturn: false,
      largeConsumptionConnection: false,
      largeConsumptionValue: '',
      heatPumpApplication: false,
      houseNumberDecision: false,
      groundOwnership: '',
      contaminatedGround: 'Nee',
      obstacles: 'Nee',
      specialConditions: 'Nee',
      existingInfrastructure: 'Nee',
      dewatering: 'Nee',
      dewateringBy: '',
      trafficPlans: 'Nee',
      trafficFacilitiesBy: '',
      phasing: '',
      otherPoints: '',
      waterGasDistance: false,
      waterSewerDistance: false,
      highPressureGasDistance: false,
      waterHeatDistance: false,
      planStatus: '',
      designReceived: false,
      receivedDate: '',
      softStartWeek: '',
      hardStartWeek: '',
      trackInspection: '',
      digitalMarking: '',
      storageLocation: '',
      risksDiscussed: 'Standaard risico\'s besproken',
      crow500: false,
      riskExplanation: '',
      additionalComments: ''
    }
  });

  useEffect(() => {
    if (projectNumber) {
      fetchProjectData();
    }
  }, [projectNumber]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      
      // First try to get existing D2 form data
      const d2Response = await fetch(`/api/forms/d2/${projectNumber}`);
      if (d2Response.ok) {
        const d2Result = await d2Response.json();
        if (d2Result.success) {
          setProjectData(d2Result.data);
          // Pre-fill form with D2 data
          Object.keys(d2Result.data).forEach(key => {
            if (d2Result.data[key] !== undefined) {
              setValue(key, d2Result.data[key]);
            }
          });
          setLoading(false);
          return;
        }
      }
      
      // If no D2 form exists, get project data
      const response = await fetch(`/api/forms/projects/${projectNumber}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const project = result.data;
        setProjectData(project);
        
        // Pre-fill form with project data
        setValue('projectNumber', project.projectNumber);
        setValue('projectName', project.projectName);
        setValue('projectLeader', project.projectLeader);
        setValue('projectType', project.projectType);
        setValue('numberOfHouses', project.rowHouses + project.detachedHouses + project.twoUnderOneRoof);
        setValue('numberOfApartments', project.apartments);
        setValue('numberOfCommercialSpaces', project.commercialSpaces);
        setValue('numberOfGeneralSpaces', project.generalSpaces);
      }
    } catch (err) {
      console.error('Error fetching project data:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`/api/forms/d2/${projectNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save D2 form');
      }

      const result = await response.json();
      router.push(`/projects/${projectNumber}`);
    } catch (error) {
      setSubmitError('Er is een fout opgetreden bij het opslaan van het D2 formulier');
      console.error('Error saving D2 form:', error);
    } finally {
      setIsSubmitting(false);
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
      <Typography variant="h4" component="h1" gutterBottom>
        D2N-formulier Combi SION
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Project informatie */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Projectinformatie
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Controller
                  name="projectNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Projectnummer"
                      InputProps={{ readOnly: true }}
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
                      InputProps={{ readOnly: true }}
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
                      label="Combi projectleider"
                      InputProps={{ readOnly: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="projectType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Type project"
                      InputProps={{ readOnly: true }}
                    />
                  )}
                />
              </Grid>

              {/* Vooroverleg */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Vooroverleg (VOL)
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="meetingDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      label="Datum bespreking"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.meetingDate}
                      helperText={errors.meetingDate?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="meetingLocation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Plaats bespreking"
                      error={!!errors.meetingLocation}
                      helperText={errors.meetingLocation?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Deelnemende netbeheerders
                </Typography>
                <Grid container spacing={2}>
                  {['Liander', 'Enexis', 'Stedin', 'Westland Infra'].map((utility) => (
                    <Grid item xs={12} sm={6} key={utility}>
                      <Controller
                        name="participatingUtilities"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={(field.value as string[])?.includes(utility) || false}
                                onChange={(e) => {
                                  const current = (field.value as string[]) || [];
                                  if (e.target.checked) {
                                    field.onChange([...current, utility]);
                                  } else {
                                    field.onChange(current.filter((u: string) => u !== utility));
                                  }
                                }}
                              />
                            }
                            label={utility}
                          />
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="otherParticipants"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Anders, namelijk"
                      multiline
                      rows={2}
                    />
                  )}
                />
              </Grid>

              {/* Algemeen */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Algemeen
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="numberOfHouses"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Aantal woningen"
                      error={!!errors.numberOfHouses}
                      helperText={errors.numberOfHouses?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="numberOfApartments"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Aantal appartementen"
                      error={!!errors.numberOfApartments}
                      helperText={errors.numberOfApartments?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="numberOfCommercialSpaces"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Aantal commerciële ruimten"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="numberOfGeneralSpaces"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Aantal algemene ruimten"
                    />
                  )}
                />
              </Grid>

              {/* Capaciteiten */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Capaciteiten
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="electricityReturn"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Teruglevering aan het elektriciteitsnet"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="largeConsumptionConnection"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Grootverbruik aansluiting"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="heatPumpApplication"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Toepassing warmtepompen"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="houseNumberDecision"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Huisnummerbesluit beschikbaar"
                    />
                  )}
                />
              </Grid>

              {/* Tracé vragen */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Vragen tracé ontwerp
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="groundOwnership"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Eigendom gronden waarin zich het tracé bevind"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="contaminatedGround"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Is tracé vrij van vervuild grond?</InputLabel>
                      <Select {...field}>
                        <MenuItem value="Ja">Ja</MenuItem>
                        <MenuItem value="Nee">Nee</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="obstacles"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Is tracé vrij van obstakels?</InputLabel>
                      <Select {...field}>
                        <MenuItem value="Ja">Ja</MenuItem>
                        <MenuItem value="Nee">Nee</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="specialConditions"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Zijn er bijzondere voorwaarden tracé?</InputLabel>
                      <Select {...field}>
                        <MenuItem value="Ja">Ja</MenuItem>
                        <MenuItem value="Nee">Nee</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Overige opmerkingen */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Overige opmerkingen
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="additionalComments"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      label="Vrij invul-veld"
                    />
                  )}
                />
              </Grid>

              {submitError && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    {submitError}
                  </Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => router.push(`/projects/${projectNumber}`)}
                  >
                    Annuleren
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Opslaan...' : 'D2 Formulier Opslaan'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default D2Form;
