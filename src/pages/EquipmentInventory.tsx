import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { THEME } from '../config/theme';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import type { Equipment } from '../types/soldier';

const allEquipment: (Equipment & { assignedTo: string })[] = [
  {
    id: '1',
    name: 'Assault Rifle M16',
    type: 'weapon',
    status: 'ready',
    location: 'SGT Smith - Holster',
    lastChecked: new Date(Date.now() - 30 * 60000),
    assignedTo: 'SGT John Smith',
  },
  {
    id: '2',
    name: '5.56mm Ammunition (200 rounds)',
    type: 'ammo',
    status: 'ready',
    location: 'SGT Smith - Vest',
    lastChecked: new Date(Date.now() - 45 * 60000),
    assignedTo: 'SGT John Smith',
  },
  {
    id: '3',
    name: 'Body Armor Level 4',
    type: 'gear',
    status: 'ready',
    location: 'SGT Smith - Torso',
    lastChecked: new Date(Date.now() - 20 * 60000),
    assignedTo: 'SGT John Smith',
  },
  {
    id: '4',
    name: 'Combat Medical Backpack',
    type: 'medical',
    status: 'ready',
    location: 'CPL Johnson - Backpack',
    lastChecked: new Date(Date.now() - 15 * 60000),
    assignedTo: 'CPL Maria Johnson',
  },
  {
    id: '5',
    name: 'Tactical Radio',
    type: 'communication',
    status: 'damaged',
    location: 'CPL Johnson - Shoulder',
    lastChecked: new Date(Date.now() - 120 * 60000),
    assignedTo: 'CPL Maria Johnson',
  },
  {
    id: '6',
    name: 'GPS Unit',
    type: 'communication',
    status: 'ready',
    location: 'Squad Leader Backup',
    lastChecked: new Date(Date.now() - 60 * 60000),
    assignedTo: 'Unassigned',
  },
  {
    id: '7',
    name: 'Rifle Sling',
    type: 'gear',
    status: 'missing',
    location: 'Unknown',
    lastChecked: new Date(Date.now() - 240 * 60000),
    assignedTo: 'PVT Chen',
  },
  {
    id: '8',
    name: 'Helmet with NVG Mount',
    type: 'gear',
    status: 'ready',
    location: 'PVT Chen - Head',
    lastChecked: new Date(Date.now() - 50 * 60000),
    assignedTo: 'PVT Michael Chen',
  },
];

const statusConfig = {
  ready: { color: THEME.colors.safe, icon: CheckCircle2, label: 'Ready' },
  damaged: { color: THEME.colors.high, icon: AlertCircle, label: 'Damaged' },
  missing: { color: THEME.colors.critical, icon: XCircle, label: 'Missing' },
};

export function EquipmentInventory() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Equipment['type']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Equipment['status']>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'lastChecked'>('lastChecked');

  const filtered = allEquipment
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.assignedTo.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => (typeFilter === 'all' ? true : e.type === typeFilter))
    .filter((e) => (statusFilter === 'all' ? true : e.status === statusFilter))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'status') {
        const order = { ready: 0, damaged: 1, missing: 2 };
        return order[a.status] - order[b.status];
      }
      return b.lastChecked.getTime() - a.lastChecked.getTime();
    });

  const stats = {
    total: allEquipment.length,
    ready: allEquipment.filter((e) => e.status === 'ready').length,
    damaged: allEquipment.filter((e) => e.status === 'damaged').length,
    missing: allEquipment.filter((e) => e.status === 'missing').length,
  };

  return (
    <div style={{ backgroundColor: THEME.colors.background, minHeight: '100vh', color: THEME.colors.text }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            {/* Page Title */}
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: THEME.colors.accent }}>
                  Equipment Inventory
                </h1>
                <p className="mt-2" style={{ color: THEME.colors.textSecondary }}>
                  Track all equipment, maintenance, and asset status across the unit.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded flex items-center gap-2 font-semibold"
                style={{ backgroundColor: THEME.colors.accent, color: '#000' }}
              >
                <Plus size={18} />
                Add Equipment
              </motion.button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Equipment', value: stats.total, color: THEME.colors.accent },
                { label: 'Ready', value: stats.ready, color: THEME.colors.safe },
                { label: 'Damaged', value: stats.damaged, color: THEME.colors.high },
                { label: 'Missing', value: stats.missing, color: THEME.colors.critical },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: THEME.colors.surface,
                    borderColor: THEME.colors.border,
                  }}
                >
                  <p style={{ color: THEME.colors.textSecondary, fontSize: '0.85rem' }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-2" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Filters & Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded border"
                style={{ backgroundColor: THEME.colors.surface, borderColor: THEME.colors.border }}
              >
                <Search size={18} style={{ color: THEME.colors.textSecondary }} />
                <input
                  type="text"
                  placeholder="Search equipment or person..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: THEME.colors.text }}
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 rounded border text-sm"
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderColor: THEME.colors.border,
                  color: THEME.colors.text,
                }}
              >
                <option value="all">All types</option>
                <option value="weapon">Weapons</option>
                <option value="ammo">Ammunition</option>
                <option value="gear">Gear</option>
                <option value="medical">Medical</option>
                <option value="communication">Communication</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded border text-sm"
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderColor: THEME.colors.border,
                  color: THEME.colors.text,
                }}
              >
                <option value="all">All status</option>
                <option value="ready">Ready</option>
                <option value="damaged">Damaged</option>
                <option value="missing">Missing</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded border text-sm"
                style={{
                  backgroundColor: THEME.colors.surface,
                  borderColor: THEME.colors.border,
                  color: THEME.colors.text,
                }}
              >
                <option value="lastChecked">Last Checked</option>
                <option value="name">Name (A-Z)</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Equipment Table */}
            <div className="rounded-lg border overflow-hidden" style={{ borderColor: THEME.colors.border }}>
              <div
                className="p-4 grid grid-cols-6 gap-4 font-semibold text-sm"
                style={{ backgroundColor: THEME.colors.surfaceLight, color: THEME.colors.accent }}
              >
                <div>Equipment</div>
                <div>Type</div>
                <div>Assigned To</div>
                <div>Location</div>
                <div>Status</div>
                <div>Last Checked</div>
              </div>

              <div className="divide-y" style={{ borderColor: THEME.colors.border }}>
                {filtered.map((equipment, idx) => {
                  const statusConfig_ = statusConfig[equipment.status];
                  const Icon = statusConfig_.icon;

                  return (
                    <motion.div
                      key={equipment.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="p-4 grid grid-cols-6 gap-4 items-center text-sm hover:opacity-80 cursor-pointer"
                      style={{ backgroundColor: THEME.colors.surface }}
                    >
                      <div>
                        <p style={{ color: THEME.colors.text, fontWeight: '500' }}>
                          {equipment.name}
                        </p>
                      </div>

                      <div>
                        <span
                          className="text-xs px-2 py-1 rounded-full capitalize"
                          style={{
                            backgroundColor: THEME.colors.surfaceLight,
                            color: THEME.colors.textSecondary,
                          }}
                        >
                          {equipment.type}
                        </span>
                      </div>

                      <div style={{ color: THEME.colors.textSecondary }}>{equipment.assignedTo}</div>

                      <div style={{ color: THEME.colors.textSecondary, fontSize: '0.8rem' }}>
                        {equipment.location}
                      </div>

                      <div className="flex items-center gap-1">
                        <Icon size={16} style={{ color: statusConfig_.color }} />
                        <span style={{ color: statusConfig_.color, fontWeight: '500' }}>
                          {statusConfig_.label}
                        </span>
                      </div>

                      <div style={{ color: THEME.colors.textSecondary, fontSize: '0.8rem' }}>
                        {equipment.lastChecked.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {filtered.length === 0 && (
              <div
                className="p-8 rounded-lg border text-center"
                style={{ backgroundColor: THEME.colors.surface, borderColor: THEME.colors.border }}
              >
                <p style={{ color: THEME.colors.textSecondary }}>No equipment matches your filters.</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}