import { create } from 'zustand';
import { Threat, Incident, DashboardMetrics } from '../types';

interface DashboardState {
  threats: Threat[];
  incidents: Incident[];
  metrics: DashboardMetrics;
  filters: {
    severity: string[];
    threatType: string[];
    dateRange: [Date, Date];
  };
  addThreat: (threat: Threat) => void;
  updateMetrics: (metrics: DashboardMetrics) => void;
  setFilters: (filters: any) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  threats: [],
  incidents: [],
  metrics: { totalThreats: 0, activeIncidents: 0, systemHealth: 100, threatScore: 0 },
  filters: {
    severity: [],
    threatType: [],
    dateRange: [new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()],
  },
  addThreat: (threat) => set((state) => ({ threats: [threat, ...state.threats].slice(0, 100) })),
  updateMetrics: (metrics) => set({ metrics }),
  setFilters: (filters) => set({ filters }),
}));