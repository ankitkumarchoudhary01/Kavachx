import React, { createContext, useContext, useEffect, useState } from 'react';
import { Threat, Incident, DashboardMetrics } from '../types';

interface WebSocketContextType {
  connected: boolean;
  lastUpdate: Date | null;
}

const WebSocketContext = createContext<WebSocketContextType>({ connected: false, lastUpdate: null });

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection
    setConnected(true);
    const interval = setInterval(() => setLastUpdate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WebSocketContext.Provider value={{ connected, lastUpdate }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);