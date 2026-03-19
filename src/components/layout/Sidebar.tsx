import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  MapPin,
  AlertTriangle,
  Settings,
  Home,
  ChevronDown,
} from 'lucide-react';
import { THEME } from '../../config/theme';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: AlertTriangle, label: 'Threats', href: '/threats' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: MapPin, label: 'Map View', href: '/map' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.aside
      animate={{ width: expanded ? 250 : 80 }}
      transition={{ duration: 0.3 }}
      className="border-r h-screen overflow-y-auto"
      style={{
        backgroundColor: THEME.colors.background,
        borderColor: THEME.colors.border,
      }}
    >
      <div className="p-4">
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.1 }}
          className="w-full p-2 rounded"
          style={{ color: THEME.colors.accent }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 p-3 rounded transition-colors hover:opacity-80"
            style={{ color: THEME.colors.text }}
          >
            <item.icon size={20} />
            {expanded && <span>{item.label}</span>}
          </motion.a>
        ))}
      </nav>
    </motion.aside>
  );
};