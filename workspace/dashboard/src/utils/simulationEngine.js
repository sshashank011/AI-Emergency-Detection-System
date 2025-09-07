// Real-time simulation engine for emergency detection system

class SimulationEngine {
  constructor() {
    this.isRunning = false;
    this.callbacks = [];
    this.threatProbability = 0.1; // 10% chance of threat per cycle
    this.updateInterval = 2000; // 2 seconds
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.generateSimulationData();
    }, this.updateInterval);
  }

  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  subscribe(callback) {
    this.callbacks.push(callback);
  }

  unsubscribe(callback) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  generateSimulationData() {
    const shouldGenerateThreat = Math.random() < this.threatProbability;
    
    if (shouldGenerateThreat) {
      const threat = this.generateThreatEvent();
      this.notifyCallbacks('threat_detected', threat);
    }

    // Generate system metrics update
    const metrics = this.generateSystemMetrics();
    this.notifyCallbacks('metrics_update', metrics);

    // Generate audio analysis data
    const audioData = this.generateAudioData();
    this.notifyCallbacks('audio_update', audioData);
  }

  generateThreatEvent() {
    const threatTypes = [
      'Aggressive Behavior',
      'Weapon Detection', 
      'Distress Audio',
      'Panic Gesture',
      'Glass Breaking'
    ];

    const cameras = ['cam_001', 'cam_002', 'cam_003', 'cam_005'];
    const severities = ['low', 'medium', 'high'];

    return {
      id: `THR_${Date.now()}`,
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      cameraId: cameras[Math.floor(Math.random() * cameras.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
      timestamp: new Date(),
      coordinates: {
        x: Math.floor(Math.random() * 640),
        y: Math.floor(Math.random() * 480)
      }
    };
  }

  generateSystemMetrics() {
    return {
      accuracy: Math.floor(Math.random() * 5) + 90, // 90-94%
      cpuUsage: Math.floor(Math.random() * 8) + 30, // 30-37%
      memoryUsage: Math.floor(Math.random() * 10) + 65, // 65-74%
      networkLatency: Math.floor(Math.random() * 8) + 10, // 10-17ms
      responseTime: Math.floor(Math.random() * 10) + 20 // 20-29 seconds
    };
  }

  generateAudioData() {
    const frequencies = [100, 200, 300, 400, 500, 600, 700, 800];
    return frequencies.map(freq => ({
      frequency: freq,
      amplitude: Math.random(),
      threat: Math.random() < 0.2 // 20% chance of threat frequency
    }));
  }

  notifyCallbacks(eventType, data) {
    this.callbacks.forEach(callback => {
      try {
        callback(eventType, data);
      } catch (error) {
        console.error('Simulation callback error:', error);
      }
    });
  }
}

export const simulationEngine = new SimulationEngine();