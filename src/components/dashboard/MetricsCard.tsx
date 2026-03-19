import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';

interface MetricsCardProps {
  label: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  trend?: number;
  color?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  unit = '',
  icon,
  trend = 0,
  color = THEME.colors.accent,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: THEME.colors.border,
        boxShadow: THEME.shadows.glow,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span style={{ color: THEME.colors.textSecondary }}>{label}</span>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ color }}
        >
          {icon}
        </motion.div>
      </div>

      <motion.div className="text-4xl font-bold mb-2" style={{ color }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-lg" style={{ color: THEME.colors.textSecondary }}>
          {' '}
          {unit}
        </span>
      </motion.div>

      {trend !== 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: trend > 0 ? THEME.colors.critical : THEME.colors.safe }}
        >
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </motion.div>
      )}
    </motion.div>
  );
};