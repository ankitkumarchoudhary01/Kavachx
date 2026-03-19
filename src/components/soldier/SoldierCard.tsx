import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Battery, Backpack } from 'lucide-react';
import { Soldier } from '../../types/soldier';
import { THEME } from '@config/theme';

interface SoldierCardProps {
  soldier: Soldier;
  index: number;
  onSelect: (soldier: Soldier) => void;
}

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    healthy: THEME.colors.safe,
    warning: THEME.colors.high,
    critical: THEME.colors.critical,
    inactive: THEME.colors.textSecondary,
  };
  return colorMap[status] || THEME.colors.accent;
};

export const SoldierCard: React.FC<SoldierCardProps> = ({ soldier, index, onSelect }) => {
  const equipmentReady = soldier.equipment.filter((e) => e.status === 'ready').length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5, scale: 1.02 }}
      onClick={() => onSelect(soldier)}
      className="p-4 rounded-lg border mb-3 cursor-pointer"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: getStatusColor(soldier.status),
        borderLeftWidth: '4px',
        boxShadow: `0 0 15px ${getStatusColor(soldier.status)}30`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-sm" style={{ color: THEME.colors.text }}>
            {soldier.rank} {soldier.name}
          </h4>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.8rem' }}>
            {soldier.unit}
          </p>
        </div>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: getStatusColor(soldier.status) + '30',
            color: getStatusColor(soldier.status),
          }}
        >
          {soldier.status.toUpperCase()}
        </motion.span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1" style={{ color: THEME.colors.textSecondary }}>
          <AlertTriangle size={14} />
          HR: {soldier.vitalSigns.heartRate} bpm
        </div>
        <div className="flex items-center gap-1" style={{ color: THEME.colors.textSecondary }}>
          <Battery size={14} />
          Hydration: {soldier.hydrationLevel}%
        </div>
        <div className="flex items-center gap-1" style={{ color: THEME.colors.textSecondary }}>
          <MapPin size={14} />
          {soldier.vitalSigns.bodyTemperature.toFixed(1)}°C
        </div>
        <div className="flex items-center gap-1" style={{ color: THEME.colors.textSecondary }}>
          <Backpack size={14} />
          {equipmentReady}/{soldier.equipment.length} Ready
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-1">
        <div>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.7rem' }}>Fatigue</p>
          <div
            style={{
              height: '4px',
              backgroundColor: THEME.colors.border,
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${soldier.fatigueLevel}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                backgroundColor: soldier.fatigueLevel > 70 ? THEME.colors.critical : THEME.colors.high,
              }}
            />
          </div>
        </div>
        <div>
          <p style={{ color: THEME.colors.textSecondary, fontSize: '0.7rem' }}>Hydration</p>
          <div
            style={{
              height: '4px',
              backgroundColor: THEME.colors.border,
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${soldier.hydrationLevel}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                backgroundColor: soldier.hydrationLevel < 40 ? THEME.colors.critical : THEME.colors.safe,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};