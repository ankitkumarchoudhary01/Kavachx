import { useState } from 'react';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { Dashboard } from './pages/Dashboard';
import { SoldierHealthDashboard } from './pages/SoldierHealthDashboard';

function App() {
  const [currentPage] = useState<'security' | 'soldier'>('soldier');

  return (
    <WebSocketProvider>
      {currentPage === 'security' ? (
        <Dashboard />
      ) : (
        <SoldierHealthDashboard />
      )}
    </WebSocketProvider>
  );
}

export default App;