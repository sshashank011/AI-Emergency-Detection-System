// Mock data for emergency detection system

export const threatTypes = [
  { id: 1, name: 'Aggressive Behavior', color: '#ef4444', icon: '⚠️' },
  { id: 2, name: 'Weapon Detection', color: '#dc2626', icon: '🔫' },
  { id: 3, name: 'Distress Audio', color: '#f59e0b', icon: '🔊' },
  { id: 4, name: 'Panic Gesture', color: '#f97316', icon: '🙋' },
  { id: 5, name: 'Glass Breaking', color: '#eab308', icon: '💥' }
];

export const cameraFeeds = [
  { id: 'cam_001', name: 'Main Entrance', location: 'Building A - Floor 1', status: 'active', threats: 0 },
  { id: 'cam_002', name: 'Cafeteria', location: 'Building A - Floor 2', status: 'active', threats: 1 },
  { id: 'cam_003', name: 'Parking Lot', location: 'Outdoor - West', status: 'active', threats: 0 },
  { id: 'cam_004', name: 'Conference Room', location: 'Building B - Floor 3', status: 'maintenance', threats: 0 },
  { id: 'cam_005', name: 'Hallway Central', location: 'Building A - Floor 1', status: 'active', threats: 2 }
];

export const emergencyContacts = [
  { id: 1, name: 'Security Team', phone: '+1-555-0101', email: 'security@company.com', role: 'primary' },
  { id: 2, name: 'Local Police', phone: '911', email: 'dispatch@police.gov', role: 'emergency' },
  { id: 3, name: 'Building Manager', phone: '+1-555-0102', email: 'manager@building.com', role: 'secondary' },
  { id: 4, name: 'Medical Team', phone: '+1-555-0103', email: 'medical@company.com', role: 'medical' }
];

export const recentIncidents = [
  {
    id: 'INC_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'Aggressive Behavior',
    location: 'Cafeteria - Cam 002',
    severity: 'medium',
    status: 'resolved',
    responseTime: 28,
    confidence: 94
  },
  {
    id: 'INC_002',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'Distress Audio',
    location: 'Hallway Central - Cam 005',
    severity: 'high',
    status: 'investigating',
    responseTime: 22,
    confidence: 89
  },
  {
    id: 'INC_003',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'Panic Gesture',
    location: 'Conference Room - Cam 004',
    severity: 'low',
    status: 'false_positive',
    responseTime: 31,
    confidence: 76
  }
];

export const systemMetrics = {
  overallAccuracy: 92,
  cpuUsage: 34,
  memoryUsage: 68,
  networkLatency: 12,
  activeCameras: 4,
  totalCameras: 5,
  threatsDetected: 3,
  alertsSent: 2,
  responseTimeAvg: 27
};

export const performanceHistory = [
  { time: '00:00', accuracy: 91, cpu: 32, threats: 0 },
  { time: '04:00', accuracy: 93, cpu: 35, threats: 1 },
  { time: '08:00', accuracy: 89, cpu: 38, threats: 2 },
  { time: '12:00', accuracy: 94, cpu: 33, threats: 1 },
  { time: '16:00', accuracy: 92, cpu: 34, threats: 3 },
  { time: '20:00', accuracy: 90, cpu: 36, threats: 1 }
];

export const audioAnalysisData = [
  { frequency: 100, amplitude: 0.2, threat: false },
  { frequency: 200, amplitude: 0.4, threat: false },
  { frequency: 300, amplitude: 0.8, threat: true },
  { frequency: 400, amplitude: 0.6, threat: false },
  { frequency: 500, amplitude: 0.9, threat: true },
  { frequency: 600, amplitude: 0.3, threat: false },
  { frequency: 700, amplitude: 0.5, threat: false },
  { frequency: 800, amplitude: 0.7, threat: true }
];