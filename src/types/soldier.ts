export interface VitalSigns {
  heartRate: number;
  bodyTemperature: number;
  bloodOxygen: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  respirationRate: number;
  timestamp: Date;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'ammo' | 'gear' | 'medical' | 'communication';
  status: 'ready' | 'damaged' | 'missing';
  location: string;
  lastChecked: Date;
}

export interface Soldier {
  id: string;
  name: string;
  rank: string;
  unit: string;
  status: 'healthy' | 'warning' | 'critical' | 'inactive';
  vitalSigns: VitalSigns;
  equipment: Equipment[];
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  missionTime: number; // minutes
  fatigueLevel: number; // 0-100
  hydrationLevel: number; // 0-100
  lastUpdate: Date;
}

export interface SoldierMetrics {
  totalActiveSoldiers: number;
  healthySoldiers: number;
  warningCount: number;
  criticalCount: number;
  averageHeartRate: number;
  averageTemperature: number;
  equipmentReadyRate: number;
}