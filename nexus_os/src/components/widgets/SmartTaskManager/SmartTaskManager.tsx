'use client'

import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import WidgetContainer from '../WidgetContainer/WidgetContainer';

const SmartTaskManager: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleToggleTask = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#00FFC2';
    if (progress >= 50) return '#FF00E5';
    return '#00BFFF';
  };

  return (
    <WidgetContainer title="Task Matrix">
      <div className="flex flex-col gap-2">
        {state.tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 justify-between"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="h-5 w-5 rounded border-white/30 border-2 bg-transparent text-[#FF00E5] checked:bg-[#FF00E5] checked:border-[#FF00E5] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <div className="flex flex-col justify-center">
                <p className={`text-base font-medium ${
                  task.completed ? 'line-through opacity-70' : 'text-white'
                }`}>
                  {task.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {task.description}
                </p>
              </div>
            </div>
            <div className="w-16 h-1.5 rounded-full bg-white/20">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${task.progress}%`,
                  backgroundColor: getProgressColor(task.progress)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default SmartTaskManager;