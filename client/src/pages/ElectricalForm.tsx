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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Divider,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Calculate as CalculateIcon
} from '@mui/icons-material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { ElectricalCalculationData, ElectricalEntry } from '../types';

const schema = yup.object({
  entries: yup.array().of(
    yup.object({
      kavelNumber: yup.string().required('Kavel nummer is verplicht'),
      houseType: yup.string().required('Woningtype is verplicht'),
      numberOfHouses: yup.number().min(1, 'Minimaal 1 woning').required('Aantal woningen is verplicht'),
      connectionValue: yup.string().required('Aansluitwaarde is verplicht'),
      heatingMethod: yup.string().required('Verwarmingsmethode is verplicht'),
      solarPanels: yup.number().min(0).required(),
      panelPower: yup.number().min(0).required(),
      livingArea: yup.number().min(0).required(),
      heatPumpType: yup.string().required(),
      heatPumpPower: yup.number().min(0).required(),
      privateChargingPower: yup.number().min(0).required(),
      publicChargingPower: yup.number().min(0).required(),
      comments: yup.string()
    })
  )
});

const houseTypes = [
  '2-onder-1 kap woning',
  'Rijtjes woning', 
  'Tussenwoning',
  'Vrijstaand',
  'Bedrijfshal',
  'Commercieel',
  'Centrale voorzieningen',
  'Laadpaal',
  'Overig'
];

const connectionValues = [
  '1x10A',
  '3x25A',
  '3x35A',
  '3x50A',
  '3x63A',
  '3x80A'
];

const heatingMethods = [
  'Warmtepomp',
  'Elektrisch',
  'Niet elektrisch'
];

const heatPumpTypes = [
  'lucht-water',
  'Brine-water of water-water'
];

