import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { HealthMetricsOverview } from '../components/soldier/HealthMetricsOverview';
import { SoldierCard } from '../components/soldier/SoldierCard';
import { VitalSignsCard } from '../components/soldier/VitalSignsCard';
import { EquipmentStatus } from '../components/soldier/EquipmentStatus';
import { SoldierLocationMap } from '../components/soldier/LocationMap';
import { useSoldierStore } from '../store/soldierStore';
import type { Soldier } from '../types/soldier';

const mockSoldiers: Soldier[] = [
  {
    id: '1',
    name: 'John Smith',
    rank: 'SGT',
    unit: 'Alpha Squad',
    status: 'healthy',
    vitalSigns: {
      heartRate: 75,
      bodyTemperature: 37.2,
      bloodOxygen: 98,
      bloodPressure: { systolic: 120, diastolic: 80 },
      respirationRate: 16,
      timestamp: new Date(),
    },
    equipment: [
      { id: '1', name: 'Assault Rifle', type: 'weapon', status: 'ready', location: 'Holster', lastChecked: new Date() },
      { id: '2', name: 'Ammunition', type: 'ammo', status: 'ready', location: 'Vest', lastChecked: new Date() },
      { id: '3', name: 'Body Armor', type: 'gear', status: 'ready', location: 'Torso', lastChecked: new Date() },
      { id: '4', name: 'Medical Kit', type: 'medical', status: 'ready', location: 'Backpack', lastChecked: new Date() },
    ],
    location: { latitude: 40.7128, longitude: -74.006, altitude: 10 },
    missionTime: 245,
    fatigueLevel: 35,
    hydrationLevel: 75,
    lastUpdate: new Date(),
  },
  {
    id: '2',
    name: 'Maria Johnson',
    rank: 'CPL',
    unit: 'Bravo Squad',
    status: 'warning',
    vitalSigns: {
      heartRate: 105,
      bodyTemperature: 38.1,
      bloodOxygen: 96,
      bloodPressure: { systolic: 135, diastolic: 85 },
      respirationRate: 22,
      timestamp: new Date(),
    },
    equipment: [
      { id: '5', name: 'Assault Rifle', type: 'weapon', status: 'ready', location: 'Holster', lastChecked: new Date() },
      { id: '6', name: 'Ammunition', type: 'ammo', status: 'damaged', location: 'Vest', lastChecked: new Date() },
      { id: '7', name: 'Body Armor', type: 'gear', status: 'ready', location: 'Torso', lastChecked: new Date() },
      { id: '8', name: 'Radio', type: 'communication', status: 'ready', location: 'Backpack', lastChecked: new Date() },
    ],
    location: { latitude: 35.6762, longitude: 139.6503, altitude: 15 },
    missionTime: 310,
    fatigueLevel: 65,
    hydrationLevel: 45,
    lastUpdate: new Date(),
  },
  {
    id: '3',
    name: 'Michael Chen',
    rank: 'PVT',
    unit: 'Alpha Squad',
    status: 'critical',
    vitalSigns: {
      heartRate: 125,
      bodyTemperature: 39.5,
      bloodOxygen: 93,
      bloodPressure: { systolic: 145, diastolic: 92 },
      respirationRate: 28,
      timestamp: new Date(),
    },
    equipment: [
      { id: '9', name: 'Assault Rifle', type: 'weapon', status: 'missing', location: 'Unknown', lastChecked: new Date() },
      { id: '10', name: 'Ammunition', type: 'ammo', status: 'ready', location: 'Vest', lastChecked: new Date() },
      { id: '11', name: 'Body Armor', type: 'gear', status: 'damaged', location: 'Torso', lastChecked: new Date() },
      { id: '12', name: 'Medical Kit', type: 'medical', status: 'ready', location: 'Backpack', lastChecked: new Date() },
    ],
    location: { latitude: 48.8566, longitude: 2.3522, altitude: 20 },
    missionTime: 420,
    fatigueLevel: 92,
    hydrationLevel: 20,
    lastUpdate: new Date(),
  },
  {
    id: '4',
    name: 'Sarah Williams',
    rank: 'SGT',
    unit: 'Charlie Squad',
    status: 'healthy',
    vitalSigns: {
      heartRate: 68,
      bodyTemperature: 36.8,
      bloodOxygen: 99,
      bloodPressure: { systolic: 118, diastolic: 78 },
      respirationRate: 14,
      timestamp: new Date(),
    },
    equipment: [
      { id: '13', name: 'Rifle', type: 'weapon', status: 'ready', location: 'Holster', lastChecked: new Date() },
      { id: '14', name: 'Ammunition', type: 'ammo', status: 'ready', location: 'Vest', lastChecked: new Date() },
      { id: '15', name: 'Body Armor', type: 'gear', status: 'ready', location: 'Torso', lastChecked: new Date() },
      { id: '16', name: 'GPS Device', type: 'communication', status: 'ready', location: 'Backpack', lastChecked: new Date() },
    ],
    location: { latitude: 11.5074, longitude: -0.1278, altitude: 12 },
    missionTime: 180,
    fatigueLevel: 28,
    hydrationLevel: 88,
    lastUpdate: new Date(),
  },
];

