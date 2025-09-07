import React, { useState, useEffect } from 'react';
import ThreatDetectionPanel from './ThreatDetectionPanel';
import AlertSystem from './AlertSystem';
import LiveFeedMonitor from './LiveFeedMonitor';
import AudioAnalysis from './AudioAnalysis';
import SystemMetrics from './SystemMetrics';
import AdminPanel from './AdminPanel';
import { simulationEngine } from '../utils/simulationEngine';
import { systemMetrics as initialMetrics } from '../data/emergencyData';

const EmergencyDashboard = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [systemMetrics, setSystemMetrics] = useState(initialMetrics);
  const [threats, setThreats] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    const handleSimulationUpdate = (eventType, data) => {
      switch (eventType) {
        case 'threat_detected':
          setThreats(prev => [data, ...prev.slice(0, 9)]); // Keep last 10
          // Generate alert for high severity threats
          if (data.severity === 'high' || data.severity === 'medium') {
            const alert = {
              id: `ALT_${Date.now()}`,
              threatId: data.id,
              type: 'silent_alert',
              message: `${data.type} detected at ${data.cameraId}`,
              timestamp: new Date(),
              status: 'sent',
              responseTime: Math.floor(Math.random() * 10) + 20
            };
            setAlerts(prev => [alert, ...prev.slice(0, 4)]); // Keep last 5
          }
          break;
        case 'metrics_update':
          setSystemMetrics(prev => ({ ...prev, ...data }));
          break;
        case 'audio_update':
          setAudioData(data);
          break;
      }
    };

    simulationEngine.subscribe(handleSimulationUpdate);
    simulationEngine.start();

    return () => {
      simulationEngine.unsubscribe(handleSimulationUpdate);
      simulationEngine.stop();
    };
  }, []);

  const tabs = [
    { id: 'monitoring', label: 'Live Monitoring', icon: '📹' },
    { id: 'alerts', label: 'Alert System', icon: '🚨' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'admin', label: 'Admin Panel', icon: '⚙️' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with System Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Emergency Detection System</h1>
            <p className="text-gray-600">Real-time threat monitoring and silent alert system</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{systemMetrics.overallAccuracy}%</div>
              <div className="text-sm text-gray-500">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{systemMetrics.responseTimeAvg}s</div>
              <div className="text-sm text-gray-500">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{systemMetrics.cpuUsage}%</div>
              <div className="text-sm text-gray-500">CPU Usage</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ThreatDetectionPanel threats={threats} />
            <AudioAnalysis data={audioData} />
          </div>
          <div className="space-y-6">
            <LiveFeedMonitor />
            <SystemMetrics metrics={systemMetrics} />
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <AlertSystem alerts={alerts} />
      )}

      {activeTab === 'analytics' && (
        <SystemMetrics metrics={systemMetrics} showDetailed={true} />
      )}

      {activeTab === 'admin' && (
        <AdminPanel />
      )}
    </div>
  );
};

export default EmergencyDashboard;