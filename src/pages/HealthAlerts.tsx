import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import type { HealthAlert } from '../types/alerts';
import { AlertCard } from '../components/soldier/AlertCard';

const seedAlerts = (): HealthAlert[] => [
  {
    id: 'a1',
    soldierId: '3',
    soldierName: 'Michael Chen',
    unit: 'Alpha Squad',
    type: 'temperature',
    severity: 'critical',
    message: 'Body temperature above safe threshold (possible heat injury)',
    value: 'Temp 39.5°C',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    acknowledged: false,
  },
  {
    id: 'a2',
    soldierId: '2',
    soldierName: 'Maria Johnson',
    unit: 'Bravo Squad',
    type: 'heart_rate',
    severity: 'high',
    message: 'Elevated heart rate sustained',
    value: 'HR 105 bpm',
    timestamp: new Date(Date.now() - 6 * 60 * 1000),
    acknowledged: false,
  },
  {
    id: 'a3',
    soldierId: '3',
    soldierName: 'Michael Chen',
    unit: 'Alpha Squad',
    type: 'oxygen',
    severity: 'high',
    message: 'Blood oxygen below recommended level',
    value: 'SpO₂ 93%',
    timestamp: new Date(Date.now() - 9 * 60 * 1000),
    acknowledged: false,
  },
  {
    id: 'a4',
    soldierId: '2',
    soldierName: 'Maria Johnson',
    unit: 'Bravo Squad',
    type: 'hydration',
    severity: 'medium',
    message: 'Hydration trending low',
    value: 'Hydration 45%',
    timestamp: new Date(Date.now() - 14 * 60 * 1000),
    acknowledged: true,
  },
];

export function HealthAlerts() {
  const [alerts, setAlerts] = useState<HealthAlert[]>(seedAlerts());
  const [severityFilter, setSeverityFilter] = useState<'all' | HealthAlert['severity']>('all');
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  const filtered = useMemo(() => {
    return alerts
      .filter((a) => (showAcknowledged ? true : !a.acknowledged))
      .filter((a) => (severityFilter === 'all' ? true : a.severity === severityFilter))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [alerts, severityFilter, showAcknowledged]);

  const acknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: THEME.colors.accent }}>
                  Health Alerts
                </h1>
                <p className="mt-2" style={{ color: THEME.colors.textSecondary }}>
                  Review abnormal vitals, equipment issues, and mission readiness warnings.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value as any)}
                  className="px-3 py-2 rounded border text-sm"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderColor: THEME.colors.border,
                    color: THEME.colors.text,
                  }}
                >
                  <option value="all">All severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <label
                  className="px-3 py-2 rounded border text-sm flex items-center gap-2 select-none cursor-pointer"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderColor: THEME.colors.border,
                    color: THEME.colors.text,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={showAcknowledged}
                    onChange={(e) => setShowAcknowledged(e.target.checked)}
                  />
                  Show acknowledged
                </label>
              </div>
            </div>

            <div className="grid gap-3">
              {filtered.length === 0 ? (
                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: THEME.colors.surface, borderColor: THEME.colors.border }}
                >
                  <p style={{ color: THEME.colors.textSecondary }}>
                    No alerts match the current filters.
                  </p>
                </div>
              ) : (
                filtered.map((a, i) => (
                  <AlertCard key={a.id} alert={a} index={i} onAcknowledge={acknowledge} />
                ))
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}