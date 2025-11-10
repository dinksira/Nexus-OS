'use client'

import React from 'react';
import WidgetContainer from '../WidgetContainer/WidgetContainer';
import ProgressRing from '../../ui/ProgressRing/ProgressRing';

const HealthWellnessTracker: React.FC = () => {
  return (
    <WidgetContainer title="Biometrics">
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Heart Rate */}
        <div className="bg-white/5 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-300">Heart Rate</p>
            <p className="text-3xl font-bold text-white">
              72 <span className="text-base font-normal">bpm</span>
            </p>
          </div>
          {/* Simple chart */}
          <div className="w-full h-16 flex items-end gap-1">
            {[40, 55, 65, 72, 68, 75, 70].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-[#FF00E5] to-[#00BFFF] rounded-t transition-all duration-300"
                style={{ height: `${(height / 80) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Steps Progress */}
        <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
          <ProgressRing progress={65} color="#00FFC2">
            <div className="text-center">
              <p className="text-xl font-bold">8k</p>
              <p className="text-xs text-gray-300">Steps</p>
            </div>
          </ProgressRing>
          <p className="text-xs text-gray-400">Goal: 12,000 steps</p>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default HealthWellnessTracker;