import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmergencyDashboard from './components/EmergencyDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <EmergencyDashboard />
        </main>
      </div>
    </div>
  );
}

export default App;