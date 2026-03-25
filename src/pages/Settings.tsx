import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, Bell, Shield, Sliders } from 'lucide-react';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'thresholds' | 'notifications' | 'account'>('alerts');
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    // Alert thresholds
    heartRateHigh: 110,
    heartRateLow: 50,
    tempHigh: 39,
    tempLow: 36,
    o2Low: 95,
    bpSystolicHigh: 140,
    bpDiastolicHigh: 90,
    hydrationLow: 40,
    fatigueLevelHigh: 80,

    // Notifications
    emailAlerts: true,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,

    // Display
    theme: 'dark',
    refreshRate: 3000,
    alertTimeout: 30,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'alerts', label: 'Alert Thresholds', icon: AlertCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'thresholds', label: 'Health Thresholds', icon: Sliders },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold" style={{ color: THEME.colors.accent }}>
                Settings
              </h1>
              <p className="mt-2" style={{ color: THEME.colors.textSecondary }}>
                Configure alert thresholds, notifications, and system preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1">
                <div className="space-y-2 sticky top-8">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded text-left transition-colors"
                        style={{
                          backgroundColor:
                            activeTab === tab.id ? THEME.colors.surfaceLight : THEME.colors.surface,
                          color:
                            activeTab === tab.id ? THEME.colors.accent : THEME.colors.textSecondary,
                          borderLeft:
                            activeTab === tab.id
                              ? `3px solid ${THEME.colors.accent}`
                              : `3px solid transparent`,
                        }}
                      >
                        <TabIcon size={18} />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={activeTab}
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderColor: THEME.colors.border,
                  }}
                >
                  {/* Alert Thresholds */}
                  {activeTab === 'alerts' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-6" style={{ color: THEME.colors.accent }}>
                          Alert Thresholds
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { label: 'Heart Rate - High', key: 'heartRateHigh', unit: 'bpm', max: 150 },
                            { label: 'Heart Rate - Low', key: 'heartRateLow', unit: 'bpm', max: 100 },
                            { label: 'Temperature - High', key: 'tempHigh', unit: '°C', max: 42, step: 0.1 },
                            { label: 'Oxygen - Low', key: 'o2Low', unit: '%', max: 100 },
                            { label: 'BP Systolic - High', key: 'bpSystolicHigh', unit: 'mmHg', max: 180 },
                            { label: 'Hydration - Low', key: 'hydrationLow', unit: '%', max: 100 },
                          ].map((field) => (
                            <div key={field.key}>
                              <div className="flex items-center justify-between mb-2">
                                <label style={{ color: THEME.colors.text, fontWeight: '500' }}>
                                  {field.label}
                                </label>
                                <span
                                  style={{
                                    color: THEME.colors.accent,
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                  }}
                                >
                                  {settings[field.key as keyof typeof settings]} {field.unit}
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max={field.max}
                                step={field.step || 1}
                                value={settings[field.key as keyof typeof settings] as number}
                                onChange={(e) =>
                                  setSettings({
                                    ...settings,
                                    [field.key]: parseFloat(e.target.value),
                                  })
                                }
                                className="w-full"
                                style={{ accentColor: THEME.colors.accent }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: THEME.colors.accent }}>
                        Notification Settings
                      </h3>

                      {[
                        { key: 'emailAlerts', label: 'Email Alerts' },
                        { key: 'pushNotifications', label: 'Push Notifications' },
                        { key: 'soundEnabled', label: 'Sound Alerts' },
                        { key: 'vibrationEnabled', label: 'Vibration Alerts' },
                      ].map((option) => (
                        <label
                          key={option.key}
                          className="flex items-center gap-3 p-3 rounded cursor-pointer hover:opacity-80"
                          style={{
                            backgroundColor: THEME.colors.surfaceLight,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={settings[option.key as keyof typeof settings] as boolean}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                [option.key]: e.target.checked,
                              })
                            }
                            style={{ accentColor: THEME.colors.accent }}
                          />
                          <span style={{ color: THEME.colors.text }}>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Health Thresholds */}
                  {activeTab === 'thresholds' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: THEME.colors.accent }}>
                        Health Monitoring Thresholds
                      </h3>

                      <div className="p-4 rounded border" style={{ borderColor: THEME.colors.border }}>
                        <p style={{ color: THEME.colors.textSecondary, marginBottom: '12px' }}>
                          Refresh Rate (ms)
                        </p>
                        <input
                          type="number"
                          value={settings.refreshRate}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              refreshRate: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 rounded border"
                          style={{
                            backgroundColor: THEME.colors.surfaceLight,
                            borderColor: THEME.colors.border,
                            color: THEME.colors.text,
                          }}
                        />
                      </div>

                      <div className="p-4 rounded border" style={{ borderColor: THEME.colors.border }}>
                        <p style={{ color: THEME.colors.textSecondary, marginBottom: '12px' }}>
                          Alert Timeout (seconds)
                        </p>
                        <input
                          type="number"
                          value={settings.alertTimeout}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              alertTimeout: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 rounded border"
                          style={{
                            backgroundColor: THEME.colors.surfaceLight,
                            borderColor: THEME.colors.border,
                            color: THEME.colors.text,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Account */}
                  {activeTab === 'account' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: THEME.colors.accent }}>
                        Account Settings
                      </h3>

                      <div
                        className="p-4 rounded border"
                        style={{
                          backgroundColor: THEME.colors.surfaceLight,
                          borderColor: THEME.colors.border,
                        }}
                      >
                        <p style={{ color: THEME.colors.text, fontWeight: '500' }}>Administrator</p>
                        <p style={{ color: THEME.colors.textSecondary, fontSize: '0.9rem', marginTop: '4px' }}>
                          admin@health-monitoring.local
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 px-4 py-2 rounded border"
                        style={{ borderColor: THEME.colors.critical, color: THEME.colors.critical }}
                      >
                        Sign Out
                      </motion.button>
                    </div>
                  )}
                </motion.div>

                {/* Save Button */}
                <div className="mt-6 flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-6 py-2 rounded font-semibold flex items-center gap-2"
                    style={{ backgroundColor: THEME.colors.accent, color: '#000' }}
                  >
                    <Save size={18} />
                    Save Changes
                  </motion.button>

                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ color: THEME.colors.safe, fontWeight: '500' }}
                    >
                      ✓ Settings saved
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}