import { useMemo } from 'react';
import styles from './TimerDisplay.module.css';

/**
 * TimerDisplay - Large pixel-art styled countdown display
 * Shows MM:SS with blinking colon when active
 */
export function TimerDisplay({ 
  minutes, 
  seconds, 
  isRunning, 
  isComplete 
}) {
  const displayClass = useMemo(() => {
    const classes = [styles.display];
    if (isComplete) classes.push(styles.complete);
    if (isRunning) classes.push(styles.running);
    return classes.join(' ');
  }, [isComplete, isRunning]);

  const colonClass = useMemo(() => {
    const classes = [styles.colon];
    if (isRunning) classes.push(styles.blinking);
    return classes.join(' ');
  }, [isRunning]);

  return (
    <div className={displayClass}>
      <div className={styles.timeContainer}>
        <span className={styles.digits}>{minutes}</span>
        <span className={colonClass}>:</span>
        <span className={styles.digits}>{seconds}</span>
      </div>
      {isComplete && (
        <div className={styles.completeText}>HATCHED!</div>
      )}
    </div>
  );
}

export default TimerDisplay;
