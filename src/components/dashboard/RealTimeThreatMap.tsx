import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { Threat } from '../../types';

interface RealTimeThreatMapProps {
  threats: Threat[];
}

const getSeverityColor = (severity: string) => {
  const colorMap: Record<string, string> = {
    critical: THEME.colors.critical,
    high: THEME.colors.high,
    medium: THEME.colors.medium,
    low: THEME.colors.low,
  };
  return colorMap[severity] || THEME.colors.accent;
};

export const RealTimeThreatMap: React.FC<RealTimeThreatMapProps> = ({ threats }) => {
  const [animatingThreats] = useState<Threat[]>(threats);

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
      {/* Simplified SVG Map instead of Leaflet */}
      <svg width="100%" height="100%" viewBox="0 0 1000 600" style={{ backgroundColor: '#0a1628' }}>
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={THEME.colors.border} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#grid)" />

        {/* Plot threats as circles */}
        {animatingThreats.map((threat) => {
          const x = ((threat.longitude + 180) / 360) * 1000;
          const y = ((90 - threat.latitude) / 180) * 600;
          const radius = threat.severity === 'critical' ? 20 : threat.severity === 'high' ? 15 : 10;

          return (
            <motion.g key={threat.id}>
              {/* Outer pulsing ring */}
              <motion.circle
                cx={x}
                cy={y}
                r={radius + 5}
                fill="none"
                stroke={getSeverityColor(threat.severity)}
                strokeWidth="2"
                opacity="0.5"
                animate={{ r: [radius + 5, radius + 15] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Main circle */}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={getSeverityColor(threat.severity)}
                opacity="0.7"
              />
              {/* Center dot */}
              <circle cx={x} cy={y} r={radius / 2} fill="#fff" opacity="0.9" />
            </motion.g>
          );
        })}

        {/* Labels */}
        <text x="20" y="30" fill={THEME.colors.text} fontSize="16" fontWeight="bold">
          Global Threat Distribution
        </text>
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-4 left-4 p-3 rounded"
        style={{
          backgroundColor: THEME.colors.surface,
          border: `1px solid ${THEME.colors.border}`,
        }}
      >
        <p style={{ color: THEME.colors.text, fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Threat Severity
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.critical, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.high, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.medium, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: '8px', height: '8px', backgroundColor: THEME.colors.low, borderRadius: '50%' }} />
            <span style={{ color: THEME.colors.textSecondary }}>Low</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};