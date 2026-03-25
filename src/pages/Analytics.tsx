import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const unitsData = [
  { unit: 'Alpha Squad', incidents: 3, avgHeartRate: 75, readiness: 92 },
  { unit: 'Bravo Squad', incidents: 5, avgHeartRate: 82, readiness: 88 },
  { unit: 'Charlie Squad', incidents: 2, avgHeartRate: 72, readiness: 95 },
  { unit: 'Delta Squad', incidents: 4, avgHeartRate: 79, readiness: 85 },
];

const alertDistribution = [
  { name: 'Heart Rate', value: 35, color: THEME.colors.critical },
  { name: 'Temperature', value: 25, color: THEME.colors.high },
  { name: 'Hydration', value: 20, color: THEME.colors.medium },
  { name: 'Equipment', value: 12, color: THEME.colors.low },
  { name: 'Other', value: 8, color: THEME.colors.accent },
];

const timelineData = [
  { date: '01/15', alerts: 12, resolved: 8 },
  { date: '01/16', alerts: 18, resolved: 14 },
  { date: '01/17', alerts: 15, resolved: 12 },
  { date: '01/18', alerts: 22, resolved: 18 },
  { date: '01/19', alerts: 25, resolved: 20 },
  { date: '01/20', alerts: 19, resolved: 16 },
  { date: '01/21', alerts: 28, resolved: 24 },
];

export function Analytics() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: THEME.colors.accent }}>
                  Analytics & Reports
                </h1>
                <p className="mt-2" style={{ color: THEME.colors.textSecondary }}>
                  Health metrics, alerts, and readiness trends across all units.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 rounded border text-sm flex items-center gap-2"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderColor: THEME.colors.border,
                    color: THEME.colors.text,
                  }}
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded border flex items-center gap-2"
                  style={{ borderColor: THEME.colors.border, color: THEME.colors.text }}
                >
                  <Download size={18} />
                  Export Report
                </motion.button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Alerts', value: '127', trend: '+12%', color: THEME.colors.critical },
                { label: 'Avg Heart Rate', value: '78 bpm', trend: '+2%', color: THEME.colors.high },
                { label: 'Equipment Ready', value: '94%', trend: '-1%', color: THEME.colors.safe },
                { label: 'Unit Readiness', value: '90%', trend: '+3%', color: THEME.colors.accent },
              ].map((kpi, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderColor: THEME.colors.border,
                  }}
                >
                  <p style={{ color: THEME.colors.textSecondary }}>{kpi.label}</p>
                  <p className="text-2xl font-bold mt-2" style={{ color: kpi.color }}>
                    {kpi.value}
                  </p>
                  <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem', marginTop: '8px' }}>
                    {kpi.trend}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Alerts Timeline */}
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
                  Alerts Timeline
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={THEME.colors.border} />
                    <XAxis dataKey="date" stroke={THEME.colors.textSecondary} />
                    <YAxis stroke={THEME.colors.textSecondary} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: THEME.colors.surface,
                        border: `1px solid ${THEME.colors.border}`,
                        color: THEME.colors.text,
                      }}
                    />
                    <Legend />
                    <Bar dataKey="alerts" fill={THEME.colors.critical} name="Total Alerts" />
                    <Bar dataKey="resolved" fill={THEME.colors.safe} name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Alert Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderColor: THEME.colors.border,
                }}
              >
                <h3 className="text-lg font-bold mb-6" style={{ color: THEME.colors.accent }}>
                  Alert Types Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={alertDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {alertDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: THEME.colors.surface,
                        border: `1px solid ${THEME.colors.border}`,
                        color: THEME.colors.text,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Unit Performance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border overflow-hidden"
              style={{ borderColor: THEME.colors.border }}
            >
              <div
                className="p-4 grid grid-cols-4 gap-4 font-semibold text-sm"
                style={{ backgroundColor: THEME.colors.surfaceLight, color: THEME.colors.accent }}
              >
                <div>Unit</div>
                <div>Incidents</div>
                <div>Avg Heart Rate</div>
                <div>Readiness</div>
              </div>

              <div className="divide-y" style={{ borderColor: THEME.colors.border }}>
                {unitsData.map((unit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="p-4 grid grid-cols-4 gap-4 items-center text-sm hover:opacity-80 cursor-pointer"
                    style={{ backgroundColor: THEME.colors.surface }}
                  >
                    <div style={{ color: THEME.colors.text, fontWeight: '500' }}>{unit.unit}</div>
                    <div
                      style={{
                        color:
                          unit.incidents > 4
                            ? THEME.colors.critical
                            : unit.incidents > 2
                              ? THEME.colors.high
                              : THEME.colors.safe,
                      }}
                    >
                      {unit.incidents}
                    </div>
                    <div style={{ color: THEME.colors.textSecondary }}>{unit.avgHeartRate} bpm</div>
                    <div className="flex items-center gap-2">
                      <div
                        style={{
                          height: '4px',
                          width: '40px',
                          backgroundColor: THEME.colors.border,
                          borderRadius: '2px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${unit.readiness}%`,
                            backgroundColor: unit.readiness > 90 ? THEME.colors.safe : THEME.colors.high,
                          }}
                        />
                      </div>
                      <span style={{ color: THEME.colors.text, fontWeight: '500' }}>
                        {unit.readiness}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}