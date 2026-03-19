import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Shield, Activity } from 'lucide-react';
import { SoldierMetrics } from '../../types/soldier';
import { THEME } from '@config/theme';

interface HealthMetricsOverviewProps {
  metrics: SoldierMetrics;
}

export const HealthMetricsOverview: React.FC<HealthMetricsOverviewProps> = ({ metrics }) => {
  const criticalityRate = (
    ((metrics.warningCount + metrics.criticalCount) / metrics.totalActiveSoldiers) *
    100
  ).toFixed(1);

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Active Soldiers */}
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
          <span style={{ color: THEME.colors.textSecondary }}>Active Soldiers</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: THEME.colors.accent }}
          >
            <Users size={32} />
          </motion.div>
        </div>
        <motion.div className="text-4xl font-bold" style={{ color: THEME.colors.accent }}>
          {metrics.totalActiveSoldiers}
        </motion.div>
      </motion.div>

      {/* Healthy Soldiers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: THEME.colors.surface,
          borderColor: THEME.colors.border,
          boxShadow: THEME.shadows.glow,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span style={{ color: THEME.colors.textSecondary }}>Healthy</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: THEME.colors.safe }}
          >
            <Shield size={32} />
          </motion.div>
        </div>
        <motion.div className="text-4xl font-bold" style={{ color: THEME.colors.safe }}>
          {metrics.healthySoldiers}
        </motion.div>
        <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem', marginTop: '8px' }}>
          {((metrics.healthySoldiers / metrics.totalActiveSoldiers) * 100).toFixed(1)}% of force
        </p>
      </motion.div>

      {/* Warning & Critical */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: THEME.colors.surface,
          borderColor: THEME.colors.border,
          boxShadow: THEME.shadows.glow,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span style={{ color: THEME.colors.textSecondary }}>Needing Attention</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: THEME.colors.high }}
          >
            <AlertTriangle size={32} />
          </motion.div>
        </div>
        <motion.div className="text-4xl font-bold" style={{ color: THEME.colors.high }}>
          {metrics.warningCount + metrics.criticalCount}
        </motion.div>
        <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem', marginTop: '8px' }}>
          {criticalityRate}% of force
        </p>
      </motion.div>

      {/* Equipment Ready Rate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: THEME.colors.surface,
          borderColor: THEME.colors.border,
          boxShadow: THEME.shadows.glow,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span style={{ color: THEME.colors.textSecondary }}>Equipment Ready</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: THEME.colors.accent }}
          >
            <Activity size={32} />
          </motion.div>
        </div>
        <motion.div className="text-4xl font-bold" style={{ color: THEME.colors.accent }}>
          {metrics.equipmentReadyRate.toFixed(0)}
          <span style={{ fontSize: '0.75rem' }}>%</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};