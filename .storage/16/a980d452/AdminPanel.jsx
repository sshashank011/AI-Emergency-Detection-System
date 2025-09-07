import React, { useState } from 'react';
import { emergencyContacts, cameraFeeds } from '../data/emergencyData';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('system');
  const [systemSettings, setSystemSettings] = useState({
    detectionSensitivity: 85,
    alertThreshold: 75,
    silentMode: true,
    autoResponse: true,
    recordingEnabled: true,
    audioAnalysis: true
  });

  const sections = [
    { id: 'system', label: 'System Settings', icon: '⚙️' },
    { id: 'cameras', label: 'Camera Management', icon: '📹' },
    { id: 'contacts', label: 'Contact Management', icon: '👥' },
    { id: 'users', label: 'User Access', icon: '🔐' }
  ];

  const handleSettingChange = (setting, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
        <p className="text-gray-600">Configure system settings and manage access controls</p>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r bg-gray-50">
          <nav className="p-4 space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeSection === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detection Sensitivity: {systemSettings.detectionSensitivity}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={systemSettings.detectionSensitivity}
                      onChange={(e) => handleSettingChange('detectionSensitivity', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alert Threshold: {systemSettings.alertThreshold}%
                    </label>
                    <input
                      type="range"
                      min="60"
                      max="95"
                      value={systemSettings.alertThreshold}
                      onChange={(e) => handleSettingChange('alertThreshold', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low Confidence</span>
                      <span>High Confidence</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Features</h3>
                <div className="space-y-3">
                  {Object.entries({
                    silentMode: 'Silent Mode Operation',
                    autoResponse: 'Automatic Alert Response',
                    recordingEnabled: 'Incident Recording',
                    audioAnalysis: 'Audio Threat Analysis'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings[key]}
                          onChange={(e) => handleSettingChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'cameras' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Camera Management</h3>
              <div className="grid gap-4">
                {cameraFeeds.map(camera => (
                  <div key={camera.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{camera.name}</h4>
                        <p className="text-sm text-gray-600">{camera.location}</p>
                        <p className="text-xs text-gray-500">ID: {camera.id}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          camera.status === 'active' ? 'bg-green-100 text-green-800' :
                          camera.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {camera.status}
                        </span>
                        <div className="text-sm text-gray-600 mt-1">
                          Threats: {camera.threats}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'contacts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
              <div className="grid gap-4">
                {emergencyContacts.map(contact => (
                  <div key={contact.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        contact.role === 'primary' ? 'bg-red-100 text-red-800' :
                        contact.role === 'emergency' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Access Control</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900">Administrator</h4>
                  <p className="text-sm text-gray-600">Full system access and configuration</p>
                  <div className="mt-2 flex space-x-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Full Access</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900">Security Team</h4>
                  <p className="text-sm text-gray-600">Monitor alerts and manage incidents</p>
                  <div className="mt-2 flex space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Monitor</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Respond</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900">Viewer</h4>
                  <p className="text-sm text-gray-600">Read-only access to system status</p>
                  <div className="mt-2 flex space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">View Only</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;