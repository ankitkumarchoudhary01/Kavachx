import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Threat } from '../../types';
import { THEME } from '../../config/theme';

interface ThreatAlertCardProps {
  threat: Threat;
  index: number;
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

export const ThreatAlertCard: React.FC<ThreatAlertCardProps> = ({ threat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className="p-4 rounded-lg border mb-3"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: getSeverityColor(threat.severity),
        borderLeftWidth: '4px',
        boxShadow: `0 0 15px ${getSeverityColor(threat.severity)}30`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <AlertTriangle size={20} color={getSeverityColor(threat.severity)} />
          </motion.div>
          <div>
            <h4 className="font-semibold" style={{ color: THEME.colors.text }}>
              {threat.type.toUpperCase()}
            </h4>
            <p style={{ color: THEME.colors.textSecondary }}>{threat.description}</p>
          </div>
        </div>
        <motion.span
          className="px-3 py-1 rounded-full text-sm font-bold"
          style={{
            backgroundColor: getSeverityColor(threat.severity) + '30',
            color: getSeverityColor(threat.severity),
          }}
        >
          {threat.severity.toUpperCase()}
        </motion.span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex items-center gap-2" style={{ color: THEME.colors.textSecondary }}>
          <MapPin size={16} />
          {threat.source}
        </div>
        <div className="flex items-center gap-2" style={{ color: THEME.colors.textSecondary }}>
          <Clock size={16} />
          {threat.timestamp.toLocaleTimeString()}
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-3 py-2 rounded text-sm font-semibold"
          style={{
            backgroundColor: getSeverityColor(threat.severity),
            color: '#000',
          }}
        >
          Investigate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-3 py-2 rounded text-sm font-semibold border"
          style={{
            color: THEME.colors.accent,
            borderColor: THEME.colors.accent,
          }}
        >
          Escalate
        </motion.button>
      </div>
    </motion.div>
  );
};