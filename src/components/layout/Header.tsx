import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Settings, Bell, LogOut } from 'lucide-react';
import { THEME } from '../../config/theme';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" border-b p-4"
      style={{
        backgroundColor: THEME.colors.surface,
        borderColor: THEME.colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <AlertCircle size={32} color={THEME.colors.accent} />
            </motion.div>
            <h1 className="text-2xl font-bold" style={{ color: THEME.colors.accent }}>
              KAVACH-X Soldier Health Monitroing System
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded hover:opacity-80"
            style={{ color: THEME.colors.text }}
          >
            <Bell size={24} />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: THEME.colors.critical }}
            />
          </motion.button>
          
          <Link to="/settings">
            <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded hover:opacity-80">
              <Settings size={24} style={{ color: THEME.colors.text }} />
            </motion.button>
          </Link>
          
          <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded hover:opacity-80">
            <LogOut size={24} style={{ color: THEME.colors.text }} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};