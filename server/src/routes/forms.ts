import { Router, Request, Response } from 'express';
import { ProjectData, D2FormData, ElectricalCalculationData, ApiResponse } from '../types';

const router = Router();

// Mock data storage (in production, this would be SharePoint)
let projectData: ProjectData[] = [
  {
    projectNumber: "PROJ-001",
    projectName: "Nieuwbouw Woningen De Vliert",
    projectLeader: "Jan van der Berg",
    projectType: "Nieuwe aanleg",
    location: "De Vliert, Den Haag",
    groundOwnership: "Openbaar (overheid)",
    workDescription: "Aanleg van nieuwe woningen met duurzame energievoorziening",
    client: "Gemeente Den Haag",
    clientName: "Gemeente Den Haag",
    contactPerson: "Marieke Jansen",
    phoneNumber: "070-1234567",
    email: "marieke.jansen@denhaag.nl",
    address: "Spui 70, 2511 BT Den Haag",
    applicationNumber: "APP-2024-001",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: false,
    archaeologyResearch: true,
    ngeReport: false,
    apartments: 24,
    apartmentsArea: 2400,
    rowHouses: 12,
    rowHousesArea: 1800,
    twoUnderOneRoof: 8,
    twoUnderOneRoofArea: 1200,
    detachedHouses: 4,
    detachedHousesArea: 800,
    commercialSpaces: 2,
    commercialSpacesArea: 300,
    generalSpaces: 1,
    generalSpacesArea: 150,
    contaminatedGround: "Nee, rapport opvragen",
    fireHydrants: "Ja",
    connectionType1: 3,
    connectionType2: 2,
    connectionType3: 1,
    totalSolarPanels: 120,
    totalInverterPower: 48000,
    totalPrivateChargingStations: 48,
    totalPublicChargingStations: 4,
    totalHeatPumps: 48,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "NVT"
  },
  {
    projectNumber: "PROJ-002",
    projectName: "Renovatie Wijk Centrum",
    projectLeader: "Lisa de Vries",
    projectType: "Reconstructie",
    location: "Centrum, Amsterdam",
    groundOwnership: "Particulier",
    workDescription: "Reconstructie van bestaande wijk met duurzame verbeteringen",
    client: "Woningcorporatie Amsterdam",
    clientName: "Woningcorporatie Amsterdam",
    contactPerson: "Peter Bakker",
    phoneNumber: "020-9876543",
    email: "peter.bakker@woningcorporatie.nl",
    address: "Damrak 1, 1012 LP Amsterdam",
    applicationNumber: "APP-2024-002",
    designPlan: true,
    trackDrawing: false,
    soilData: false,
    natura2000Report: false,
    archaeologyResearch: false,
    ngeReport: true,
    apartments: 36,
    apartmentsArea: 3600,
    rowHouses: 18,
    rowHousesArea: 2700,
    twoUnderOneRoof: 0,
    twoUnderOneRoofArea: 0,
    detachedHouses: 0,
    detachedHousesArea: 0,
    commercialSpaces: 4,
    commercialSpacesArea: 600,
    generalSpaces: 2,
    generalSpacesArea: 300,
    contaminatedGround: "Ja",
    fireHydrants: "Nee",
    connectionType1: 2,
    connectionType2: 3,
    connectionType3: 0,
    totalSolarPanels: 180,
    totalInverterPower: 72000,
    totalPrivateChargingStations: 54,
    totalPublicChargingStations: 6,
    totalHeatPumps: 54,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "Woningen"
  }
];

let d2FormData: D2FormData[] = [];

let electricalData: ElectricalCalculationData[] = [];

// Project data routes
router.get('/projects', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: projectData
  } as ApiResponse<ProjectData[]>);
});

router.get('/projects/:projectNumber', (req: Request, res: Response) => {
  try {
    const { projectNumber } = req.params;
    const project = projectData.find(p => p.projectNumber === projectNumber);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      } as ApiResponse<never>);
    }
    
    res.json({
      success: true,
      data: project
    } as ApiResponse<ProjectData>);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    } as ApiResponse<never>);
  }
});