export const SoldierHealthDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [soldiers, setSoldiers] = useState<Soldier[]>(mockSoldiers);
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier>(mockSoldiers[0]);
  const { updateMetrics } = useSoldierStore();

  useEffect(() => {
    // Simulate real-time vital signs updates
    const interval = setInterval(() => {
      setSoldiers((prevSoldiers) =>
        prevSoldiers.map((soldier) => ({
          ...soldier,
          vitalSigns: {
            ...soldier.vitalSigns,
            heartRate: Math.max(50, Math.min(150, soldier.vitalSigns.heartRate + Math.floor((Math.random() - 0.5) * 10))),
            bodyTemperature: Math.max(36, Math.min(40, soldier.vitalSigns.bodyTemperature + (Math.random() - 0.5) * 0.3)),
            bloodOxygen: Math.min(100, Math.max(90, soldier.vitalSigns.bloodOxygen + (Math.random() - 0.5) * 2)),
            respirationRate: Math.max(10, Math.min(35, soldier.vitalSigns.respirationRate + Math.floor((Math.random() - 0.5) * 4))),
            timestamp: new Date(),
          },
          fatigueLevel: Math.min(100, soldier.fatigueLevel + Math.random() * 2),
          hydrationLevel: Math.max(0, soldier.hydrationLevel - Math.random() * 1),
        }))
      );
    }, 3000);

    // Update metrics
    const healthy = soldiers.filter((s) => s.status === 'healthy').length;
    const warning = soldiers.filter((s) => s.status === 'warning').length;
    const critical = soldiers.filter((s) => s.status === 'critical').length;
    const avgHeartRate = soldiers.reduce((sum, s) => sum + s.vitalSigns.heartRate, 0) / soldiers.length;
    const avgTemp = soldiers.reduce((sum, s) => sum + s.vitalSigns.bodyTemperature, 0) / soldiers.length;
    const equipmentReady =
      (soldiers.reduce((sum, s) => sum + s.equipment.filter((e) => e.status === 'ready').length, 0) /
        soldiers.reduce((sum, s) => sum + s.equipment.length, 0)) *
      100;

    updateMetrics({
      totalActiveSoldiers: soldiers.length,
      healthySoldiers: healthy,
      warningCount: warning,
      criticalCount: critical,
      averageHeartRate: Math.round(avgHeartRate),
      averageTemperature: parseFloat(avgTemp.toFixed(1)),
      equipmentReadyRate: equipmentReady,
    });

    return () => clearInterval(interval);
  }, [soldiers, updateMetrics]);

  const displaySoldier = selectedSoldier || soldiers[0];

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            {/* Page Title
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-8"
              style={{ color: THEME.colors.accent }}
            >
              Soldier Health Monitoring System
            </motion.h1> */}

            {/* Metrics Overview */}
            <HealthMetricsOverview metrics={useSoldierStore((state) => state.metrics)} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Soldiers List */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: THEME.colors.accent }}>
                  Squad Members ({soldiers.length})
                </h2>
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
                  {soldiers.map((soldier, idx) => (
                    <SoldierCard
                      key={soldier.id}
                      soldier={soldier}
                      index={idx}
                      isSelected={selectedSoldier?.id === soldier.id}
                      onSelect={setSelectedSoldier}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Vital Signs */}
                <div className="mb-8 lg:col-span-2">
                  <VitalSignsCard
                    vitalSigns={displaySoldier.vitalSigns}
                    soldierName={displaySoldier.name}
                    status={displaySoldier.status === 'inactive' ? 'healthy' : (displaySoldier.status as any)}
                    onShowDetails={() => navigate(`/soldier/${displaySoldier.id}`)}
                  />
                </div>

            </div>

            {/* Selected Soldier Details */}
            {displaySoldier && (
              <>
                
                {/* Equipment & Mission Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <EquipmentStatus
                    equipment={displaySoldier.equipment}
                    soldierName={displaySoldier.name}
                  />

                  {/* Mission Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border"
                    style={{
                      backgroundColor: THEME.colors.surface,
                      borderColor: THEME.colors.border,
                    }}
                  >
                    <h3 className="text-lg font-bold mb-6" style={{ color: THEME.colors.accent }}>
                      Mission Status - {displaySoldier.name}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span style={{ color: THEME.colors.textSecondary }}>Mission Time</span>
                          <span style={{ color: THEME.colors.text, fontWeight: 'bold' }}>
                            {displaySoldier.missionTime} min
                          </span>
                        </div>
                        <div
                          style={{
                            height: '8px',
                            backgroundColor: THEME.colors.border,
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(displaySoldier.missionTime / 480) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            style={{
                              height: '100%',
                              backgroundColor: THEME.colors.accent,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span style={{ color: THEME.colors.textSecondary }}>Fatigue Level</span>
                          <span
                            style={{
                              color:
                                displaySoldier.fatigueLevel > 70
                                  ? THEME.colors.critical
                                  : displaySoldier.fatigueLevel > 50
                                    ? THEME.colors.high
                                    : THEME.colors.safe,
                              fontWeight: 'bold',
                            }}
                          >
                            {displaySoldier.fatigueLevel.toFixed(0)}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: '8px',
                            backgroundColor: THEME.colors.border,
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${displaySoldier.fatigueLevel}%` }}
                            transition={{ duration: 0.5 }}
                            style={{
                              height: '100%',
                              backgroundColor:
                                displaySoldier.fatigueLevel > 70
                                  ? THEME.colors.critical
                                  : displaySoldier.fatigueLevel > 50
                                    ? THEME.colors.high
                                    : THEME.colors.safe,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span style={{ color: THEME.colors.textSecondary }}>Hydration Level</span>
                          <span
                            style={{
                              color:
                                displaySoldier.hydrationLevel < 40
                                  ? THEME.colors.critical
                                  : displaySoldier.hydrationLevel < 60
                                    ? THEME.colors.high
                                    : THEME.colors.safe,
                              fontWeight: 'bold',
                            }}
                          >
                            {displaySoldier.hydrationLevel.toFixed(0)}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: '8px',
                            backgroundColor: THEME.colors.border,
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${displaySoldier.hydrationLevel}%` }}
                            transition={{ duration: 0.5 }}
                            style={{
                              height: '100%',
                              backgroundColor:
                                displaySoldier.hydrationLevel < 40
                                  ? THEME.colors.critical
                                  : displaySoldier.hydrationLevel < 60
                                    ? THEME.colors.high
                                    : THEME.colors.safe,
                            }}
                          />
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded border mt-4"
                        style={{
                          backgroundColor: THEME.colors.surfaceLight,
                          borderColor: THEME.colors.border,
                        }}
                      >
                        <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem', marginBottom: '8px' }}>
                          Coordinates
                        </p>
                        <p style={{ color: THEME.colors.text, fontWeight: 'bold' }}>
                          {displaySoldier.location.latitude.toFixed(4)}, {displaySoldier.location.longitude.toFixed(4)}
                        </p>
                        <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
                          Alt: {displaySoldier.location.altitude}m
                        </p>
                      </motion.div>
                    </div>
                    
                  </motion.div>
                </div>
              </>
            )}
            {/* Location Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                
              >
                <h2 className="text-xl font-bold mb-4 mt-4" style={{ color: THEME.colors.accent }}>
                  Field Positions
                </h2>
                <SoldierLocationMap soldiers={soldiers} />
              </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};