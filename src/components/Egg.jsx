import { useMemo, useEffect, useRef } from 'react';
import styles from './Egg.module.css';
import { playWobble, playHatch } from '../utils/sounds';

/**
 * Egg - Pixel art egg with wobble/hatch animations
 * The heart of EggHatch Timer - a wobbling egg that hatches when time's up!
 */
export function Egg({ 
  urgencyLevel = 'low', 
  isComplete = false,
  isRunning = false 
}) {
  const hasPlayedHatch = useRef(false);
  const wobbleIntervalRef = useRef(null);

  // Play hatch sound when complete (once)
  useEffect(() => {
    if (isComplete && !hasPlayedHatch.current) {
      hasPlayedHatch.current = true;
      playHatch();
    }
    
    // Reset when not complete
    if (!isComplete) {
      hasPlayedHatch.current = false;
    }
  }, [isComplete]);

  // Wobble sounds based on urgency
  useEffect(() => {
    if (!isRunning || isComplete) {
      if (wobbleIntervalRef.current) {
        clearInterval(wobbleIntervalRef.current);
        wobbleIntervalRef.current = null;
      }
      return;
    }

    // Only play wobble sounds when urgency is high or critical
    if (urgencyLevel === 'high' || urgencyLevel === 'critical') {
      const interval = urgencyLevel === 'critical' ? 500 : 1500;
      wobbleIntervalRef.current = setInterval(() => {
        playWobble();
      }, interval);
    }

    return () => {
      if (wobbleIntervalRef.current) {
        clearInterval(wobbleIntervalRef.current);
        wobbleIntervalRef.current = null;
      }
    };
  }, [isRunning, isComplete, urgencyLevel]);

  // Build class names based on state
  const eggClass = useMemo(() => {
    const classes = [styles.egg];
    
    if (isComplete) {
      classes.push(styles.hatched);
    } else if (isRunning) {
      classes.push(styles.wobbling);
      classes.push(styles['urgency_' + urgencyLevel]);
    }
    
    return classes.join(' ');
  }, [isComplete, isRunning, urgencyLevel]);

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.hatchedContainer}>
          {/* Cracked shell pieces */}
          <div className={styles.shellLeft}></div>
          <div className={styles.shellRight}></div>
          {/* The hatched creature! */}
          <div className={styles.creature}>
            <div className={styles.creatureBody}>
              <div className={styles.creatureEyes}>
                <span className={styles.eye}></span>
                <span className={styles.eye}></span>
              </div>
              <div className={styles.creatureCheeks}>
                <span className={styles.cheek}></span>
                <span className={styles.cheek}></span>
              </div>
            </div>
          </div>
          <div className={styles.sparkles}>
            <span className={styles.sparkle}>✨</span>
            <span className={styles.sparkle}>⭐</span>
            <span className={styles.sparkle}>✨</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={eggClass}>
        {/* Egg shell with decorative pattern */}
        <div className={styles.shell}>
          <div className={styles.pattern}>
            <div className={styles.zigzag}></div>
            <div className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          {/* Crack lines that appear near end */}
          {(urgencyLevel === 'high' || urgencyLevel === 'critical') && (
            <div className={styles.cracks}>
              <div className={styles.crack1}></div>
              <div className={styles.crack2}></div>
            </div>
          )}
        </div>
        {/* Shadow */}
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
}

export default Egg;