router.post('/projects', (req: Request, res: Response) => {
  try {
    const newProject: ProjectData = req.body;
    
    // Validate required fields
    if (!newProject.projectNumber || !newProject.projectName) {
      return res.status(400).json({
        success: false,
        error: 'Project number and name are required'
      } as ApiResponse<never>);
    }

    // Check if project already exists
    const existingProject = projectData.find(p => p.projectNumber === newProject.projectNumber);
    if (existingProject) {
      return res.status(409).json({
        success: false,
        error: 'Project with this number already exists'
      } as ApiResponse<never>);
    }

    projectData.push(newProject);
    
    res.status(201).json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    } as ApiResponse<ProjectData>);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    } as ApiResponse<never>);
  }
});

router.put('/projects/:projectNumber', (req: Request, res: Response) => {
  try {
    const { projectNumber } = req.params;
    const updatedProject: ProjectData = req.body;
    
    const projectIndex = projectData.findIndex(p => p.projectNumber === projectNumber);
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      } as ApiResponse<never>);
    }

    projectData[projectIndex] = updatedProject;
    
    res.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully'
    } as ApiResponse<ProjectData>);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update project'
    } as ApiResponse<never>);
  }
});

// D2 Form routes
router.get('/d2-forms', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: d2FormData
  } as ApiResponse<D2FormData[]>);
});

router.post('/d2-forms', (req: Request, res: Response) => {
  try {
    const newD2Form: D2FormData = req.body;
    
    if (!newD2Form.projectNumber) {
      return res.status(400).json({
        success: false,
        error: 'Project number is required'
      } as ApiResponse<never>);
    }

    d2FormData.push(newD2Form);
    
    res.status(201).json({
      success: true,
      data: newD2Form,
      message: 'D2 form created successfully'
    } as ApiResponse<D2FormData>);
  } catch (error) {
    console.error('Error creating D2 form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create D2 form'
    } as ApiResponse<never>);
  }
});

// Electrical calculation routes
router.get('/electrical-calculations', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: electricalData
  } as ApiResponse<ElectricalCalculationData[]>);
});

router.post('/electrical-calculations', (req: Request, res: Response) => {
  try {
    const newCalculation: ElectricalCalculationData = req.body;
    
    // Calculate totals
    const totals = {
      totalHouses: newCalculation.entries.reduce((sum, entry) => sum + entry.numberOfHouses, 0),
      totalSolarPanels: newCalculation.entries.reduce((sum, entry) => sum + entry.solarPanels, 0),
      totalInverterPower: newCalculation.entries.reduce((sum, entry) => sum + entry.totalPower, 0),
      totalPrivateChargingStations: newCalculation.entries.reduce((sum, entry) => sum + entry.totalPrivateChargingPower, 0),
      totalPublicChargingStations: newCalculation.entries.reduce((sum, entry) => sum + entry.totalPublicChargingPower, 0),
      totalHeatPumps: newCalculation.entries.reduce((sum, entry) => sum + entry.totalHeatPumpPower, 0)
    };

    newCalculation.totals = totals;
    electricalData.push(newCalculation);
    
    res.status(201).json({
      success: true,
      data: newCalculation,
      message: 'Electrical calculation created successfully'
    } as ApiResponse<ElectricalCalculationData>);
  } catch (error) {
    console.error('Error creating electrical calculation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create electrical calculation'
    } as ApiResponse<never>);
  }
});

// Get form by project number
router.get('/projects/:projectNumber/forms', (req: Request, res: Response) => {
  try {
    const { projectNumber } = req.params;
    
    const project = projectData.find(p => p.projectNumber === projectNumber);
    const d2Form = d2FormData.find(f => f.projectNumber === projectNumber);
    const electrical = electricalData.find(e => e.entries.some(entry => entry.kavelNumber.includes(projectNumber)));
    
    res.json({
      success: true,
      data: {
        project,
        d2Form,
        electrical
      }
    } as ApiResponse<any>);
  } catch (error) {
    console.error('Error getting forms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get forms'
    } as ApiResponse<never>);
  }
});

