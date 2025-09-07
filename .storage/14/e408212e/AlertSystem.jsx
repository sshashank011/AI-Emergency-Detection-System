import React, { useState } from 'react';
import { emergencyContacts, recentIncidents } from '../data/emergencyData';

const AlertSystem = ({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [testAlert, setTestAlert] = useState(false);

  const getAlertStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIncidentStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleTestAlert = () => {
    setTestAlert(true);
    setTimeout(() => setTestAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
              <button
                onClick={handleTestAlert}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Test Alert System
              </button>
            </div>
          </div>

          <div className="p-6">
            {testAlert && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                  <span className="font-semibold text-blue-800">Test Alert Sent</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  Silent alert dispatched to all emergency contacts in 2.3 seconds
                </p>
              </div>
            )}

            {alerts.length === 0 && !testAlert ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔕</div>
                <p className="text-gray-500">No recent alerts</p>
                <p className="text-sm text-gray-400">System is monitoring silently</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.message}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Alert ID: {alert.id} • Response Time: {alert.responseTime}s
                        </p>
                        <p className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getAlertStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Emergency Contacts</h2>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
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

            <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Manage Contacts
            </button>
          </div>
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Incident History</h2>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Incident ID</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Severity</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Response Time</th>
                  <th className="text-left py-3 px-4">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {recentIncidents.map(incident => (
                  <tr key={incident.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs">{incident.id}</td>
                    <td className="py-3 px-4">{incident.type}</td>
                    <td className="py-3 px-4">{incident.location}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        incident.severity === 'high' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getIncidentStatusColor(incident.status)}`}>
                        {incident.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">{incident.responseTime}s</td>
                    <td className="py-3 px-4">{incident.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="text-gray-900">{selectedAlert.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alert ID</label>
                <p className="font-mono text-sm text-gray-600">{selectedAlert.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Response Time</label>
                <p className="text-gray-900">{selectedAlert.responseTime} seconds</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                <p className="text-gray-900">{selectedAlert.timestamp.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;