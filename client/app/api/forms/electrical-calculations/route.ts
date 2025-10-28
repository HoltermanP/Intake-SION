// Next.js API route voor alle elektrische berekeningen
import { NextRequest, NextResponse } from 'next/server';

// Mock elektrische berekeningen data (same as in the individual route)
const electricalData = [
  {
    projectNumber: "PROJ-001",
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
        totalHeatPumpPower: 60,
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
        totalHeatPumpPower: 32,
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
        totalHeatPumpPower: 24,
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
    projectNumber: "PROJ-002",
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
        totalHeatPumpPower: 90,
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
        totalHeatPumpPower: 72,
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
    projectNumber: "PROJ-003",
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
        totalHeatPumpPower: 120,
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
        totalHeatPumpPower: 96,
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
        totalHeatPumpPower: 48,
        privateChargingPower: 11,
        totalPrivateChargingPower: 88,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        comments: "Individuele warmtepomp installaties"
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
    projectNumber: "PROJ-004",
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
        totalHeatPumpPower: 75,
        privateChargingPower: 11,
        totalPrivateChargingPower: 165,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        comments: "Herstructurering met duurzame elementen"
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
        totalHeatPumpPower: 60,
        privateChargingPower: 11,
        totalPrivateChargingPower: 165,
        publicChargingPower: 22,
        totalPublicChargingPower: 22,
        comments: "Collectieve warmtepomp systeem"
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
    projectNumber: "PROJ-005",
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
        totalHeatPumpPower: 150,
        privateChargingPower: 11,
        totalPrivateChargingPower: 330,
        publicChargingPower: 22,
        totalPublicChargingPower: 66,
        comments: "Smart grid technologie"
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
        totalHeatPumpPower: 120,
        privateChargingPower: 11,
        totalPrivateChargingPower: 330,
        publicChargingPower: 22,
        totalPublicChargingPower: 66,
        comments: "Energieneutrale appartementen"
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
        totalHeatPumpPower: 90,
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
    projectNumber: "PROJ-006",
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
        totalHeatPumpPower: 105,
        privateChargingPower: 11,
        totalPrivateChargingPower: 231,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Transformatie van industrieel gebied"
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
        totalHeatPumpPower: 84,
        privateChargingPower: 11,
        totalPrivateChargingPower: 231,
        publicChargingPower: 22,
        totalPublicChargingPower: 44,
        comments: "Sanering en nieuwe infrastructuur"
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

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: electricalData
    });
  } catch (error) {
    console.error('Error fetching electrical calculations:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch electrical calculations'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In een echte app zou je hier de data opslaan in een database
    console.log('Electrical calculation submitted:', data);
    
    return NextResponse.json({
      success: true,
      message: 'Electrical calculation submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting electrical calculation:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to submit electrical calculation'
    }, { status: 500 });
  }
}
