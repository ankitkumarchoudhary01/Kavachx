import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Soldier } from '../types/soldier';

export const fetchSoldiersFromFirebase = async (): Promise<Soldier[]> => {
  try {
    const soldiersCollection = collection(db, 'soldiers');
    const q = query(soldiersCollection, limit(100));
    const snapshot = await getDocs(q);
    
    const soldiers: Soldier[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      soldiers.push({
        id: doc.id,
        name: data.name,
        rank: data.rank,
        unit: data.unit,
        status: data.status || 'healthy',
        vitalSigns: {
          heartRate: data.vitalSigns?.heartRate || 70,
          bodyTemperature: data.vitalSigns?.bodyTemperature || 37.0,
          bloodOxygen: data.vitalSigns?.bloodOxygen || 98,
          bloodPressure: data.vitalSigns?.bloodPressure || { systolic: 120, diastolic: 80 },
          respirationRate: data.vitalSigns?.respirationRate || 16,
          timestamp: data.vitalSigns?.timestamp ? new Date(data.vitalSigns.timestamp) : new Date(),
        },
        equipment: (data.equipment || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          status: item.status,
          location: item.location,
          lastChecked: item.lastChecked ? new Date(item.lastChecked) : new Date(),
        })),
        location: {
          latitude: data.location?.latitude || 0,
          longitude: data.location?.longitude || 0,
          altitude: data.location?.altitude || 0,
        },
        missionTime: data.missionTime || 0,
        fatigueLevel: data.fatigueLevel || 0,
        hydrationLevel: data.hydrationLevel || 100,
        lastUpdate: data.lastUpdate ? new Date(data.lastUpdate) : new Date(),
      });
    });
    
    return soldiers;
  } catch (error) {
    console.error('Error fetching soldiers from Firebase:', error);
    return [];
  }
};

export const fetchSoldierById = async (id: string): Promise<Soldier | null> => {
  try {
    const soldiersCollection = collection(db, 'soldiers');
    const q = query(soldiersCollection);
    const snapshot = await getDocs(q);
    
    let foundSoldier: Soldier | null = null;
    snapshot.forEach((doc) => {
      if (doc.id === id) {
        const data = doc.data();
        foundSoldier = {
          id: doc.id,
          name: data.name,
          rank: data.rank,
          unit: data.unit,
          status: data.status || 'healthy',
          vitalSigns: {
            heartRate: data.vitalSigns?.heartRate || 70,
            bodyTemperature: data.vitalSigns?.bodyTemperature || 37.0,
            bloodOxygen: data.vitalSigns?.bloodOxygen || 98,
            bloodPressure: data.vitalSigns?.bloodPressure || { systolic: 120, diastolic: 80 },
            respirationRate: data.vitalSigns?.respirationRate || 16,
            timestamp: data.vitalSigns?.timestamp ? new Date(data.vitalSigns.timestamp) : new Date(),
          },
          equipment: (data.equipment || []).map((item: any) => ({
            id: item.id,
            name: item.name,
            type: item.type,
            status: item.status,
            location: item.location,
            lastChecked: item.lastChecked ? new Date(item.lastChecked) : new Date(),
          })),
          location: {
            latitude: data.location?.latitude || 0,
            longitude: data.location?.longitude || 0,
            altitude: data.location?.altitude || 0,
          },
          missionTime: data.missionTime || 0,
          fatigueLevel: data.fatigueLevel || 0,
          hydrationLevel: data.hydrationLevel || 100,
          lastUpdate: data.lastUpdate ? new Date(data.lastUpdate) : new Date(),
        };
      }
    });
    
    return foundSoldier;
  } catch (error) {
    console.error('Error fetching soldier from Firebase:', error);
    return null;
  }
};
