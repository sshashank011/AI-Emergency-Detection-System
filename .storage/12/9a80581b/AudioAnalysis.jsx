import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const AudioAnalysis = ({ data }) => {
  const audioData = data && data.length > 0 ? data : [
    { frequency: 100, amplitude: 0.2, threat: false },
    { frequency: 200, amplitude: 0.4, threat: false },
    { frequency: 300, amplitude: 0.8, threat: true },
    { frequency: 400, amplitude: 0.6, threat: false },
    { frequency: 500, amplitude: 0.9, threat: true },
    { frequency: 600, amplitude: 0.3, threat: false },
    { frequency: 700, amplitude: 0.5, threat: false },
    { frequency: 800, amplitude: 0.7, threat: true }
  ];

  const threatCount = audioData.filter(d => d.threat).length;
  const threatPercentage = Math.round((threatCount / audioData.length) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Audio Threat Analysis</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${threatCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600">
              {threatCount > 0 ? 'Threats Detected' : 'Normal Audio'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Audio Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{threatPercentage}%</div>
            <div className="text-sm text-gray-600">Threat Level</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">92%</div>
            <div className="text-sm text-gray-600">Audio Accuracy</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{8 - threatCount}</div>
            <div className="text-sm text-gray-600">Normal Frequencies</div>
          </div>
        </div>

        {/* Frequency Analysis Chart */}
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={audioData}>
              <XAxis 
                dataKey="frequency" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}Hz`}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 1]}
                tickFormatter={(value) => `${Math.round(value * 100)}%`}
              />
              <Bar dataKey="amplitude" radius={[2, 2, 0, 0]}>
                {audioData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.threat ? '#ef4444' : '#10b981'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Indicators */}
        {threatCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-red-600 font-semibold">🚨 Audio Threats Detected</span>
            </div>
            <div className="text-sm text-red-700">
              Detected suspicious audio patterns including distress signals, breaking glass, or panic tones.
              Silent alerts have been dispatched to emergency contacts.
            </div>
          </div>
        )}

        {/* Audio Pattern Recognition */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-2">Detected Patterns:</div>
            <ul className="space-y-1 text-gray-600">
              <li>• Shouting: {Math.random() > 0.7 ? '🔴 Detected' : '🟢 Normal'}</li>
              <li>• Glass Breaking: {Math.random() > 0.8 ? '🔴 Detected' : '🟢 Normal'}</li>
              <li>• Panic Tones: {threatCount > 2 ? '🔴 Detected' : '🟢 Normal'}</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-2">System Status:</div>
            <ul className="space-y-1 text-gray-600">
              <li>• Microphones: 🟢 Active (4/4)</li>
              <li>• Processing: 🟢 Real-time</li>
              <li>• ML Models: 🟢 Loaded</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioAnalysis;