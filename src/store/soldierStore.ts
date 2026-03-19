import { create } from 'zustand';
import { Soldier, SoldierMetrics } from '../types/soldier';

interface SoldierState {
  soldiers: Soldier[];
  selectedSoldier: Soldier | null;
  metrics: SoldierMetrics;
  filters: {
    status: string[];
    unit: string[];
  };
  addSoldier: (soldier: Soldier) => void;
  updateSoldier: (soldier: Soldier) => void;
  selectSoldier: (soldier: Soldier | null) => void;
  updateMetrics: (metrics: SoldierMetrics) => void;
  setFilters: (filters: any) => void;
}

export const useSoldierStore = create<SoldierState>((set) => ({
  soldiers: [],
  selectedSoldier: null,
  metrics: {
    totalActiveSoldiers: 0,
    healthySoldiers: 0,
    warningCount: 0,
    criticalCount: 0,
    averageHeartRate: 0,
    averageTemperature: 0,
    equipmentReadyRate: 0,
  },
  filters: {
    status: [],
    unit: [],
  },
  addSoldier: (soldier) =>
    set((state) => ({
      soldiers: [soldier, ...state.soldiers],
    })),
  updateSoldier: (soldier) =>
    set((state) => ({
      soldiers: state.soldiers.map((s) => (s.id === soldier.id ? soldier : s)),
    })),
  selectSoldier: (soldier) => set({ selectedSoldier: soldier }),
  updateMetrics: (metrics) => set({ metrics }),
  setFilters: (filters) => set({ filters }),
}));