import { useState } from 'react';
import styles from './Presets.module.css';
import { playSelect } from '../utils/sounds';

/**
 * Preset timer configurations - egg-themed!
 */
const PRESETS = [
  { id: 'quick', label: 'Quick Egg', seconds: 60, icon: '🥚', description: 'Common' },
  { id: 'rare', label: 'Rare Egg', seconds: 300, icon: '✨', description: 'Starter' },
  { id: 'legendary', label: 'Legendary', seconds: 600, icon: '🌟', description: 'Mythical' },
  { id: 'pomodoro', label: 'Pomodoro', seconds: 1500, icon: '🍅', description: '25 min' }
];

/**
 * Format seconds to MM:SS display
 */
function formatPresetTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) {
    return mins + ':00';
  }
  return mins + ':' + String(secs).padStart(2, '0');
}

/**
 * Presets - Pokemon PC box-style selection interface
 */
export function Presets({ onSelect, selectedId, disabled }) {
  const handleSelect = (preset) => {
    if (disabled) return;
    playSelect();
    onSelect(preset);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>INCUBATION PRESETS</span>
      </div>
      <div className={styles.list}>
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={styles.item + (selectedId === preset.id ? ' ' + styles.selected : '')}
            onClick={() => handleSelect(preset)}
            disabled={disabled}
            aria-label={'Select ' + preset.label + ' preset: ' + formatPresetTime(preset.seconds)}
          >
            <span className={styles.cursor}>{'>'}</span>
            <span className={styles.icon}>{preset.icon}</span>
            <span className={styles.label}>{preset.label}</span>
            <span className={styles.time}>{formatPresetTime(preset.seconds)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Presets;
