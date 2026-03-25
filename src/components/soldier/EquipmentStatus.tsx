import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Equipment } from '../../types/soldier';
import { THEME } from '@config/theme';

interface EquipmentStatusProps {
  equipment: Equipment[];
  soldierName: string;
}

const getEquipmentStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    ready: THEME.colors.safe,
    damaged: THEME.colors.high,
    missing: THEME.colors.critical,
  };
  return colorMap[status] || THEME.colors.accent;
};

const getEquipmentIcon = (status: string) => {
  switch (status) {
    case 'ready':
      return <CheckCircle size={18}  />;
    case 'damaged':
      return <AlertCircle size={18} />;
    case 'missing':
      return <XCircle size={18} />;
    default:
      return <CheckCircle size={18} />;
  }
};

export const EquipmentStatus: React.FC<EquipmentStatusProps> = ({
  equipment,
  soldierName,
}) => {
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
      <h3 className="text-lg font-bold mb-4" style={{ color: THEME.colors.accent }}>
        Equipment Status - {soldierName}
      </h3>

      <div className="space-y-2">
        {equipment.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-3 rounded border"
            style={{
              backgroundColor: THEME.colors.surfaceLight,
              borderColor: getEquipmentStatusColor(item.status) + '30',
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                style={{ color: getEquipmentStatusColor(item.status) }}
                animate={
                  item.status === 'missing'
                    ? { scale: [1, 1.1, 1] }
                    : item.status === 'damaged'
                      ? { rotate: [0, 5, -5, 0] }
                      : undefined
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getEquipmentIcon(item.status)}
              </motion.div>
              <div>
                <p style={{ color: THEME.colors.text, fontSize: '0.9rem', fontWeight: '500' }}>
                  {item.name}
                </p>
                <p style={{ color: THEME.colors.textSecondary, fontSize: '0.75rem' }}>
                  {item.type} • {item.location}
                </p>
              </div>
            </div>
            <motion.span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: getEquipmentStatusColor(item.status) + '30',
                color: getEquipmentStatusColor(item.status),
              }}
            >
              {item.status.toUpperCase()}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};