import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Droplet, Wind, Thermometer } from 'lucide-react';
import { VitalSigns } from '../../types/soldier';
import { THEME } from '@config/theme';

interface VitalSignsCardProps {
  vitalSigns: VitalSigns;
  soldierName: string;
}

const getHealthStatus = (heartRate: number, temp: number, o2: number) => {
  if (heartRate > 120 || temp > 39 || o2 < 95) return 'critical';
  if (heartRate > 100 || temp > 38 || o2 < 97) return 'warning';
  return 'healthy';
};

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    healthy: THEME.colors.safe,
    warning: THEME.colors.high,
    critical: THEME.colors.critical,
  };
  return colorMap[status] || THEME.colors.accent;
};

export const VitalSignsCard: React.FC<VitalSignsCardProps> = ({
  vitalSigns,
  soldierName,
}) => {
  const healthStatus = getHealthStatus(
    vitalSigns.heartRate,
    vitalSigns.bodyTemperature,
    vitalSigns.bloodOxygen
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: THEME.colors.border,
        boxShadow: `0 0 15px ${getStatusColor(healthStatus)}30`,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold" style={{ color: THEME.colors.accent }}>
          {soldierName} - Vital Signs
        </h3>
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="px-3 py-1 rounded-full text-sm font-bold"
          style={{
            backgroundColor: getStatusColor(healthStatus) + '30',
            color: getStatusColor(healthStatus),
          }}
        >
          {healthStatus.toUpperCase()}
        </motion.span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Heart Rate */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="p-4 rounded border"
          style={{
            backgroundColor: THEME.colors.surfaceLight,
            borderColor: THEME.colors.border,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Heart size={20} color={THEME.colors.critical} />
            </motion.div>
            <span style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
              Heart Rate
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: THEME.colors.text }}>
            {vitalSigns.heartRate}
            <span style={{ fontSize: '0.75rem', color: THEME.colors.textSecondary }}>
              {' '}
              bpm
            </span>
          </p>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.75rem' }}>
            {vitalSigns.heartRate < 60 ? 'Low' : vitalSigns.heartRate > 100 ? 'High' : 'Normal'}
          </p>
        </motion.div>

        {/* Body Temperature */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.05 }}
          className="p-4 rounded border"
          style={{
            backgroundColor: THEME.colors.surfaceLight,
            borderColor: THEME.colors.border,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={20} color={THEME.colors.high} />
            <span style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
              Temperature
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: THEME.colors.text }}>
            {vitalSigns.bodyTemperature.toFixed(1)}
            <span style={{ fontSize: '0.75rem', color: THEME.colors.textSecondary }}>
              °C
            </span>
          </p>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.75rem' }}>
            {vitalSigns.bodyTemperature > 38 ? 'Elevated' : 'Normal'}
          </p>
        </motion.div>

        {/* Blood Oxygen */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded border"
          style={{
            backgroundColor: THEME.colors.surfaceLight,
            borderColor: THEME.colors.border,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Droplet size={20} color={THEME.colors.accent} />
            <span style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
              Blood Oxygen
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: THEME.colors.text }}>
            {vitalSigns.bloodOxygen}
            <span style={{ fontSize: '0.75rem', color: THEME.colors.textSecondary }}>
              %
            </span>
          </p>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.75rem' }}>
            {vitalSigns.bloodOxygen < 95 ? 'Low' : 'Normal'}
          </p>
        </motion.div>

        {/* Respiration Rate */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15 }}
          className="p-4 rounded border"
          style={{
            backgroundColor: THEME.colors.surfaceLight,
            borderColor: THEME.colors.border,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Wind size={20} color={THEME.colors.medium} />
            <span style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
              Respiration
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: THEME.colors.text }}>
            {vitalSigns.respirationRate}
            <span style={{ fontSize: '0.75rem', color: THEME.colors.textSecondary }}>
              {' '}
              rpm
            </span>
          </p>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.75rem' }}>
            {vitalSigns.respirationRate > 25 ? 'High' : 'Normal'}
          </p>
        </motion.div>
      </div>

      {/* Blood Pressure */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded border"
        style={{
          backgroundColor: THEME.colors.surfaceLight,
          borderColor: THEME.colors.border,
        }}
      >
        <span style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
          Blood Pressure
        </span>
        <p className="text-2xl font-bold mt-2" style={{ color: THEME.colors.text }}>
          {vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}
          <span style={{ fontSize: '0.75rem', color: THEME.colors.textSecondary }}>
            {' '}
            mmHg
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};