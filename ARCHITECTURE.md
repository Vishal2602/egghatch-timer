# EggHatch Timer - Architecture

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 18 | Fast, familiar |
| Build | Vite | Zero config, instant HMR |
| Styling | CSS Modules | Scoped, no deps |
| Sound | Web Audio API | Browser native, 8-bit capable |
| Font | Press Start 2P | Authentic pixel aesthetic |

## Component Structure

```
src/
├── components/
│   ├── Egg.jsx              # Pixel egg with wobble/hatch animations
│   ├── Egg.module.css
│   ├── TimerDisplay.jsx     # MM:SS countdown display
│   ├── TimerDisplay.module.css
│   ├── Controls.jsx         # Start/Pause/Reset buttons
│   ├── Controls.module.css
│   ├── Presets.jsx          # Quick timer presets
│   ├── Presets.module.css
│   ├── GBAFrame.jsx         # Pokemon menu border wrapper
│   └── GBAFrame.module.css
├── hooks/
│   └── useTimer.js          # All timer logic
├── utils/
│   └── sounds.js            # 8-bit beeps via Web Audio
├── App.jsx
├── App.css
└── main.jsx
```

Flat structure. No nesting folders for single files. Simple.

## Data Model

### Timer State (useTimer hook)
```javascript
{
  timeRemaining: 300,    // seconds left
  initialTime: 300,      // for reset
  isRunning: false,
  isComplete: false      // triggers hatch animation
}
```

### Presets
```javascript
const PRESETS = [
  { id: 'quick', label: 'Quick Egg', seconds: 60, icon: '🥚' },
  { id: 'rare', label: 'Rare Egg', seconds: 300, icon: '✨' },
  { id: 'legendary', label: 'Legendary', seconds: 600, icon: '🌟' },
  { id: 'pomodoro', label: 'Pomodoro', seconds: 1500, icon: '🍅' }
];
```

## GBA Color Palette

```css
:root {
  --gba-dark: #0f380f;        /* Dark green text */
  --gba-light: #9bbc0f;       /* Light green */
  --frame-teal: #40c8c8;      /* Pokemon menu teal */
  --frame-cream: #f8f8f0;     /* Menu background */
  --pokemon-red: #cc0000;     /* Accent */
  --pokemon-yellow: #ffcb05;  /* Accent */
}
```

## Key Implementation Notes

### useTimer Hook
```javascript
// Returns everything the UI needs
const { time, isRunning, isComplete, start, pause, reset, setTime } = useTimer();
```
- `setInterval` with 1s tick
- Cleans up on unmount
- `isComplete` triggers when hitting 0

### Egg Animation Strategy
- CSS `@keyframes` for wobble (transforms)
- Wobble speed tied to `timeRemaining` (faster when low)
- Hatch = egg splits via CSS, shows "hatched" message

### Sound (sounds.js)
- Web Audio API oscillator
- Square wave = authentic chiptune
- Functions: `playBeep()`, `playHatch()`, `playTick()`

### Pixel Art via CSS
- No sprite sheets needed
- Box-shadows for pixel borders
- `image-rendering: pixelated` if we add any images

## Flow

```
Preset click → setTime(seconds)
Start click → isRunning = true → interval ticks
Time = 0 → isComplete = true → hatch sound + animation
Reset → restore initialTime, isComplete = false
```

## What We're NOT Doing
- No Redux/Zustand (useState is fine)
- No TypeScript (overkill for this)
- No testing (15 min build)
- No animations library (CSS is enough)
