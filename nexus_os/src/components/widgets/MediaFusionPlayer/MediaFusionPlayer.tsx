'use client'

import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import WidgetContainer from '../WidgetContainer/WidgetContainer';

const MediaFusionPlayer: React.FC = () => {
  const { state, dispatch } = useApp();
  const { currentTrack } = state;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTrack.currentTime / currentTrack.duration) * 100;

  const handlePlayPause = () => {
    dispatch({ type: 'TOGGLE_PLAYBACK' });
  };

  return (
    <WidgetContainer title="Audio Stream">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Album Art */}
        <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#00FFC2] holographic-glow-blue" />

        {/* Track Info */}
        <div className="text-center">
          <p className="text-lg font-bold">{currentTrack.title}</p>
          <p className="text-sm text-gray-300">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm flex flex-col gap-2">
          <div className="w-full h-1.5 rounded-full bg-white/20">
            <div 
              className="h-full rounded-full bg-[#00BFFF] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTrack.currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          
          <button 
            onClick={handlePlayPause}
            className="w-16 h-16 bg-[#00BFFF] rounded-full flex items-center justify-center holographic-glow-blue hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl text-black">
              {currentTrack.isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default MediaFusionPlayer;