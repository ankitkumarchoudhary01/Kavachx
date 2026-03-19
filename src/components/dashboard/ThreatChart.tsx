import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { THEME } from '../../config/theme';

interface DataPoint {
  time: string;
  threats: number;
  resolved: number;
}

const mockData: DataPoint[] = [
  { time: '00:00', threats: 12, resolved: 5 },
  { time: '04:00', threats: 19, resolved: 8 },
  { time: '08:00', threats: 28, resolved: 12 },
  { time: '12:00', threats: 35, resolved: 18 },
  { time: '16:00', threats: 42, resolved: 25 },
  { time: '20:00', threats: 38, resolved: 28 },
  { time: '24:00', threats: 31, resolved: 30 },
];

export const ThreatChart: React.FC = () => {
  return (
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
        Threat Activity Over Time
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={mockData}>
          <defs>
            <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={THEME.colors.critical} stopOpacity={0.8} />
              <stop offset="95%" stopColor={THEME.colors.critical} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={THEME.colors.safe} stopOpacity={0.8} />
              <stop offset="95%" stopColor={THEME.colors.safe} stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="threats"
            stroke={THEME.colors.critical}
            fillOpacity={1}
            fill="url(#colorThreats)"
            name="Threats"
          />
          <Area
            type="monotone"
            dataKey="resolved"
            stroke={THEME.colors.safe}
            fillOpacity={1}
            fill="url(#colorResolved)"
            name="Resolved"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};