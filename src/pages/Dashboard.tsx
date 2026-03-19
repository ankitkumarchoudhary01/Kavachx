import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, Shield, Zap } from 'lucide-react';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { MetricsCard } from '../components/dashboard/MetricsCard';
import { ThreatAlertCard } from '../components/dashboard/ThreatAlertCard';
import { RealTimeThreatMap } from '../components/dashboard/RealTimeThreatMap';
import { ThreatChart } from '../components/dashboard/ThreatChart';
import { IncidentTimeline } from '../components/dashboard/IncidentTimeline';
import { useDashboardStore } from '../store/dashboardStore';
import { Threat, Incident } from '../types';

const mockThreats: Threat[] = [
  {
    id: '1',
    type: 'malware',
    severity: 'critical',
    source: '192.168.1.100',
    target: 'Production Server',
    timestamp: new Date(),
    description: 'Suspicious executable detected in system memory',
    latitude: 40.7128,
    longitude: -74.006,
    affectedAssets: 5,
  },
  {
    id: '2',
    type: 'ddos',
    severity: 'high',
    source: '203.0.113.45',
    target: 'Web Application',
    timestamp: new Date(Date.now() - 300000),
    description: 'High volume of requests from single IP address',
    latitude: 35.6762,
    longitude: 139.6503,
    affectedAssets: 12,
  },
  {
    id: '3',
    type: 'intrusion',
    severity: 'medium',
    source: '198.51.100.20',
    target: 'API Gateway',
    timestamp: new Date(Date.now() - 600000),
    description: 'Unauthorized access attempt detected',
    latitude: 48.8566,
    longitude: 2.3522,
    affectedAssets: 3,
  },
  {
    id: '4',
    type: 'phishing',
    severity: 'low',
    source: '203.0.113.99',
    target: 'Email Server',
    timestamp: new Date(Date.now() - 900000),
    description: 'Phishing email detected in user mailbox',
    latitude: 51.5074,
    longitude: -0.1278,
    affectedAssets: 1,
  },
];

const mockIncident: Incident = {
  id: '1',
  title: 'Critical Security Breach - Production',
  description: 'Unauthorized access detected in production environment',
  status: 'investigating',
  severity: 'critical',
  createdAt: new Date(),
  updatedAt: new Date(),
  assignedTo: 'Security Team',
  timeline: [
    {
      id: '1',
      action: 'Alert Triggered',
      timestamp: new Date(),
      actor: 'System',
      details: 'Intrusion detection system identified suspicious activity',
    },
    {
      id: '2',
      action: 'Investigation Started',
      timestamp: new Date(Date.now() - 300000),
      actor: 'John Doe',
      details: 'Security analyst began investigating the incident',
    },
    {
      id: '3',
      action: 'Root Cause Identified',
      timestamp: new Date(Date.now() - 600000),
      actor: 'John Doe',
      details: 'Compromised credentials detected as entry point',
    },
  ],
};

export const Dashboard: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(mockThreats);
  const { updateMetrics } = useDashboardStore();

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newThreat: Threat = {
        id: Date.now().toString(),
        type: ['malware', 'ddos', 'breach', 'intrusion', 'phishing'][
          Math.floor(Math.random() * 5)
        ] as any,
        severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as any,
        source: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        target: 'Server ' + Math.floor(Math.random() * 10),
        timestamp: new Date(),
        description: 'New threat detected',
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
        affectedAssets: Math.floor(Math.random() * 20),
      };
      setThreats((prev) => [newThreat, ...prev].slice(0, 20));
    }, 8000);

    // Update metrics
    updateMetrics({
      totalThreats: mockThreats.length + 234,
      activeIncidents: 7,
      systemHealth: 87,
      threatScore: 72,
    });

    return () => clearInterval(interval);
  }, [updateMetrics]);

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            {/* Metrics Row */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricsCard
                label="Total Threats"
                value={234}
                icon={<AlertTriangle size={32} />}
                trend={12}
                color={THEME.colors.critical}
              />
              <MetricsCard
                label="Active Incidents"
                value={7}
                icon={<Shield size={32} />}
                trend={-3}
                color={THEME.colors.high}
              />
              <MetricsCard
                label="System Health"
                value={87}
                unit="%"
                icon={<Zap size={32} />}
                color={THEME.colors.safe}
              />
              <MetricsCard
                label="Threat Score"
                value={72}
                unit="/100"
                icon={<BarChart3 size={32} />}
                color={THEME.colors.medium}
              />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Threats Column */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: THEME.colors.accent }}>
                  Real-Time Threats ({threats.length})
                </h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {threats.map((threat, idx) => (
                    <ThreatAlertCard key={threat.id} threat={threat} index={idx} />
                  ))}
                </div>
              </motion.div>

              {/* Map and Chart Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: THEME.colors.accent }}>
                  Global Threat Distribution
                </h2>
                <RealTimeThreatMap threats={threats} />
              </motion.div>
            </div>

            {/* Chart and Timeline Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ThreatChart />
              <IncidentTimeline incident={mockIncident} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};