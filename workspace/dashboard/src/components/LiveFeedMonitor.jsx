import React, { useState } from 'react';
import { cameraFeeds } from '../data/emergencyData';

const LiveFeedMonitor = () => {
  const [selectedCamera, setSelectedCamera] = useState(cameraFeeds[0]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getThreatIndicator = (threatCount) => {
    if (threatCount === 0) return 'border-green-500';
    if (threatCount <= 2) return 'border-yellow-500';
    return 'border-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Live Camera Feeds</h2>
      </div>

      <div className="p-6">
        {/* Camera Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {cameraFeeds.map(camera => (
            <button
              key={camera.id}
              onClick={() => setSelectedCamera(camera)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedCamera.id === camera.id
                  ? `${getThreatIndicator(camera.threats)} bg-blue-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{camera.name}</span>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(camera.status)}`}></div>
              </div>
              <div className="text-xs text-gray-500">{camera.location}</div>
              {camera.threats > 0 && (
                <div className="text-xs text-red-600 font-medium mt-1">
                  {camera.threats} threat{camera.threats > 1 ? 's' : ''} detected
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Main Feed Display */}
        <div className="relative">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {/* Simulated Camera Feed */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">📹</div>
                <div className="font-semibold">{selectedCamera.name}</div>
                <div className="text-sm opacity-75">{selectedCamera.location}</div>
              </div>

              {/* Detection Overlay */}
              {selectedCamera.threats > 0 && (
                <>
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium animate-pulse">
                    THREAT DETECTED
                  </div>
                  
                  {/* Simulated Detection Box */}
                  <div className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-red-500 animate-pulse">
                    <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      92% Confidence
                    </div>
                  </div>
                </>
              )}

              {/* Status Indicators */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedCamera.status)}`}></div>
                  <span className="capitalize">{selectedCamera.status}</span>
                </div>
                <div>FPS: 30</div>
                <div>Resolution: 1080p</div>
              </div>

              {/* Timestamp */}
              <div className="absolute bottom-4 right-4 text-white text-sm font-mono">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="mt-4 flex justify-center space-x-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              🔍 Zoom In
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              📸 Snapshot
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              🎥 Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedMonitor;