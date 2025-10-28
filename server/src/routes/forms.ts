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
  },
  {
    projectNumber: "PROJ-003",
    projectName: "Duurzame Wijk Watergraafsmeer",
    projectLeader: "Erik van Dijk",
    projectType: "Nieuwe aanleg",
    location: "Watergraafsmeer, Amsterdam",
    groundOwnership: "Openbaar (overheid)",
    workDescription: "Ontwikkeling van duurzame woonwijk met energieneutrale woningen",
    client: "Gemeente Amsterdam",
    clientName: "Gemeente Amsterdam",
    contactPerson: "Sandra Mulder",
    phoneNumber: "020-5551234",
    email: "sandra.mulder@amsterdam.nl",
    address: "Amstel 1, 1011 PN Amsterdam",
    applicationNumber: "APP-2024-003",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: true,
    archaeologyResearch: true,
    ngeReport: false,
    apartments: 48,
    apartmentsArea: 4800,
    rowHouses: 24,
    rowHousesArea: 3600,
    twoUnderOneRoof: 12,
    twoUnderOneRoofArea: 1800,
    detachedHouses: 8,
    detachedHousesArea: 1600,
    commercialSpaces: 6,
    commercialSpacesArea: 900,
    generalSpaces: 3,
    generalSpacesArea: 450,
    contaminatedGround: "Nee",
    fireHydrants: "Ja",
    connectionType1: 4,
    connectionType2: 3,
    connectionType3: 2,
    totalSolarPanels: 240,
    totalInverterPower: 96000,
    totalPrivateChargingStations: 92,
    totalPublicChargingStations: 8,
    totalHeatPumps: 92,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "NVT"
  },
  {
    projectNumber: "PROJ-004",
    projectName: "Herstructurering Oud-Zuid",
    projectLeader: "Marianne Smit",
    projectType: "Reconstructie",
    location: "Oud-Zuid, Rotterdam",
    groundOwnership: "Particulier",
    workDescription: "Herstructurering van bestaande wijk met focus op duurzaamheid",
    client: "Woningcorporatie Rotterdam",
    clientName: "Woningcorporatie Rotterdam",
    contactPerson: "Rob van der Laan",
    phoneNumber: "010-1234567",
    email: "rob.vanderlaan@woningcorporatie.nl",
    address: "Coolsingel 40, 3011 AD Rotterdam",
    applicationNumber: "APP-2024-004",
    designPlan: true,
    trackDrawing: true,
    soilData: false,
    natura2000Report: false,
    archaeologyResearch: false,
    ngeReport: true,
    apartments: 30,
    apartmentsArea: 3000,
    rowHouses: 15,
    rowHousesArea: 2250,
    twoUnderOneRoof: 6,
    twoUnderOneRoofArea: 900,
    detachedHouses: 3,
    detachedHousesArea: 600,
    commercialSpaces: 3,
    commercialSpacesArea: 450,
    generalSpaces: 2,
    generalSpacesArea: 300,
    contaminatedGround: "Ja",
    fireHydrants: "Ja",
    connectionType1: 2,
    connectionType2: 2,
    connectionType3: 1,
    totalSolarPanels: 150,
    totalInverterPower: 60000,
    totalPrivateChargingStations: 54,
    totalPublicChargingStations: 5,
    totalHeatPumps: 54,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "Woningen"
  },
  {
    projectNumber: "PROJ-005",
    projectName: "Energieneutrale Wijk Leidsche Rijn",
    projectLeader: "Tom de Jong",
    projectType: "Nieuwe aanleg",
    location: "Leidsche Rijn, Utrecht",
    groundOwnership: "Openbaar (overheid)",
    workDescription: "Ontwikkeling van energieneutrale woonwijk met smart grid technologie",
    client: "Gemeente Utrecht",
    clientName: "Gemeente Utrecht",
    contactPerson: "Linda van Beek",
    phoneNumber: "030-9876543",
    email: "linda.vanbeek@utrecht.nl",
    address: "Stadhuisbrug 1, 3511 LZ Utrecht",
    applicationNumber: "APP-2024-005",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: true,
    archaeologyResearch: true,
    ngeReport: false,
    apartments: 60,
    apartmentsArea: 6000,
    rowHouses: 30,
    rowHousesArea: 4500,
    twoUnderOneRoof: 15,
    twoUnderOneRoofArea: 2250,
    detachedHouses: 10,
    detachedHousesArea: 2000,
    commercialSpaces: 8,
    commercialSpacesArea: 1200,
    generalSpaces: 4,
    generalSpacesArea: 600,
    contaminatedGround: "Nee",
    fireHydrants: "Ja",
    connectionType1: 5,
    connectionType2: 4,
    connectionType3: 3,
    totalSolarPanels: 300,
    totalInverterPower: 120000,
    totalPrivateChargingStations: 115,
    totalPublicChargingStations: 10,
    totalHeatPumps: 115,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "NVT"
  },
  {
    projectNumber: "PROJ-006",
    projectName: "Transformatie Havenkwartier",
    projectLeader: "Annelies Bakker",
    projectType: "Reconstructie",
    location: "Havenkwartier, Den Haag",
    groundOwnership: "Particulier",
    workDescription: "Transformatie van industrieel gebied naar gemengde woonwijk",
    client: "Ontwikkelaar Havenkwartier BV",
    clientName: "Ontwikkelaar Havenkwartier BV",
    contactPerson: "Mark van der Meer",
    phoneNumber: "070-5559876",
    email: "mark.vandermeer@havenkwartier.nl",
    address: "Havenweg 123, 2586 AM Den Haag",
    applicationNumber: "APP-2024-006",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: false,
    archaeologyResearch: true,
    ngeReport: true,
    apartments: 42,
    apartmentsArea: 4200,
    rowHouses: 21,
    rowHousesArea: 3150,
    twoUnderOneRoof: 9,
    twoUnderOneRoofArea: 1350,
    detachedHouses: 6,
    detachedHousesArea: 1200,
    commercialSpaces: 5,
    commercialSpacesArea: 750,
    generalSpaces: 3,
    generalSpacesArea: 450,
    contaminatedGround: "Ja",
    fireHydrants: "Ja",
    connectionType1: 3,
    connectionType2: 3,
    connectionType3: 2,
    totalSolarPanels: 210,
    totalInverterPower: 84000,
    totalPrivateChargingStations: 78,
    totalPublicChargingStations: 7,
    totalHeatPumps: 78,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "Woningen"
  },
  {
    projectNumber: "PROJ-007",
    projectName: "Circulaire Wijk Stadspark",
    projectLeader: "Femke van der Berg",
    projectType: "Nieuwe aanleg",
    location: "Stadspark, Groningen",
    groundOwnership: "Openbaar (overheid)",
    workDescription: "Ontwikkeling van circulaire woonwijk met hergebruik van materialen",
    client: "Gemeente Groningen",
    clientName: "Gemeente Groningen",
    contactPerson: "Jeroen van der Wal",
    phoneNumber: "050-1234567",
    email: "jeroen.vanderwal@groningen.nl",
    address: "Grote Markt 1, 9712 HV Groningen",
    applicationNumber: "APP-2024-007",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: true,
    archaeologyResearch: true,
    ngeReport: false,
    apartments: 36,
    apartmentsArea: 3600,
    rowHouses: 18,
    rowHousesArea: 2700,
    twoUnderOneRoof: 9,
    twoUnderOneRoofArea: 1350,
    detachedHouses: 6,
    detachedHousesArea: 1200,
    commercialSpaces: 4,
    commercialSpacesArea: 600,
    generalSpaces: 2,
    generalSpacesArea: 300,
    contaminatedGround: "Nee",
    fireHydrants: "Ja",
    connectionType1: 3,
    connectionType2: 2,
    connectionType3: 1,
    totalSolarPanels: 180,
    totalInverterPower: 72000,
    totalPrivateChargingStations: 69,
    totalPublicChargingStations: 6,
    totalHeatPumps: 69,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "NVT"
  },
  {
    projectNumber: "PROJ-008",
    projectName: "Smart City Wijk Brainport",
    projectLeader: "Daan van der Heijden",
    projectType: "Nieuwe aanleg",
    location: "Brainport, Eindhoven",
    groundOwnership: "Openbaar (overheid)",
    workDescription: "Ontwikkeling van smart city woonwijk met IoT en duurzame technologie",
    client: "Gemeente Eindhoven",
    clientName: "Gemeente Eindhoven",
    contactPerson: "Sophie van der Ven",
    phoneNumber: "040-9876543",
    email: "sophie.vanderven@eindhoven.nl",
    address: "Stadhuisplein 1, 5611 EM Eindhoven",
    applicationNumber: "APP-2024-008",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: false,
    archaeologyResearch: true,
    ngeReport: false,
    apartments: 54,
    apartmentsArea: 5400,
    rowHouses: 27,
    rowHousesArea: 4050,
    twoUnderOneRoof: 12,
    twoUnderOneRoofArea: 1800,
    detachedHouses: 8,
    detachedHousesArea: 1600,
    commercialSpaces: 6,
    commercialSpacesArea: 900,
    generalSpaces: 3,
    generalSpacesArea: 450,
    contaminatedGround: "Nee",
    fireHydrants: "Ja",
    connectionType1: 4,
    connectionType2: 3,
    connectionType3: 2,
    totalSolarPanels: 270,
    totalInverterPower: 108000,
    totalPrivateChargingStations: 101,
    totalPublicChargingStations: 9,
    totalHeatPumps: 101,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "NVT"
  },
  {
    projectNumber: "PROJ-009",
    projectName: "Natuurinclusieve Wijk Groene Vallei",
    projectLeader: "Lotte van der Meer",
    projectType: "Nieuwe aanleg",
    location: "Groene Vallei, Nijmegen",
    groundOwnership: "Openbaar (overheid)",
    workDescription: "Ontwikkeling van natuurinclusieve woonwijk met groene daken en biodiversiteit",
    client: "Gemeente Nijmegen",
    clientName: "Gemeente Nijmegen",
    contactPerson: "Bas van der Pol",
    phoneNumber: "024-1234567",
    email: "bas.vanderpol@nijmegen.nl",
    address: "Burchtstraat 1, 6511 RA Nijmegen",
    applicationNumber: "APP-2024-009",
    designPlan: true,
    trackDrawing: true,
    soilData: true,
    natura2000Report: true,
    archaeologyResearch: true,
    ngeReport: false,
    apartments: 48,
    apartmentsArea: 4800,
    rowHouses: 24,
    rowHousesArea: 3600,
    twoUnderOneRoof: 12,
    twoUnderOneRoofArea: 1800,
    detachedHouses: 8,
    detachedHousesArea: 1600,
    commercialSpaces: 5,
    commercialSpacesArea: 750,
    generalSpaces: 3,
    generalSpacesArea: 450,
    contaminatedGround: "Nee",
    fireHydrants: "Ja",
    connectionType1: 4,
    connectionType2: 3,
    connectionType3: 2,
    totalSolarPanels: 240,
    totalInverterPower: 96000,
    totalPrivateChargingStations: 92,
    totalPublicChargingStations: 8,
    totalHeatPumps: 92,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "NVT"
  },
  {
    projectNumber: "PROJ-010",
    projectName: "Herontwikkeling Stationsgebied",
    projectLeader: "Rick van der Zee",
    projectType: "Reconstructie",
    location: "Stationsgebied, Tilburg",
    groundOwnership: "Particulier",
    workDescription: "Herontwikkeling van stationsgebied tot gemengde woon-werkwijk",
    client: "Ontwikkelaar Stationsgebied BV",
    clientName: "Ontwikkelaar Stationsgebied BV",
    contactPerson: "Nina van der Berg",
    phoneNumber: "013-5551234",
    email: "nina.vanderberg@stationsgebied.nl",
    address: "Spoorlaan 456, 5038 CB Tilburg",
    applicationNumber: "APP-2024-010",
    designPlan: true,
    trackDrawing: true,
    soilData: false,
    natura2000Report: false,
    archaeologyResearch: false,
    ngeReport: true,
    apartments: 66,
    apartmentsArea: 6600,
    rowHouses: 33,
    rowHousesArea: 4950,
    twoUnderOneRoof: 15,
    twoUnderOneRoofArea: 2250,
    detachedHouses: 10,
    detachedHousesArea: 2000,
    commercialSpaces: 10,
    commercialSpacesArea: 1500,
    generalSpaces: 5,
    generalSpacesArea: 750,
    contaminatedGround: "Ja",
    fireHydrants: "Ja",
    connectionType1: 5,
    connectionType2: 4,
    connectionType3: 3,
    totalSolarPanels: 330,
    totalInverterPower: 132000,
    totalPrivateChargingStations: 124,
    totalPublicChargingStations: 11,
    totalHeatPumps: 124,
    pvOnCvzConnection: "CVZ",
    largeConsumptionConnection: "Woningen"
  }
];

let d2FormData: D2FormData[] = [
  {
    projectNumber: "PROJ-001",
    projectName: "Nieuwbouw Woningen De Vliert",
    projectLeader: "Jan van der Berg",
    projectType: "Nieuwe aanleg",
    meetingDate: "2024-01-15",
    meetingLocation: "Gemeentehuis Den Haag",
    participatingUtilities: ["Stedin", "Evides", "Eneco"],
    otherParticipants: "Gemeente Den Haag, Architectenbureau",
    numberOfHouses: 24,
    numberOfApartments: 24,
    numberOfCommercialSpaces: 2,
    numberOfGeneralSpaces: 1,
    electricityReturn: true,
    largeConsumptionConnection: false,
    largeConsumptionValue: "",
    heatPumpApplication: true,
    houseNumberDecision: true,
    groundOwnership: "Openbaar (overheid)",
    contaminatedGround: "Nee",
    obstacles: "Nee",
    specialConditions: "Nee",
    existingInfrastructure: "Nee",
    dewatering: "Ja",
    dewateringBy: "Gemeente Den Haag",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Den Haag",
    phasing: "Fase 1: Woningen, Fase 2: Commercieel",
    otherPoints: "Aandacht voor duurzame energievoorziening en groene daken"
  },
  {
    projectNumber: "PROJ-002",
    projectName: "Renovatie Wijk Centrum",
    projectLeader: "Lisa de Vries",
    projectType: "Reconstructie",
    meetingDate: "2024-01-20",
    meetingLocation: "Woningcorporatie Amsterdam",
    participatingUtilities: ["Liander", "Waternet", "Vattenfall"],
    otherParticipants: "Woningcorporatie Amsterdam, Aannemer",
    numberOfHouses: 18,
    numberOfApartments: 36,
    numberOfCommercialSpaces: 4,
    numberOfGeneralSpaces: 2,
    electricityReturn: true,
    largeConsumptionConnection: true,
    largeConsumptionValue: "Woningen",
    heatPumpApplication: true,
    houseNumberDecision: false,
    groundOwnership: "Particulier",
    contaminatedGround: "Ja",
    obstacles: "Ja",
    specialConditions: "Ja",
    existingInfrastructure: "Ja",
    dewatering: "Nee",
    dewateringBy: "",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Amsterdam",
    phasing: "Geleidelijke renovatie per blok",
    otherPoints: "Aandacht voor bestaande infrastructuur en bewonersoverlast"
  },
  {
    projectNumber: "PROJ-003",
    projectName: "Duurzame Wijk Watergraafsmeer",
    projectLeader: "Erik van Dijk",
    projectType: "Nieuwe aanleg",
    meetingDate: "2024-02-01",
    meetingLocation: "Gemeentehuis Amsterdam",
    participatingUtilities: ["Liander", "Waternet", "Eneco"],
    otherParticipants: "Gemeente Amsterdam, Duurzaamheidsadviseur",
    numberOfHouses: 50,
    numberOfApartments: 48,
    numberOfCommercialSpaces: 6,
    numberOfGeneralSpaces: 3,
    electricityReturn: true,
    largeConsumptionConnection: false,
    largeConsumptionValue: "",
    heatPumpApplication: true,
    houseNumberDecision: true,
    groundOwnership: "Openbaar (overheid)",
    contaminatedGround: "Nee",
    obstacles: "Nee",
    specialConditions: "Ja",
    existingInfrastructure: "Nee",
    dewatering: "Ja",
    dewateringBy: "Gemeente Amsterdam",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Amsterdam",
    phasing: "Fase 1: Woningen, Fase 2: Commercieel en algemeen",
    otherPoints: "Focus op energieneutraliteit en natuurinclusiviteit"
  },
  {
    projectNumber: "PROJ-004",
    projectName: "Herstructurering Oud-Zuid",
    projectLeader: "Marianne Smit",
    projectType: "Reconstructie",
    meetingDate: "2024-02-10",
    meetingLocation: "Woningcorporatie Rotterdam",
    participatingUtilities: ["Stedin", "Evides", "Eneco"],
    otherParticipants: "Woningcorporatie Rotterdam, Stedenbouwkundige",
    numberOfHouses: 24,
    numberOfApartments: 30,
    numberOfCommercialSpaces: 3,
    numberOfGeneralSpaces: 2,
    electricityReturn: true,
    largeConsumptionConnection: true,
    largeConsumptionValue: "Woningen",
    heatPumpApplication: true,
    houseNumberDecision: false,
    groundOwnership: "Particulier",
    contaminatedGround: "Ja",
    obstacles: "Ja",
    specialConditions: "Ja",
    existingInfrastructure: "Ja",
    dewatering: "Ja",
    dewateringBy: "Woningcorporatie Rotterdam",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Rotterdam",
    phasing: "Stapsgewijze herstructurering",
    otherPoints: "Aandacht voor historische waarden en duurzaamheid"
  },
  {
    projectNumber: "PROJ-005",
    projectName: "Energieneutrale Wijk Leidsche Rijn",
    projectLeader: "Tom de Jong",
    projectType: "Nieuwe aanleg",
    meetingDate: "2024-02-15",
    meetingLocation: "Gemeentehuis Utrecht",
    participatingUtilities: ["Stedin", "Vitens", "Eneco"],
    otherParticipants: "Gemeente Utrecht, Smart Grid specialist",
    numberOfHouses: 55,
    numberOfApartments: 60,
    numberOfCommercialSpaces: 8,
    numberOfGeneralSpaces: 4,
    electricityReturn: true,
    largeConsumptionConnection: false,
    largeConsumptionValue: "",
    heatPumpApplication: true,
    houseNumberDecision: true,
    groundOwnership: "Openbaar (overheid)",
    contaminatedGround: "Nee",
    obstacles: "Nee",
    specialConditions: "Ja",
    existingInfrastructure: "Nee",
    dewatering: "Ja",
    dewateringBy: "Gemeente Utrecht",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Utrecht",
    phasing: "Fase 1: Woningen, Fase 2: Commercieel, Fase 3: Algemeen",
    otherPoints: "Smart grid technologie en energieneutraliteit centraal"
  },
  {
    projectNumber: "PROJ-006",
    projectName: "Transformatie Havenkwartier",
    projectLeader: "Annelies Bakker",
    projectType: "Reconstructie",
    meetingDate: "2024-02-20",
    meetingLocation: "Ontwikkelaar Havenkwartier BV",
    participatingUtilities: ["Stedin", "Evides", "Eneco"],
    otherParticipants: "Ontwikkelaar Havenkwartier BV, Milieudeskundige",
    numberOfHouses: 36,
    numberOfApartments: 42,
    numberOfCommercialSpaces: 5,
    numberOfGeneralSpaces: 3,
    electricityReturn: true,
    largeConsumptionConnection: true,
    largeConsumptionValue: "Woningen",
    heatPumpApplication: true,
    houseNumberDecision: false,
    groundOwnership: "Particulier",
    contaminatedGround: "Ja",
    obstacles: "Ja",
    specialConditions: "Ja",
    existingInfrastructure: "Ja",
    dewatering: "Ja",
    dewateringBy: "Ontwikkelaar Havenkwartier BV",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Den Haag",
    phasing: "Transformatie van industrieel naar woongebied",
    otherPoints: "Sanering van vervuilde grond en nieuwe infrastructuur"
  },
  {
    projectNumber: "PROJ-007",
    projectName: "Circulaire Wijk Stadspark",
    projectLeader: "Femke van der Berg",
    projectType: "Nieuwe aanleg",
    meetingDate: "2024-03-01",
    meetingLocation: "Gemeentehuis Groningen",
    participatingUtilities: ["Enexis", "Waterbedrijf Groningen", "Eneco"],
    otherParticipants: "Gemeente Groningen, Circulaire economie expert",
    numberOfHouses: 33,
    numberOfApartments: 36,
    numberOfCommercialSpaces: 4,
    numberOfGeneralSpaces: 2,
    electricityReturn: true,
    largeConsumptionConnection: false,
    largeConsumptionValue: "",
    heatPumpApplication: true,
    houseNumberDecision: true,
    groundOwnership: "Openbaar (overheid)",
    contaminatedGround: "Nee",
    obstacles: "Nee",
    specialConditions: "Ja",
    existingInfrastructure: "Nee",
    dewatering: "Ja",
    dewateringBy: "Gemeente Groningen",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Groningen",
    phasing: "Fase 1: Woningen, Fase 2: Commercieel en algemeen",
    otherPoints: "Focus op circulaire materialen en hergebruik"
  },
  {
    projectNumber: "PROJ-008",
    projectName: "Smart City Wijk Brainport",
    projectLeader: "Daan van der Heijden",
    projectType: "Nieuwe aanleg",
    meetingDate: "2024-03-05",
    meetingLocation: "Gemeentehuis Eindhoven",
    participatingUtilities: ["Enexis", "Brabant Water", "Eneco"],
    otherParticipants: "Gemeente Eindhoven, IoT specialist",
    numberOfHouses: 47,
    numberOfApartments: 54,
    numberOfCommercialSpaces: 6,
    numberOfGeneralSpaces: 3,
    electricityReturn: true,
    largeConsumptionConnection: false,
    largeConsumptionValue: "",
    heatPumpApplication: true,
    houseNumberDecision: true,
    groundOwnership: "Openbaar (overheid)",
    contaminatedGround: "Nee",
    obstacles: "Nee",
    specialConditions: "Ja",
    existingInfrastructure: "Nee",
    dewatering: "Ja",
    dewateringBy: "Gemeente Eindhoven",
    trafficPlans: "Ja",
    trafficFacilitiesBy: "Gemeente Eindhoven",
    phasing: "Fase 1: Woningen, Fase 2: Commercieel, Fase 3: Algemeen",
    otherPoints: "Smart city technologie en IoT integratie"
  }
];

let electricalData: ElectricalCalculationData[] = [
  {
    entries: [
      {
        kavelNumber: "K1-K12",
        houseType: "Rijtjeswoning",
        numberOfHouses: 12,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 60,
        panelPower: 400,
        totalPower: 24000,
        livingArea: 120,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 5,
        privateChargingPower: 11,
        totalPrivateChargingPower: 132,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        comments: "Duurzame energievoorziening"
      },
      {
        kavelNumber: "K13-K20",
        houseType: "Appartement",
        numberOfHouses: 8,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 40,
        panelPower: 400,
        totalPower: 16000,
        livingArea: 80,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 4,
        privateChargingPower: 11,
        totalPrivateChargingPower: 88,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        comments: "Collectieve warmtepomp installatie"
      },
      {
        kavelNumber: "K21-K24",
        houseType: "Twee-onder-een-kap",
        numberOfHouses: 4,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 20,
        panelPower: 400,
        totalPower: 8000,
        livingArea: 150,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 6,
        privateChargingPower: 11,
        totalPrivateChargingPower: 44,
        publicChargingPower: 0,
        totalPublicChargingPower: 0,
        comments: "Individuele warmtepomp per woning"
      }
    ],
    totals: {
      totalHouses: 24,
      totalSolarPanels: 120,
      totalInverterPower: 48000,
      totalPrivateChargingStations: 24,
      totalPublicChargingStations: 2,
      totalHeatPumps: 24
    }
  },
  {
    entries: [
      {
        kavelNumber: "K1-K18",
        houseType: "Rijtjeswoning",
        numberOfHouses: 18,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 90,
        panelPower: 400,
        totalPower: 36000,
        livingArea: 100,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 5,
        privateChargingPower: 11,
        totalPrivateChargingPower: 198,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Renovatie met duurzame verbeteringen"
      },
      {
        kavelNumber: "K19-K36",
        houseType: "Appartement",
        numberOfHouses: 18,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 90,
        panelPower: 400,
        totalPower: 36000,
        livingArea: 75,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 4,
        privateChargingPower: 11,
        totalPrivateChargingPower: 198,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Collectieve warmtepomp voor appartementen"
      }
    ],
    totals: {
      totalHouses: 36,
      totalSolarPanels: 180,
      totalInverterPower: 72000,
      totalPrivateChargingStations: 36,
      totalPublicChargingStations: 4,
      totalHeatPumps: 36
    }
  },
  {
    entries: [
      {
        kavelNumber: "K1-K24",
        houseType: "Rijtjeswoning",
        numberOfHouses: 24,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 120,
        panelPower: 400,
        totalPower: 48000,
        livingArea: 120,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 5,
        privateChargingPower: 11,
        totalPrivateChargingPower: 264,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Energieneutrale woningen"
      },
      {
        kavelNumber: "K25-K48",
        houseType: "Appartement",
        numberOfHouses: 24,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 120,
        panelPower: 400,
        totalPower: 48000,
        livingArea: 80,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 4,
        privateChargingPower: 11,
        totalPrivateChargingPower: 264,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Smart grid integratie"
      },
      {
        kavelNumber: "K49-K56",
        houseType: "Twee-onder-een-kap",
        numberOfHouses: 8,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 40,
        panelPower: 400,
        totalPower: 16000,
        livingArea: 150,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 6,
        privateChargingPower: 11,
        totalPrivateChargingPower: 88,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        notes: "Individuele warmtepomp installaties"
      }
    ],
    totals: {
      totalHouses: 56,
      totalSolarPanels: 280,
      totalInverterPower: 112000,
      totalPrivateChargingStations: 56,
      totalPublicChargingStations: 5,
      totalHeatPumps: 56
    }
  },
  {
    entries: [
      {
        kavelNumber: "K1-K15",
        houseType: "Rijtjeswoning",
        numberOfHouses: 15,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 75,
        panelPower: 400,
        totalPower: 30000,
        livingArea: 110,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 5,
        privateChargingPower: 11,
        totalPrivateChargingPower: 165,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        notes: "Herstructurering met duurzame elementen"
      },
      {
        kavelNumber: "K16-K30",
        houseType: "Appartement",
        numberOfHouses: 15,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 75,
        panelPower: 400,
        totalPower: 30000,
        livingArea: 70,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 4,
        privateChargingPower: 11,
        totalPrivateChargingPower: 165,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        notes: "Collectieve warmtepomp systeem"
      }
    ],
    totals: {
      totalHouses: 30,
      totalSolarPanels: 150,
      totalInverterPower: 60000,
      totalPrivateChargingStations: 30,
      totalPublicChargingStations: 2,
      totalHeatPumps: 30
    }
  },
  {
    entries: [
      {
        kavelNumber: "K1-K30",
        houseType: "Rijtjeswoning",
        numberOfHouses: 30,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 150,
        panelPower: 400,
        totalPower: 60000,
        livingArea: 120,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 5,
        privateChargingPower: 11,
        totalPrivateChargingPower: 330,
        publicChargingPower: 22,
        totalPublicChargingPower: 66,
        notes: "Smart grid technologie"
      },
      {
        kavelNumber: "K31-K60",
        houseType: "Appartement",
        numberOfHouses: 30,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 150,
        panelPower: 400,
        totalPower: 60000,
        livingArea: 80,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 4,
        privateChargingPower: 11,
        totalPrivateChargingPower: 330,
        publicChargingPower: 22,
        totalPublicChargingPower: 66,
        notes: "Energieneutrale appartementen"
      },
      {
        kavelNumber: "K61-K75",
        houseType: "Twee-onder-een-kap",
        numberOfHouses: 15,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 75,
        panelPower: 400,
        totalPower: 30000,
        livingArea: 150,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 6,
        privateChargingPower: 11,
        totalPrivateChargingPower: 165,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Individuele warmtepomp per woning"
      }
    ],
    totals: {
      totalHouses: 75,
      totalSolarPanels: 375,
      totalInverterPower: 150000,
      totalPrivateChargingStations: 75,
      totalPublicChargingStations: 8,
      totalHeatPumps: 75
    }
  },
  {
    entries: [
      {
        kavelNumber: "K1-K21",
        houseType: "Rijtjeswoning",
        numberOfHouses: 21,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 105,
        panelPower: 400,
        totalPower: 42000,
        livingArea: 115,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 5,
        privateChargingPower: 11,
        totalPrivateChargingPower: 231,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        notes: "Transformatie van industrieel gebied"
      },
      {
        kavelNumber: "K22-K42",
        houseType: "Appartement",
        numberOfHouses: 21,
        connectionValue: "1x25A",
        heatingMethod: "Warmtepomp",
        solarPanels: 105,
        panelPower: 400,
        totalPower: 42000,
        livingArea: 75,
        heatPumpType: "Lucht-water warmtepomp",
        heatPumpPower: 4,
        privateChargingPower: 11,
        totalPrivateChargingPower: 231,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        notes: "Sanering en nieuwe infrastructuur"
      }
    ],
    totals: {
      totalHouses: 42,
      totalSolarPanels: 210,
      totalInverterPower: 84000,
      totalPrivateChargingStations: 42,
      totalPublicChargingStations: 4,
      totalHeatPumps: 42
    }
  }
];

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
