import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { VitalSignsCard } from '../components/soldier/VitalSignsCard';
import { EquipmentStatus } from '../components/soldier/EquipmentStatus';
import type { Soldier } from '../types/soldier';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock soldiers database
const mockSoldiers: Record<string, Soldier> = {
  '1': {
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
  '2': {
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
  '3': {
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
  '4':{
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
    location: { latitude: 2.5074, longitude: -51.1278, altitude: 12 },
    missionTime: 180,
    fatigueLevel: 28,
    hydrationLevel: 88,
    lastUpdate: new Date(),
  },
};

const vitalsHistory = [
  { time: '08:00', hr: 68, temp: 36.8, o2: 99 },
  { time: '09:00', hr: 72, temp: 36.9, o2: 98 },
  { time: '10:00', hr: 75, temp: 37.1, o2: 98 },
  { time: '11:00', hr: 78, temp: 37.2, o2: 97 },
  { time: '12:00', hr: 75, temp: 37.2, o2: 98 },
  { time: '13:00', hr: 73, temp: 37.1, o2: 98 },
  { time: '14:00', hr: 75, temp: 37.2, o2: 98 },
];

export function SoldierDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [soldier, setSoldier] = useState<Soldier | null>(null);

  useEffect(() => {
    if (id && mockSoldiers[id]) {
      setSoldier(mockSoldiers[id]);
    }
  }, [id]);

  useEffect(() => {
    if (!soldier) return;

    const timer = setInterval(() => {
      setSoldier((prev) =>
        prev
          ? {
              ...prev,
              vitalSigns: {
                ...prev.vitalSigns,
                heartRate: prev.vitalSigns.heartRate + Math.floor((Math.random() - 0.5) * 6),
                bodyTemperature: prev.vitalSigns.bodyTemperature + (Math.random() - 0.5) * 0.2,
                timestamp: new Date(),
              },
              fatigueLevel: Math.min(100, prev.fatigueLevel + Math.random()),
              hydrationLevel: Math.max(0, prev.hydrationLevel - Math.random() * 0.5),
            }
          : null
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [soldier]);

  if (!soldier) {
    return (
      <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <p>Soldier not found</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            {/* Header with back button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded hover:opacity-80"
                  style={{ color: THEME.colors.accent }}
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: THEME.colors.accent }}>
                    {soldier.rank} {soldier.name}
                  </h1>
                  <p style={{ color: THEME.colors.textSecondary }}>{soldier.unit}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded border flex items-center gap-2"
                  style={{ borderColor: THEME.colors.border, color: THEME.colors.text }}
                >
                  <Download size={18} />
                  Export
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded border flex items-center gap-2"
                  style={{ borderColor: THEME.colors.border, color: THEME.colors.text }}
                >
                  <Share2 size={18} />
                  Share
                </motion.button>
              </div>
            </div>

            {/* Current Vitals */}
            <div className="mb-8">
              <VitalSignsCard vitalSigns={soldier.vitalSigns} soldierName={soldier.name} />
            </div>

            {/* Vitals History Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg border mb-8"
              style={{
                backgroundColor: THEME.colors.surface,
                borderColor: THEME.colors.border,
              }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: THEME.colors.accent }}>
                Vitals History (24 Hours)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={vitalsHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke={THEME.colors.border} />
                  <XAxis dataKey="time" stroke={THEME.colors.textSecondary} />
                  <YAxis stroke={THEME.colors.textSecondary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: THEME.colors.surface,
                      border: `1px solid ${THEME.colors.border}`,
                      color: THEME.colors.text,
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hr"
                    stroke={THEME.colors.critical}
                    name="Heart Rate (bpm)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke={THEME.colors.high}
                    name="Temp (°C)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="o2"
                    stroke={THEME.colors.safe}
                    name="SpO₂ (%)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Equipment & Mission Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <EquipmentStatus equipment={soldier.equipment} soldierName={soldier.name} />

              {/* Mission & Readiness */}
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
                  Mission & Readiness
                </h3>

                <div className="space-y-5">
                  {/* Mission Time */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span style={{ color: THEME.colors.textSecondary }}>Mission Time</span>
                      <span style={{ color: THEME.colors.text, fontWeight: 'bold' }}>
                        {soldier.missionTime} min
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
                        animate={{ width: `${(soldier.missionTime / 480) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                          height: '100%',
                          backgroundColor: THEME.colors.accent,
                        }}
                      />
                    </div>
                  </div>

                  {/* Fatigue Level */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span style={{ color: THEME.colors.textSecondary }}>Fatigue Level</span>
                      <span
                        style={{
                          color:
                            soldier.fatigueLevel > 70
                              ? THEME.colors.critical
                              : soldier.fatigueLevel > 50
                                ? THEME.colors.high
                                : THEME.colors.safe,
                          fontWeight: 'bold',
                        }}
                      >
                        {soldier.fatigueLevel.toFixed(0)}%
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
                        animate={{ width: `${soldier.fatigueLevel}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                          height: '100%',
                          backgroundColor:
                            soldier.fatigueLevel > 70
                              ? THEME.colors.critical
                              : soldier.fatigueLevel > 50
                                ? THEME.colors.high
                                : THEME.colors.safe,
                        }}
                      />
                    </div>
                  </div>

                  {/* Hydration Level */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span style={{ color: THEME.colors.textSecondary }}>Hydration Level</span>
                      <span
                        style={{
                          color:
                            soldier.hydrationLevel < 40
                              ? THEME.colors.critical
                              : soldier.hydrationLevel < 60
                                ? THEME.colors.high
                                : THEME.colors.safe,
                          fontWeight: 'bold',
                        }}
                      >
                        {soldier.hydrationLevel.toFixed(0)}%
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
                        animate={{ width: `${soldier.hydrationLevel}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                          height: '100%',
                          backgroundColor:
                            soldier.hydrationLevel < 40
                              ? THEME.colors.critical
                              : soldier.hydrationLevel < 60
                                ? THEME.colors.high
                                : THEME.colors.safe,
                        }}
                      />
                    </div>
                  </div>

                  {/* Recommendations */}
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
                    <div className="flex items-start gap-2">
                      <AlertCircle size={18} style={{ color: THEME.colors.high, marginTop: 2 }} />
                      <div>
                        <p style={{ color: THEME.colors.text, fontSize: '0.9rem', fontWeight: '500' }}>
                          Recommended Actions
                        </p>
                        <ul style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem', marginTop: '8px' }} className="space-y-1">
                          <li>• Increase water intake - hydration at 75%</li>
                          <li>• Monitor fatigue levels - approaching threshold</li>
                          <li>• Continue current mission tempo</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}