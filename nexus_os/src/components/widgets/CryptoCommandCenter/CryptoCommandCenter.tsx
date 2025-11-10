'use client'

import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import WidgetContainer from '../WidgetContainer/WidgetContainer';

const CryptoCommandCenter: React.FC = () => {
  const { state } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-[#00FFC2]' : 'text-[#FF00E5]';
  };

  return (
    <WidgetContainer title="CrypTrack">
      <div className="flex flex-col -mx-2">
        {/* Header */}
        <div className="grid grid-cols-3 px-2 py-2 text-sm text-gray-400 border-b border-white/20">
          <span>Asset</span>
          <span className="text-right">Price</span>
          <span className="text-right">24h Change</span>
        </div>

        {/* Crypto Rows */}
        {state.cryptoAssets.map((asset) => (
          <div
            key={asset.id}
            className="grid grid-cols-3 items-center px-2 py-3 hover:bg-white/5 rounded-lg transition-colors"
          >
            <span className="font-medium">{asset.name}</span>
            <span className="text-right font-mono">
              {formatPrice(asset.price)}
            </span>
            <span className={`text-right font-mono ${getChangeColor(asset.change24h)}`}>
              {formatChange(asset.change24h)}
            </span>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default CryptoCommandCenter;