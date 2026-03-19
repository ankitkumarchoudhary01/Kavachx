import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { Incident } from '../../types';

interface IncidentTimelineProps {
  incident: Incident;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ incident }) => {
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
      <h3 className="text-xl font-bold mb-6" style={{ color: THEME.colors.accent }}>
        {incident.title}
      </h3>

      <div className="relative">
        {incident.timeline.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="mb-6 flex gap-4"
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 rounded-full mb-2"
                style={{ backgroundColor: THEME.colors.accent }}
              />
              {idx < incident.timeline.length - 1 && (
                <div
                  style={{
                    width: '2px',
                    height: '60px',
                    backgroundColor: THEME.colors.border,
                  }}
                />
              )}
            </div>

            {/* Event content */}
            <div>
              <p className="font-semibold" style={{ color: THEME.colors.text }}>
                {event.action}
              </p>
              <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
                {event.timestamp.toLocaleString()}
              </p>
              <p style={{ color: THEME.colors.textSecondary }}>{event.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};