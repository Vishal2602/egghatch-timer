import { useState, useEffect } from 'react';
import styles from './SoundToggle.module.css';
import { setSoundEnabled, isSoundEnabled, playBeep } from '../utils/sounds';

/**
 * SoundToggle - GBA options menu-style toggle switch
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(isSoundEnabled());

  const handleToggle = (newState) => {
    setEnabled(newState);
    setSoundEnabled(newState);
    if (newState) {
      playBeep(); // Confirm sound is on
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>SOUND</span>
      <div className={styles.options}>
        <button
          className={styles.option + (enabled ? ' ' + styles.active : '')}
          onClick={() => handleToggle(true)}
          aria-label="Enable sound"
        >
          ON
        </button>
        <button
          className={styles.option + (!enabled ? ' ' + styles.active : '')}
          onClick={() => handleToggle(false)}
          aria-label="Disable sound"
        >
          OFF
        </button>
      </div>
    </div>
  );
}

export default SoundToggle;