const ElectricalForm: React.FC = () => {
  const { projectNumber } = useParams<{ projectNumber: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<any>(null);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<ElectricalCalculationData>({
    resolver: yupResolver(schema),
    defaultValues: {
      entries: [
        {
          kavelNumber: '1',
          houseType: '2-onder-1 kap woning',
          numberOfHouses: 2,
          connectionValue: '3x25A',
          heatingMethod: 'Warmtepomp',
          solarPanels: 8,
          panelPower: 400,
          totalPower: 3200,
          livingArea: 120,
          heatPumpType: 'lucht-water',
          heatPumpPower: 5,
          totalHeatPumpPower: 10,
          privateChargingPower: 11,
          totalPrivateChargingPower: 22,
          publicChargingPower: 0,
          totalPublicChargingPower: 0,
          comments: 'In dit voorbeeld hebben 2 woningen een laadpaal'
        }
      ],
      totals: {
        totalHouses: 0,
        totalSolarPanels: 0,
        totalInverterPower: 0,
        totalPrivateChargingStations: 0,
        totalPublicChargingStations: 0,
        totalHeatPumps: 0
      }
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'entries'
  });

  const watchedEntries = watch('entries');

  useEffect(() => {
    if (projectNumber) {
      fetchProjectData();
    }
  }, [projectNumber]);

  const fetchProjectData = async () => {
    try {
      const response = await fetch(`/api/forms/projects/${projectNumber}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const project = result.data;
        setProjectData(project);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  // Calculate totals
  const totals = {
    totalHouses: watchedEntries?.reduce((sum, entry) => sum + (entry.numberOfHouses || 0), 0) || 0,
    totalSolarPanels: watchedEntries?.reduce((sum, entry) => sum + (entry.solarPanels || 0), 0) || 0,
    totalInverterPower: watchedEntries?.reduce((sum, entry) => sum + (entry.totalPower || 0), 0) || 0,
    totalPrivateChargingStations: watchedEntries?.reduce((sum, entry) => sum + (entry.totalPrivateChargingPower || 0), 0) || 0,
    totalPublicChargingStations: watchedEntries?.reduce((sum, entry) => sum + (entry.totalPublicChargingPower || 0), 0) || 0,
    totalHeatPumps: watchedEntries?.reduce((sum, entry) => sum + (entry.totalHeatPumpPower || 0), 0) || 0
  };

  const addNewEntry = () => {
    append({
      kavelNumber: `${(watchedEntries?.length || 0) + 1}`,
      houseType: '',
      numberOfHouses: 1,
      connectionValue: '',
      heatingMethod: '',
      solarPanels: 0,
      panelPower: 0,
      totalPower: 0,
      livingArea: 0,
      heatPumpType: '',
      heatPumpPower: 0,
      totalHeatPumpPower: 0,
      privateChargingPower: 0,
      totalPrivateChargingPower: 0,
      publicChargingPower: 0,
      totalPublicChargingPower: 0,
      comments: ''
    });
  };

  const calculateEntryTotals = (entry: ElectricalEntry) => {
    const totalPower = (entry.solarPanels || 0) * (entry.panelPower || 0);
    const totalHeatPumpPower = (entry.numberOfHouses || 0) * (entry.heatPumpPower || 0);
    const totalPrivateChargingPower = (entry.numberOfHouses || 0) * (entry.privateChargingPower || 0);
    const totalPublicChargingPower = (entry.numberOfHouses || 0) * (entry.publicChargingPower || 0);
    
    return {
      totalPower,
      totalHeatPumpPower,
      totalPrivateChargingPower,
      totalPublicChargingPower
    };
  };

  const onSubmit = async (data: ElectricalCalculationData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Calculate totals for each entry
      const entriesWithTotals = data.entries.map(entry => ({
        ...entry,
        ...calculateEntryTotals(entry)
      }));

      const dataWithTotals = {
        ...data,
        entries: entriesWithTotals,
        totals
      };

      const response = await fetch('/api/forms/electrical-calculations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithTotals),
      });

      if (!response.ok) {
        throw new Error('Failed to save electrical calculation');
      }

      const result = await response.json();
      navigate(`/projects/${projectNumber}`);
    } catch (error) {
      setSubmitError('Er is een fout opgetreden bij het opslaan van de elektrische berekening');
      console.error('Error saving electrical calculation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Elektrisch Berekenen
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Vul per woning de Aansluitwaarden, (piek)vermogens Zonnepanelen, warmtepompen en laadpalen in
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          De eerste regel is als voorbeeld opgenomen en dient te worden aangepast
        </Typography>
      </Paper>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Woningen/objecten
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addNewEntry}
              >
                Nieuwe Regel Toevoegen
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Kavel nr.</TableCell>
                    <TableCell>Woning-/objecttype</TableCell>
                    <TableCell>Aantal</TableCell>
                    <TableCell>Aansluitwaarde</TableCell>
                    <TableCell>Wijze van verwarmen</TableCell>
                    <TableCell>PV-panelen</TableCell>
                    <TableCell>Piekvermogen (Wp)</TableCell>
                    <TableCell>Totaal (Wp)</TableCell>
                    <TableCell>Woon oppervlakte m²</TableCell>
                    <TableCell>Type warmtepomp</TableCell>
                    <TableCell>Max vermogen (kW)</TableCell>
                    <TableCell>Totaal (kW)</TableCell>
                    <TableCell>Privé laadpaal (kW)</TableCell>
                    <TableCell>Totaal (kW)</TableCell>
                    <TableCell>Openbaar laadpaal (kW)</TableCell>
                    <TableCell>Totaal (kW)</TableCell>
                    <TableCell>Opmerkingen</TableCell>
                    <TableCell>Acties</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => {
                    const entry = watchedEntries?.[index];
                    const calculated = entry ? calculateEntryTotals(entry) : null;
                    
                    return (
                      <TableRow key={field.id}>
                        <TableCell>
                          <Controller
                            name={`entries.${index}.kavelNumber`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                error={!!errors.entries?.[index]?.kavelNumber}
                                helperText={errors.entries?.[index]?.kavelNumber?.message}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.houseType`}
                            control={control}
                            render={({ field }) => (
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select {...field}>
                                  {houseTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                      {type}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.numberOfHouses`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                                error={!!errors.entries?.[index]?.numberOfHouses}
                                helperText={errors.entries?.[index]?.numberOfHouses?.message}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.connectionValue`}
                            control={control}
                            render={({ field }) => (
                              <FormControl size="small" sx={{ minWidth: 100 }}>
                                <Select {...field}>
                                  {connectionValues.map((value) => (
                                    <MenuItem key={value} value={value}>
                                      {value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.heatingMethod`}
                            control={control}
                            render={({ field }) => (
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select {...field}>
                                  {heatingMethods.map((method) => (
                                    <MenuItem key={method} value={method}>
                                      {method}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.solarPanels`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.panelPower`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <TextField
                            size="small"
                            value={calculated?.totalPower || 0}
                            InputProps={{ readOnly: true }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.livingArea`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.heatPumpType`}
                            control={control}
                            render={({ field }) => (
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select {...field}>
                                  {heatPumpTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                      {type}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.heatPumpPower`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <TextField
                            size="small"
                            value={calculated?.totalHeatPumpPower || 0}
                            InputProps={{ readOnly: true }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.privateChargingPower`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <TextField
                            size="small"
                            value={calculated?.totalPrivateChargingPower || 0}
                            InputProps={{ readOnly: true }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.publicChargingPower`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                sx={{ width: 80 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <TextField
                            size="small"
                            value={calculated?.totalPublicChargingPower || 0}
                            InputProps={{ readOnly: true }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Controller
                            name={`entries.${index}.comments`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                multiline
                                rows={2}
                                sx={{ width: 150 }}
                              />
                            )}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Totals */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Totaal
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {totals.totalHouses}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Totaal woningen
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {totals.totalSolarPanels}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Zonnepanelen
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {totals.totalInverterPower} Wp
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Totaal vermogen
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {totals.totalHeatPumps} kW
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Warmtepompen
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {totals.totalPrivateChargingStations} kW
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Privé laadpalen
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {totals.totalPublicChargingStations} kW
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Openbare laadpalen
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate(`/projects/${projectNumber}`)}
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<CalculateIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Opslaan...' : 'Berekening Opslaan'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ElectricalForm;
