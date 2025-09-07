import React from 'react';
import { threatTypes } from '../data/emergencyData';

const ThreatDetectionPanel = ({ threats }) => {
  const getThreatTypeInfo = (typeName) => {
    return threatTypes.find(t => t.name === typeName) || { color: '#6b7280', icon: '⚠️' };
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Threat Detection</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Monitoring</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {threats.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🛡️</div>
            <p className="text-gray-500">No threats detected</p>
            <p className="text-sm text-gray-400">System is monitoring for suspicious activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {threats.map((threat, index) => {
              const typeInfo = getThreatTypeInfo(threat.type);
              return (
                <div
                  key={threat.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    index === 0 ? 'bg-red-50 border-l-red-500' : 'bg-gray-50 border-l-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{typeInfo.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{threat.type}</h3>
                        <p className="text-sm text-gray-600">Camera: {threat.cameraId}</p>
                        <p className="text-xs text-gray-500">
                          {threat.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                        {threat.severity.toUpperCase()}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        {threat.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  
                  {threat.coordinates && (
                    <div className="mt-3 p-2 bg-white rounded border">
                      <div className="text-xs text-gray-500">Detection Coordinates:</div>
                      <div className="text-sm font-mono">
                        X: {threat.coordinates.x}, Y: {threat.coordinates.y}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatDetectionPanel;