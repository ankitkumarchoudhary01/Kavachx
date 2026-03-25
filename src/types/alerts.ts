export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export type AlertType =
  | 'heart_rate'
  | 'temperature'
  | 'oxygen'
  | 'blood_pressure'
  | 'respiration'
  | 'hydration'
  | 'fatigue'
  | 'equipment';

export interface HealthAlert {
  id: string;
  soldierId: string;
  soldierName: string;
  unit: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  value: string; // "HR 132 bpm" etc.
  timestamp: Date;
  acknowledged: boolean;
}