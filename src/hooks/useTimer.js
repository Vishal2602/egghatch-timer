import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for timer functionality with proper cleanup and edge case handling.
 * 
 * @param {number} initialSeconds - Initial time in seconds (defaults to 60)
 * @returns {Object} Timer state and control functions
 */
export function useTimer(initialSeconds = 60) {
  // Validate initial input - ensure it's a positive integer
  const sanitizedInitial = Math.max(0, Math.floor(initialSeconds));
  
  const [timeRemaining, setTimeRemaining] = useState(sanitizedInitial);
  const [initialTime, setInitialTime] = useState(sanitizedInitial);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Use ref to track interval for proper cleanup
  const intervalRef = useRef(null);
  
  // Callback refs to avoid stale closures
  const onCompleteRef = useRef(null);

  // Clear interval helper - defensive against multiple clears
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Main timer effect
  useEffect(() => {
    if (!isRunning) {
      clearTimerInterval();
      return;
    }

    // Don't start if already complete or no time left
    if (timeRemaining <= 0) {
      setIsRunning(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          // Timer complete - schedule state updates
          setTimeout(() => {
            setIsRunning(false);
            setIsComplete(true);
          }, 0);
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    // Cleanup on unmount or when running state changes
    return () => {
      clearTimerInterval();
    };
  }, [isRunning, clearTimerInterval]);

  // Start the timer
  const start = useCallback(() => {
    // Guard: Don't start if no time left or already complete
    if (timeRemaining <= 0) {
      return false;
    }
    
    // If complete, reset first
    if (isComplete) {
      setIsComplete(false);
    }
    
    setIsRunning(true);
    return true;
  }, [timeRemaining, isComplete]);

  // Pause the timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Toggle between start and pause
  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, start, pause]);

  // Reset to initial time
  const reset = useCallback(() => {
    clearTimerInterval();
    setIsRunning(false);
    setIsComplete(false);
    setTimeRemaining(initialTime);
  }, [initialTime, clearTimerInterval]);

  // Set a new time (from presets)
  const setTime = useCallback((seconds) => {
    // Validate input
    const sanitized = Math.max(0, Math.floor(seconds));
    
    clearTimerInterval();
    setIsRunning(false);
    setIsComplete(false);
    setTimeRemaining(sanitized);
    setInitialTime(sanitized);
  }, [clearTimerInterval]);

  // Format time as MM:SS
  const formatTime = useCallback((totalSeconds) => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    
    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      display: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    };
  }, []);

  // Calculate progress percentage (for animations)
  const progress = initialTime > 0 
    ? ((initialTime - timeRemaining) / initialTime) * 100 
    : 0;

  // Calculate urgency level (for wobble intensity)
  const getUrgencyLevel = useCallback(() => {
    if (timeRemaining <= 0) return 'complete';
    if (timeRemaining <= 5) return 'critical';
    if (timeRemaining <= 15) return 'high';
    if (timeRemaining <= 30) return 'medium';
    return 'low';
  }, [timeRemaining]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  return {
    // State
    timeRemaining,
    initialTime,
    isRunning,
    isComplete,
    progress,
    urgencyLevel: getUrgencyLevel(),
    
    // Formatted display
    formatted: formatTime(timeRemaining),
    
    // Actions
    start,
    pause,
    toggle,
    reset,
    setTime,
    
    // Utilities
    formatTime
  };
}

export default useTimer;
