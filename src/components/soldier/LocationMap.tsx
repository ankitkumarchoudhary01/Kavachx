import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { Soldier } from '../../types/soldier';

interface SoldierLocationMapProps {
  soldiers: Soldier[];
}

export const SoldierLocationMap: React.FC<SoldierLocationMapProps> = ({ soldiers }) => {
  const [hoveredSoldier, setHoveredSoldier] = useState<string | null>(null);

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
      <svg 
        width="100%" 
        height="100%" 
        viewBox="230 0 1000 600" 
        style={{ backgroundColor: '#0a1628' }}
        onMouseLeave={() => setHoveredSoldier(null)}
      >
        {/* Grid background */}
        <defs>
          <pattern id="fieldGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={THEME.colors.border} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1500" height="600" fill="url(#fieldGrid)" />

        {/* Plot soldiers as markers */}
        {soldiers.map((soldier) => {
          const x = ((soldier.location.longitude + 180) / 360) * 1000;
          const y = ((90 - soldier.location.latitude) / 180) * 600;
          const color = getStatusColor(soldier.status);
          const isHovered = hoveredSoldier === soldier.id;

          return (
            <motion.g 
              key={soldier.id}
              onMouseEnter={() => setHoveredSoldier(soldier.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse ring - more visible on hover */}
              <motion.circle
                cx={x}
                cy={y}
                r="20"
                fill="none"
                stroke={color}
                strokeWidth={isHovered ? 3 : 2}
                opacity={isHovered ? 0.8 : 0.5}
                animate={{ r: isHovered ? [20, 45] : [20, 35] }}
                transition={{ duration: isHovered ? 1.2 : 2, repeat: Infinity }}
              />
              
              {/* Main marker - larger on hover */}
              <motion.circle 
                cx={x} 
                cy={y} 
                r={isHovered ? 20 : 15} 
                fill={color} 
                opacity="0.9"
                animate={{ r: isHovered ? 20 : 15 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Inner circle with initials */}
              <motion.circle 
                cx={x} 
                cy={y} 
                r={isHovered ? 13 : 10} 
                fill="#fff" 
                opacity="0.95"
                animate={{ r: isHovered ? 13 : 10 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Initials text */}
              <motion.text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize={isHovered ? "11" : "9"}
                fontWeight="bold"
                fill={color}
                animate={{ fontSize: isHovered ? 11 : 9 }}
                transition={{ duration: 0.3 }}
              >
                {soldier.name.split(' ')[0][0]}{soldier.name.split(' ')[1]?.[0] || ''}
              </motion.text>

              {/* Name tooltip on hover */}
              {isHovered && (
                <motion.g
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Tooltip background */}
                  <rect
                    x={x - 60}
                    y={y - 50}
                    width="120"
                    height="40"
                    rx="6"
                    fill={THEME.colors.surface}
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.95"
                  />
                  
                  {/* Soldier name */}
                  <text
                    x={x}
                    y={y - 32}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill={THEME.colors.text}
                  >
                    {soldier.name}
                  </text>

                  {/* Rank and Unit */}
                  <text
                    x={x}
                    y={y - 18}
                    textAnchor="middle"
                    fontSize="10"
                    fill={THEME.colors.textSecondary}
                  >
                    {soldier.rank} - {soldier.unit}
                  </text>

                  {/* Status */}
                  <text
                    x={x}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill={color}
                  >
                    {soldier.status.toUpperCase()}
                  </text>

                  {/* Tooltip arrow pointing down */}
                  <polygon
                    points={`${x},${y - 2} ${x - 8},${y - 12} ${x + 8},${y - 12}`}
                    fill={THEME.colors.surface}
                    stroke={color}
                    strokeWidth="2"
                  />
                </motion.g>
              )}
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