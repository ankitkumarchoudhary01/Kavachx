import { SoldierHealthDashboard } from '../pages/SoldierHealthDashboard';
import { HealthAlerts } from '../pages/HealthAlerts';
import { SoldierDetail } from '../pages/SoldierDetail';
import { EquipmentInventory } from '../pages/EquipmentInventory';
import { Analytics } from '../pages/Analytics';
import { Settings } from '../pages/Settings';

export const routes = [
  { path: '/', element: <SoldierHealthDashboard />, label: 'Dashboard' },
  { path: '/alerts', element: <HealthAlerts />, label: 'Alerts' },
  { path: '/soldier/:id', element: <SoldierDetail />, label: 'Soldier Detail' },
  { path: '/equipment', element: <EquipmentInventory />, label: 'Equipment' },
  { path: '/analytics', element: <Analytics />, label: 'Analytics' },
  { path: '/settings', element: <Settings />, label: 'Settings' },
];