// Validation endpoint
router.get('/validate/:projectNumber', (req: Request, res: Response) => {
  try {
    const { projectNumber } = req.params;
    
    const project = projectData.find(p => p.projectNumber === projectNumber);
    const d2Form = d2FormData.find(f => f.projectNumber === projectNumber);
    const electrical = electricalData.find(e => e.entries.some(entry => entry.kavelNumber.includes(projectNumber)));
    
    const validations = [];
    
    // Project validation
    if (project) {
      if (!project.projectName) {
        validations.push({
          field: 'Project naam',
          status: 'error',
          message: 'Project naam is verplicht',
          category: 'project'
        });
      } else {
        validations.push({
          field: 'Project naam',
          status: 'valid',
          message: 'Project naam is ingevuld',
          category: 'project'
        });
      }
      
      if (!project.clientName) {
        validations.push({
          field: 'Klant naam',
          status: 'error',
          message: 'Klant naam is verplicht',
          category: 'project'
        });
      } else {
        validations.push({
          field: 'Klant naam',
          status: 'valid',
          message: 'Klant naam is ingevuld',
          category: 'project'
        });
      }
      
      if (!project.email) {
        validations.push({
          field: 'E-mail adres',
          status: 'error',
          message: 'E-mail adres is verplicht',
          category: 'project'
        });
      } else {
        validations.push({
          field: 'E-mail adres',
          status: 'valid',
          message: 'E-mail adres is ingevuld',
          category: 'project'
        });
      }
    } else {
      validations.push({
        field: 'Project gegevens',
        status: 'error',
        message: 'Project gegevens niet gevonden',
        category: 'project'
      });
    }
    
    // D2 Form validation
    if (d2Form) {
      if (!d2Form.meetingDate) {
        validations.push({
          field: 'Vooroverleg datum',
          status: 'warning',
          message: 'Vooroverleg datum wordt aanbevolen',
          category: 'd2n'
        });
      } else {
        validations.push({
          field: 'Vooroverleg datum',
          status: 'valid',
          message: 'Vooroverleg datum is ingevuld',
          category: 'd2n'
        });
      }
      
      if (d2Form.numberOfHouses === 0) {
        validations.push({
          field: 'Aantal woningen',
          status: 'error',
          message: 'Aantal woningen moet groter zijn dan 0',
          category: 'd2n'
        });
      } else {
        validations.push({
          field: 'Aantal woningen',
          status: 'valid',
          message: 'Aantal woningen is ingevuld',
          category: 'd2n'
        });
      }
    } else {
      validations.push({
        field: 'D2 Formulier',
        status: 'warning',
        message: 'D2 formulier nog niet ingevuld',
        category: 'd2n'
      });
    }
    
    // Electrical validation
    if (electrical) {
      if (electrical.entries.length === 0) {
        validations.push({
          field: 'Elektrische berekening',
          status: 'error',
          message: 'Geen elektrische berekeningen gevonden',
          category: 'electrical'
        });
      } else {
        validations.push({
          field: 'Elektrische berekening',
          status: 'valid',
          message: `${electrical.entries.length} berekening(en) gevonden`,
          category: 'electrical'
        });
      }
      
      const totalPower = electrical.totals.totalInverterPower;
      if (totalPower === 0) {
        validations.push({
          field: 'Totaal vermogen',
          status: 'warning',
          message: 'Geen zonnepanelen vermogen berekend',
          category: 'electrical'
        });
      } else {
        validations.push({
          field: 'Totaal vermogen',
          status: 'valid',
          message: `${totalPower} Wp totaal vermogen`,
          category: 'electrical'
        });
      }
    } else {
      validations.push({
        field: 'Elektrische berekening',
        status: 'warning',
        message: 'Elektrische berekening nog niet gemaakt',
        category: 'electrical'
      });
    }
    
    // Technical validation
    if (project && project.apartments + project.rowHouses + project.twoUnderOneRoof + project.detachedHouses === 0) {
      validations.push({
        field: 'Woningen',
        status: 'error',
        message: 'Geen woningen opgegeven',
        category: 'technical'
      });
    } else {
      validations.push({
        field: 'Woningen',
        status: 'valid',
        message: 'Woningen zijn opgegeven',
        category: 'technical'
      });
    }
    
    // Compliance validation
    if (project && !project.applicationNumber) {
      validations.push({
        field: 'Aanvraagnummer',
        status: 'warning',
        message: 'Aanvraagnummer wordt aanbevolen',
        category: 'compliance'
      });
    } else if (project && project.applicationNumber) {
      validations.push({
        field: 'Aanvraagnummer',
        status: 'valid',
        message: 'Aanvraagnummer is opgegeven',
        category: 'compliance'
      });
    }
    
    res.json({
      success: true,
      validations
    } as ApiResponse<any>);
  } catch (error) {
    console.error('Error validating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate project'
    } as ApiResponse<never>);
  }
});

export { router as formRoutes };
