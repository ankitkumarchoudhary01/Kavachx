import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@config/theme';
import { Soldier } from '../../types/soldier';

interface SoldierLocationMapProps {
  soldiers: Soldier[];
}

export const SoldierLocationMap: React.FC<SoldierLocationMapProps> = ({ soldiers }) => {
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      healthy: THEME.colors.safe,
      warning: THEME.colors.high,
      critical: THEME.colors.critical,
      inactive: THEME.colors.textSecondary,
    };
    return colorMap[status] || THEME.colors.accent;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg overflow-hidden relative"
      style={{
        height: '500px',
        backgroundColor: THEME.colors.surface,
        border: `1px solid ${THEME.colors.border}`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 600" style={{ backgroundColor: '#0a1628' }}>
        {/* Grid background */}
        <defs>
          <pattern id="fieldGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={THEME.colors.border} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#fieldGrid)" />

        {/* Plot soldiers as markers */}
        {soldiers.map((soldier) => {
          const x = ((soldier.location.longitude + 180) / 360) * 1000;
          const y = ((90 - soldier.location.latitude) / 180) * 600;
          const color = getStatusColor(soldier.status);

          return (
            <motion.g key={soldier.id}>
              {/* Pulse ring */}
              <motion.circle
                cx={x}
                cy={y}
                r="20"
                fill="none"
                stroke={color}
                strokeWidth="2"
                opacity="0.5"
                animate={{ r: [20, 35] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Main marker */}
              <circle cx={x} cy={y} r="15" fill={color} opacity="0.8" />
              {/* Inner circle with initials */}
              <circle cx={x} cy={y} r="10" fill="#fff" opacity="0.9" />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill={color}
              >
                {soldier.name.split(' ')[0][0]}{soldier.name.split(' ')[1]?.[0] || ''}
              </text>
            </motion.g>
          );
        })}

        {/* Title */}
        <text x="20" y="30" fill={THEME.colors.text} fontSize="16" fontWeight="bold">
          Soldier Positions - Field Map
        </text>
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-4 right-4 p-3 rounded"
        style={{
          backgroundColor: THEME.colors.surface,
          border: `1px solid ${THEME.colors.border}`,
        }}
      >
        <p style={{ color: THEME.colors.text, fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Status Legend
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.safe, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.high, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.critical, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.textSecondary, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Inactive</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};