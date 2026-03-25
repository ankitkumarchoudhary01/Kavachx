import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  AlertTriangle,
  Settings,
  Home,
  ChevronDown,
  Users,
  Cpu,
} from 'lucide-react';
import { THEME } from '../../config/theme';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: AlertTriangle, label: 'Health Alerts', href: '/alerts' },
  // { icon: Users, label: 'Soldiers', href: '/' },
  { icon: Cpu, label: 'Equipment', href: '/equipment' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.aside
      animate={{ width: expanded ? 250 : 80 }}
      transition={{ duration: 0.3 }}
      className="border-r h-screen overflow-y-auto "
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
        {menuItems.map((item, idx) => {
          const active = isActive(item.href);
          return (
            <Link key={idx} to={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-3 rounded transition-all cursor-pointer"
                style={{
                  color: active ? THEME.colors.accent : THEME.colors.text,
                  backgroundColor: active ? THEME.colors.surfaceLight : 'transparent',
                  borderLeft: active ? `3px solid ${THEME.colors.accent}` : '3px solid transparent',
                }}
              >
                <item.icon size={20} />
                {expanded && <span>{item.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};