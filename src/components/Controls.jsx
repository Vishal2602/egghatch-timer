import styles from './Controls.module.css';
import { playStart, playPause, playReset, playBeep } from '../utils/sounds';

/**
 * Controls - GBA-style chunky pixel buttons
 * START / PAUSE / RESET with satisfying press feedback
 */
export function Controls({ 
  isRunning, 
  isComplete, 
  onStart, 
  onPause, 
  onReset,
  canStart
}) {
  const handleStartPause = () => {
    if (isRunning) {
      playPause();
      onPause();
    } else {
      playStart();
      onStart();
    }
  };

  const handleReset = () => {
    playReset();
    onReset();
  };

  return (
    <div className={styles.controls}>
      <button
        className={`${styles.button} ${styles.primary}`}
        onClick={handleStartPause}
        disabled={!canStart && !isRunning}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? 'PAUSE' : (isComplete ? 'AGAIN' : 'START')}
      </button>
      
      <button
        className={`${styles.button} ${styles.secondary}`}
        onClick={handleReset}
        aria-label="Reset timer"
      >
        RESET
      </button>
    </div>
  );
}

export default Controls;
