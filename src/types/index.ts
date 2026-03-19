export interface Threat {
  id: string;
  type: 'malware' | 'ddos' | 'breach' | 'intrusion' | 'phishing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  target: string;
  timestamp: Date;
  description: string;
  latitude: number;
  longitude: number;
  affectedAssets: number;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  severity: 'critical' | 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  action: string;
  timestamp: Date;
  actor: string;
  details: string;
}

export interface DashboardMetrics {
  totalThreats: number;
  activeIncidents: number;
  systemHealth: number;
  threatScore: number;
}