import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { performanceHistory } from '../data/emergencyData';

const SystemMetrics = ({ metrics, showDetailed = false }) => {
  const getStatusColor = (value, thresholds) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value, thresholds) => {
    if (value <= thresholds.good) return 'bg-green-500';
    if (value <= thresholds.warning) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">System Performance</h2>
      </div>

      <div className="p-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{metrics.overallAccuracy}%</div>
            <div className="text-sm text-blue-700">Detection Accuracy</div>
            <div className="text-xs text-blue-600 mt-1">Target: 90%+</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className={`text-2xl font-bold ${getStatusColor(metrics.cpuUsage, { good: 35, warning: 50 })}`}>
              {metrics.cpuUsage}%
            </div>
            <div className="text-sm text-green-700">CPU Usage</div>
            <div className="text-xs text-green-600 mt-1">Target: &lt;35%</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{metrics.responseTimeAvg}s</div>
            <div className="text-sm text-purple-700">Response Time</div>
            <div className="text-xs text-purple-600 mt-1">Target: &lt;30s</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{metrics.activeCameras}/{metrics.totalCameras}</div>
            <div className="text-sm text-orange-700">Active Cameras</div>
            <div className="text-xs text-orange-600 mt-1">Coverage: 80%</div>
          </div>
        </div>

        {showDetailed && (
          <>
            {/* Performance History Chart */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Performance History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceHistory}>
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Area 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="#10b981" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Resources</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span className={getStatusColor(metrics.cpuUsage, { good: 35, warning: 50 })}>
                        {metrics.cpuUsage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(metrics.cpuUsage, { good: 35, warning: 50 })}`}
                        style={{ width: `${metrics.cpuUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span className={getStatusColor(metrics.memoryUsage, { good: 70, warning: 85 })}>
                        {metrics.memoryUsage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(metrics.memoryUsage, { good: 70, warning: 85 })}`}
                        style={{ width: `${metrics.memoryUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network Latency</span>
                      <span className={getStatusColor(metrics.networkLatency, { good: 15, warning: 25 })}>
                        {metrics.networkLatency}ms
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(metrics.networkLatency, { good: 15, warning: 25 })}`}
                        style={{ width: `${Math.min(metrics.networkLatency * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Computer Vision</span>
                    </div>
                    <span className="text-green-600 text-sm">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Audio Analysis</span>
                    </div>
                    <span className="text-green-600 text-sm">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Threat Classification</span>
                    </div>
                    <span className="text-green-600 text-sm">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Model Updates</span>
                    </div>
                    <span className="text-blue-600 text-sm">Syncing</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SystemMetrics;