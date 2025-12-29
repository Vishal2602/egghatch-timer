import { useState, useCallback, useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { initAudio } from './utils/sounds';
import GBAFrame from './components/GBAFrame';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import Presets from './components/Presets';
import Egg from './components/Egg';
import SoundToggle from './components/SoundToggle';
import './App.css';

/**
 * EggHatch Timer - Main Application
 * A Pokemon GBA-style timer where you're waiting for your egg to hatch!
 */
function App() {
  const [selectedPreset, setSelectedPreset] = useState('quick');
  
  // Initialize timer with 1 minute default (Quick Egg preset)
  const timer = useTimer(60);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset) => {
    setSelectedPreset(preset.id);
    timer.setTime(preset.seconds);
  }, [timer]);

  // Handle start - reset complete state if needed
  const handleStart = useCallback(() => {
    if (timer.isComplete) {
      timer.reset();
      // Small delay to ensure reset completes before starting
      setTimeout(() => {
        timer.start();
      }, 50);
    } else {
      timer.start();
    }
  }, [timer]);

  // Can start if there's time remaining and not already running
  const canStart = timer.timeRemaining > 0;

  return (
    <div className="app">
      <div className="app-container">
        <GBAFrame title="EggHatch Timer">
          {/* The Egg - star of the show */}
          <Egg 
            urgencyLevel={timer.urgencyLevel}
            isComplete={timer.isComplete}
            isRunning={timer.isRunning}
          />
          
          {/* Timer Display */}
          <TimerDisplay
            minutes={timer.formatted.minutes}
            seconds={timer.formatted.seconds}
            isRunning={timer.isRunning}
            isComplete={timer.isComplete}
          />
          
          {/* Control Buttons */}
          <Controls
            isRunning={timer.isRunning}
            isComplete={timer.isComplete}
            onStart={handleStart}
            onPause={timer.pause}
            onReset={timer.reset}
            canStart={canStart}
          />
          
          {/* Preset Selector */}
          <Presets
            onSelect={handlePresetSelect}
            selectedId={selectedPreset}
            disabled={timer.isRunning}
          />
          
          {/* Sound Toggle */}
          <SoundToggle />
        </GBAFrame>
        
        {/* Decorative Pokeballs */}
        <div className="decorations">
          <div className="pokeball-icon"></div>
          <span className="decoration-text">Gotta hatch 'em all!</span>
          <div className="pokeball-icon"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
