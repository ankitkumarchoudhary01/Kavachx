import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { THEME } from '../../config/theme';
import type { HealthAlert } from '../../types/alerts';

const severityColor = (severity: HealthAlert['severity']) => {
  switch (severity) {
    case 'critical':
      return THEME.colors.critical;
    case 'high':
      return THEME.colors.high;
    case 'medium':
      return THEME.colors.medium;
    case 'low':
      return THEME.colors.accent;
    default:
      return THEME.colors.accent;
  }
};

export function AlertCard({
  alert,
  index,
  onAcknowledge,
}: {
  alert: HealthAlert;
  index: number;
  onAcknowledge: (id: string) => void;
}) {
  const color = severityColor(alert.severity);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: color,
        borderLeftWidth: 4,
        boxShadow: `0 0 15px ${color}22`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <motion.div
            animate={alert.severity === 'critical' ? { scale: [1, 1.15, 1] } : undefined}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ color }}
          >
            <AlertTriangle size={18} />
          </motion.div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm" style={{ color: THEME.colors.text }}>
                {alert.soldierName}
              </p>
              <span
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: THEME.colors.surfaceLight, color: THEME.colors.textSecondary }}
              >
                {alert.unit}
              </span>
            </div>

            <p className="text-sm mt-1" style={{ color: THEME.colors.textSecondary }}>
              {alert.message}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: THEME.colors.textSecondary }}>
              <span className="font-semibold" style={{ color }}>
                {alert.value}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {alert.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className="text-[11px] font-bold px-2 py-1 rounded-full"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {alert.severity.toUpperCase()}
          </span>

          <button
            disabled={alert.acknowledged}
            onClick={() => onAcknowledge(alert.id)}
            className="text-xs px-3 py-2 rounded border flex items-center gap-2 disabled:opacity-50"
            style={{ borderColor: THEME.colors.border, color: THEME.colors.text }}
          >
            <CheckCircle2 size={14} />
            {alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}