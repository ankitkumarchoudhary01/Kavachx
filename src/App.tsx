import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { SoldierHealthDashboard } from './pages/SoldierHealthDashboard';
import { HealthAlerts } from './pages/HealthAlerts';
import { SoldierDetail } from './pages/SoldierDetail';
import { EquipmentInventory } from './pages/EquipmentInventory';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SoldierHealthDashboard />} />
          <Route path="/alerts" element={<HealthAlerts />} />
          <Route path="/soldier/:id" element={<SoldierDetail />} />
          <Route path="/equipment" element={<EquipmentInventory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}