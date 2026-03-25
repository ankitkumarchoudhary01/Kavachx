import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Droplet, Wind, Thermometer, ChevronRight } from 'lucide-react';
import { VitalSigns } from '../../types/soldier';
import { THEME } from '../../config/theme';

interface VitalSignsCardProps {
  vitalSigns: VitalSigns;
  soldierName: string;
  status?: 'healthy' | 'warning' | 'critical';
  onShowDetails?: () => void;
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

const StatTile = ({
  title,
  value,
  subtext,
  icon,
  accent,
}: {
  title: string;
  value: React.ReactNode;
  subtext: string;
  icon: React.ReactNode;
  accent: string;
}) => {
  return (
    <motion.div
      whileHover={{ x: 4, scale: 1.01 }}
      className="p-4 rounded border"
      style={{
        backgroundColor: THEME.colors.surfaceLight,
        borderColor: THEME.colors.border,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: accent }}>{icon}</span>
        <span style={{ color: THEME.colors.textSecondary, fontSize: '0.9rem' }}>{title}</span>
      </div>
      <div className="text-3xl font-bold" style={{ color: THEME.colors.text }}>
        {value}
      </div>
      <div className="mt-1 text-sm" style={{ color: THEME.colors.textSecondary }}>
        {subtext}
      </div>
    </motion.div>
  );
};

export const VitalSignsCard: React.FC<VitalSignsCardProps> = ({
  vitalSigns,
  soldierName,
  status,
  onShowDetails,
}) => {
  const derivedStatus =
    status ??
    getHealthStatus(vitalSigns.heartRate, vitalSigns.bodyTemperature, vitalSigns.bloodOxygen);

  const statusColor = getStatusColor(derivedStatus);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: THEME.colors.border,
        boxShadow: `0 0 16px ${statusColor}22`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold" style={{ color: THEME.colors.accent }}>
          {soldierName} - Vital Signs
        </h3>

        <span
          className="px-4 py-2 rounded-full text-sm font-bold"
          style={{
            backgroundColor: `${statusColor}22`,
            color: statusColor,
          }}
        >
          {derivedStatus.toUpperCase()}
        </span>
      </div>

      {/* 2x2 grid of vital stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatTile
          title="Heart Rate"
          value={
            <>
              {Math.round(vitalSigns.heartRate)} <span className="text-base">bpm</span>
            </>
          }
          subtext={vitalSigns.heartRate > 100 ? 'High' : vitalSigns.heartRate < 60 ? 'Low' : 'Normal'}
          icon={<Heart size={20} />}
          accent={THEME.colors.critical}
        />

        <StatTile
          title="Temperature"
          value={
            <>
              {vitalSigns.bodyTemperature.toFixed(1)}
              <span className="text-base">°C</span>
            </>
          }
          subtext={vitalSigns.bodyTemperature > 38 ? 'Elevated' : 'Normal'}
          icon={<Thermometer size={20} />}
          accent={THEME.colors.high}
        />

        <StatTile
          title="Blood Oxygen"
          value={
            <>
              {vitalSigns.bloodOxygen.toFixed(1)}
              <span className="text-base">%</span>
            </>
          }
          subtext={vitalSigns.bloodOxygen < 95 ? 'Low' : 'Normal'}
          icon={<Droplet size={20} />}
          accent={THEME.colors.accent}
        />

        <StatTile
          title="Respiration"
          value={
            <>
              {Math.round(vitalSigns.respirationRate)} <span className="text-base">rpm</span>
            </>
          }
          subtext={vitalSigns.respirationRate > 25 ? 'High' : 'Normal'}
          icon={<Wind size={20} />}
          accent={THEME.colors.medium}
        />
      </div>

      {/* Bottom row: Blood Pressure (left) + Show Details (right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blood Pressure */}
        <motion.div
          whileHover={{ x: 4, scale: 1.01 }}
          className="p-4 rounded border"
          style={{
            backgroundColor: THEME.colors.surfaceLight,
            borderColor: THEME.colors.border,
          }}
        >
          <div style={{ color: THEME.colors.textSecondary, fontSize: '0.9rem' }}>Blood Pressure</div>
          <div className="text-3xl font-bold mt-2" style={{ color: THEME.colors.text }}>
            {vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}
            <span className="text-base" style={{ color: THEME.colors.textSecondary }}>
              {' '}
              mmHg
            </span>
          </div>
        </motion.div>

        {/* Show Details Button */}
        {onShowDetails && (
          <motion.button
            type="button"
            whileHover={{ x: 4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShowDetails}
            className="p-4 rounded border text-left flex items-center justify-between"
            style={{
              backgroundColor: THEME.colors.surfaceLight,
              borderColor: THEME.colors.border,
              color: THEME.colors.text,
              cursor: 'pointer',
              border: `1px solid ${THEME.colors.border}`,
            }}
          >
            <div>
              <div className="text-sm font-semibold" style={{ color: THEME.colors.accent }}>
                Show Details
              </div>
              <div className="text-xs mt-1" style={{ color: THEME.colors.textSecondary }}>
                View trends, history & full profile
              </div>
            </div>

            <span style={{ color: THEME.colors.accent, display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={22} />
            </span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};