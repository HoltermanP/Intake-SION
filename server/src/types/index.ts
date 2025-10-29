// Form data types based on Excel analysis
export interface ProjectData {
  // Tabblad 1: Intakeformulier
  projectNumber: string;
  projectName: string;
  projectLeader: string;
  projectType: 'Nieuwe aanleg' | 'Reconstructie' | 'Sloop/nieuwbouw' | 'Sanering';
  location: string;
  groundOwnership: 'Openbaar (overheid)' | 'Particulier';
  workDescription: string;
  
  // Initiatiefnemer
  client: string;
  clientName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  address: string;
  applicationNumber: string;
  
  // Documenten
  designPlan: boolean;
  trackDrawing: boolean;
  soilData: boolean;
  natura2000Report: boolean;
  archaeologyResearch: boolean;
  ngeReport: boolean;
  
  // Algemene vragen
  apartments: number;
  apartmentsArea: number;
  rowHouses: number;
  rowHousesArea: number;
  twoUnderOneRoof: number;
  twoUnderOneRoofArea: number;
  detachedHouses: number;
  detachedHousesArea: number;
  commercialSpaces: number;
  commercialSpacesArea: number;
  generalSpaces: number;
  generalSpacesArea: number;
  contaminatedGround: 'Ja' | 'Nee' | 'Nee, rapport opvragen';
  fireHydrants: 'Ja' | 'Nee';
  
  // Water
  connectionType1: number;
  connectionType2: number;
  connectionType3: number;
  
  // Elektra (vanuit invulformulier)
  totalSolarPanels: number;
  totalInverterPower: number;
  totalPrivateChargingStations: number;
  totalPublicChargingStations: number;
  totalHeatPumps: number;
  pvOnCvzConnection: 'CVZ' | 'Woningen' | 'NVT';
  largeConsumptionConnection: string;
}

export interface D2FormData {
  // Tabblad 2: D2 formulier
  projectNumber: string;
  projectName: string;
  projectLeader: string;
  projectType: string;
  
  // Vooroverleg
  meetingDate: string;
  meetingLocation: string;
  participatingUtilities: string[];
  otherParticipants: string;
  
  // Algemeen
  numberOfHouses: number;
  numberOfApartments: number;
  numberOfCommercialSpaces: number;
  numberOfGeneralSpaces: number;
  
  // Capaciteiten
  electricityReturn: boolean;
  largeConsumptionConnection: boolean;
  largeConsumptionValue: string;
  heatPumpApplication: boolean;
  houseNumberDecision: boolean;
  
  // Tracé vragen
  groundOwnership: string;
  contaminatedGround: 'Ja' | 'Nee';
  obstacles: 'Ja' | 'Nee';
  specialConditions: 'Ja' | 'Nee';
  existingInfrastructure: 'Ja' | 'Nee';
  dewatering: 'Ja' | 'Nee';
  dewateringBy: string;
  trafficPlans: 'Ja' | 'Nee';
  trafficFacilitiesBy: string;
  phasing: string;
  
  // Aandachtspunten
  otherPoints: string;
  waterGasDistance?: boolean;
  waterSewerDistance?: boolean;
  highPressureGasDistance?: boolean;
  waterHeatDistance?: boolean;
  
  // Planning
  planStatus?: string;
  designReceived?: boolean;
  receivedDate?: string;
  softStartWeek?: string;
  hardStartWeek?: string;
  
  // Uitvoering
  trackInspection?: string;
  digitalMarking?: string;
  storageLocation?: string;
  
  // V&G RI&E/KAM
  risksDiscussed?: 'Standaard risico\'s besproken' | 'Specifieke risico\'s besproken';
  crow500?: boolean;
  riskExplanation?: string;
  
  // Overige opmerkingen
  additionalComments?: string;
}

export interface ElectricalCalculationData {
  // Tabblad 4: Invulformulier
  entries: ElectricalEntry[];
  totals: {
    totalHouses: number;
    totalSolarPanels: number;
    totalInverterPower: number;
    totalPrivateChargingStations: number;
    totalPublicChargingStations: number;
    totalHeatPumps: number;
  };
}

export interface ElectricalEntry {
  kavelNumber: string;
  houseType: string;
  numberOfHouses: number;
  connectionValue: string;
  heatingMethod: 'Warmtepomp' | 'Elektrisch' | 'Niet elektrisch';
  solarPanels: number;
  panelPower: number;
  totalPower: number;
  livingArea: number;
  heatPumpType: string;
  heatPumpPower: number;
  totalHeatPumpPower?: number;
  privateChargingPower: number;
  totalPrivateChargingPower: number;
  publicChargingPower: number;
  totalPublicChargingPower: number;
  comments?: string;
  notes?: string;
}

export interface ValidationData {
  // Tabblad 5: Validatie
  projectTypes: string[];
  groundOwnership: string[];
  heatingMethods: string[];
  houseTypes: string[];
  connectionValues: string[];
  heatPumpTypes: string[];
  risks: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SharePointListItem {
  Id: number;
  Title: string;
  [key: string]: any;
}

// Authentication types
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}
