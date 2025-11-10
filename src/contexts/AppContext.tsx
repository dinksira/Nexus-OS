'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
}

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
}

interface AppState {
  tasks: Task[];
  cryptoAssets: CryptoAsset[];
  currentTrack: MusicTrack;
}

type AppAction = 
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'UPDATE_TRACK_TIME'; payload: number }
  | { type: 'TOGGLE_PLAYBACK' };

const initialState: AppState = {
  tasks: [
    {
      id: '1',
      title: 'Deploy Neural Net v2.1',
      description: 'Due in 2 days',
      completed: false,
      progress: 75
    },
    {
      id: '2',
      title: 'Finalize Q3 Report',
      description: 'Completed Yesterday',
      completed: true,
      progress: 100
    },
    {
      id: '3',
      title: 'Research Quantum Entanglement',
      description: 'Due in 5 days',
      completed: false,
      progress: 20
    }
  ],
  cryptoAssets: [
    {
      id: 'bitcoin',
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      price: 68420.10,
      change24h: 2.5
    },
    {
      id: 'ethereum',
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      price: 3512.88,
      change24h: -1.2
    },
    {
      id: 'solana',
      name: 'Solana (SOL)',
      symbol: 'SOL',
      price: 150.45,
      change24h: 5.8
    }
  ],
  currentTrack: {
    id: '1',
    title: 'Chromatic Waves',
    artist: 'Synth Rider',
    duration: 235,
    currentTime: 102,
    isPlaying: false
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'UPDATE_TRACK_TIME':
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          currentTime: action.payload
        }
      };
    case 'TOGGLE_PLAYBACK':
      return {
        ...state,
        currentTrack: {
          ...state.currentTrack,
          isPlaying: !state.currentTrack.isPlaying
        }
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};