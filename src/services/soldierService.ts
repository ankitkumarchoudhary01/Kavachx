import { ref, get, child } from 'firebase/database';
import { db } from '../config/firebase';
import type { Soldier } from '../types/soldier';

export const fetchSoldiersFromFirebase = async (): Promise<Soldier[]> => {
  try {
    // Reference to the soldiers data path in Realtime Database
    const dbRef = ref(db, 'data/history');
    const snapshot = await get(dbRef);
    
    if (!snapshot.exists()) {
      console.warn('No data found at /data/history path');
      return [];
    }

    const data = snapshot.val();
    const soldiers: Soldier[] = [];

    // Handle different data structures
    if (Array.isArray(data)) {
      // If data is an array
      data.forEach((item: any, index: number) => {
        if (item) {
          soldiers.push(transformSoldierData(item, String(index)));
        }
      });
    } else if (typeof data === 'object') {
      // If data is an object with keys
      Object.entries(data).forEach(([key, value]: [string, any]) => {
        if (value) {
          soldiers.push(transformSoldierData(value, key));
        }
      });
    }

    return soldiers;
  } catch (error) {
    console.error('Error fetching soldiers from Firebase Realtime Database:', error);
    return [];
  }
};

export const fetchSoldierById = async (id: string): Promise<Soldier | null> => {
  try {
    const dbRef = ref(db, `data/history/${id}`);
    const snapshot = await get(dbRef);
    
    if (!snapshot.exists()) {
      console.warn(`No soldier found with ID: ${id}`);
      return null;
    }

    return transformSoldierData(snapshot.val(), id);
  } catch (error) {
    console.error('Error fetching soldier from Firebase Realtime Database:', error);
    return null;
  }
};

// Helper function to transform Realtime Database data to Soldier type
const transformSoldierData = (data: any, id: string): Soldier => {
  return {
    id: data.id || id,
    name: data.name || 'Unknown Soldier',
    rank: data.rank || 'PVT',
    unit: data.unit || 'Unknown Unit',
    status: data.status || 'healthy',
    vitalSigns: {
      heartRate: data.vitalSigns?.heartRate || data.heartRate || 70,
      bodyTemperature: data.vitalSigns?.bodyTemperature || data.bodyTemperature || 37.0,
      bloodOxygen: data.vitalSigns?.bloodOxygen || data.bloodOxygen || 98,
      bloodPressure: data.vitalSigns?.bloodPressure || data.bloodPressure || { systolic: 120, diastolic: 80 },
      respirationRate: data.vitalSigns?.respirationRate || data.respirationRate || 16,
      timestamp: data.vitalSigns?.timestamp 
        ? new Date(data.vitalSigns.timestamp) 
        : data.timestamp 
        ? new Date(data.timestamp)
        : new Date(),
    },
    equipment: Array.isArray(data.equipment) 
      ? data.equipment.map((item: any) => ({
          id: item.id || Math.random().toString(),
          name: item.name || 'Equipment',
          type: item.type || 'gear',
          status: item.status || 'ready',
          location: item.location || 'Unknown',
          lastChecked: item.lastChecked ? new Date(item.lastChecked) : new Date(),
        }))
      : [],
    location: {
      latitude: data.location?.latitude || data.latitude || 0,
      longitude: data.location?.longitude || data.longitude || 0,
      altitude: data.location?.altitude || data.altitude || 0,
    },
    missionTime: data.missionTime || 0,
    fatigueLevel: data.fatigueLevel || 0,
    hydrationLevel: data.hydrationLevel || 100,
    lastUpdate: data.lastUpdate 
      ? new Date(data.lastUpdate) 
      : new Date(),
  };
};
