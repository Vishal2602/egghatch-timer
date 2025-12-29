# EggHatch Timer - Test Plan

**QA Tester:** Quinn
**Project:** EggHatch Timer - A Pokemon GBA-style timer where you're waiting for your egg to hatch
**Test Date:** December 2025

---

## Overview

This test plan covers the EggHatch Timer, a quirky 16-bit Pokemon GBA-style countdown timer. The core concept: you're not setting a timer, you're incubating an egg. The countdown shows a wobbling pixel egg that hatches when time's up.

---

## 1. Unit Tests - Core Timer Logic (`useTimer.js`)

### 1.1 Timer Initialization

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| UT-001 | Default initialization | Create timer with no arguments | Timer initializes with 60 seconds, not running, not complete | High |
| UT-002 | Custom initial time | Create timer with `useTimer(300)` | Timer initializes with 300 seconds | High |
| UT-003 | Zero initial time | Create timer with `useTimer(0)` | Timer initializes with 0 seconds, cannot start | High |
| UT-004 | Negative initial time | Create timer with `useTimer(-50)` | Timer sanitizes to 0 (Math.max(0, value)) | High |
| UT-005 | Decimal initial time | Create timer with `useTimer(65.7)` | Timer floors to 65 seconds | Medium |
| UT-006 | Very large initial time | Create timer with `useTimer(99999)` | Timer accepts large values gracefully | Low |

### 1.2 Timer Start/Pause/Reset

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| UT-010 | Start timer | Call `start()` with time remaining | `isRunning` becomes true, returns true | High |
| UT-011 | Start with no time | Call `start()` when `timeRemaining` is 0 | Does nothing, returns false | High |
| UT-012 | Pause running timer | Call `pause()` while running | `isRunning` becomes false, time preserved | High |
| UT-013 | Pause already paused | Call `pause()` when not running | No errors, state unchanged | Medium |
| UT-014 | Reset timer | Call `reset()` | Timer returns to `initialTime`, isComplete=false, isRunning=false | High |
| UT-015 | Reset during countdown | Call `reset()` while timer is running | Timer stops and resets to initial time | High |
| UT-016 | Toggle from paused | Call `toggle()` when not running | Timer starts | High |
| UT-017 | Toggle from running | Call `toggle()` when running | Timer pauses | High |

### 1.3 Time Countdown

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| UT-020 | Countdown accuracy | Start timer, wait 5 seconds | Time decreased by exactly 5 seconds | Critical |
| UT-021 | Reaches zero | Let timer count down to 0 | `isComplete` becomes true, `isRunning` becomes false | Critical |
| UT-022 | Doesn't go negative | Let timer pass 0 | `timeRemaining` stays at 0, never negative | High |
| UT-023 | Interval cleanup | Start then unmount component | No memory leaks, interval cleared | High |

### 1.4 Time Setting (Presets)

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| UT-030 | Set new time | Call `setTime(300)` | `timeRemaining` and `initialTime` both become 300 | High |
| UT-031 | Set time while running | Call `setTime()` during countdown | Timer stops, resets to new time | High |
| UT-032 | Set time with negative | Call `setTime(-100)` | Sanitizes to 0 | Medium |
| UT-033 | Set time with decimal | Call `setTime(125.8)` | Floors to 125 | Medium |

### 1.5 Time Formatting

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| UT-040 | Format 60 seconds | `formatTime(60)` | Returns `{ minutes: '01', seconds: '00', display: '01:00' }` | High |
| UT-041 | Format 0 seconds | `formatTime(0)` | Returns `{ minutes: '00', seconds: '00', display: '00:00' }` | High |
| UT-042 | Format 1500 seconds | `formatTime(1500)` (Pomodoro) | Returns `{ minutes: '25', seconds: '00', display: '25:00' }` | High |
| UT-043 | Format 90 seconds | `formatTime(90)` | Returns `{ minutes: '01', seconds: '30', display: '01:30' }` | Medium |
| UT-044 | Format 5 seconds | `formatTime(5)` | Returns `{ minutes: '00', seconds: '05', display: '00:05' }` | Medium |

### 1.6 Urgency Levels

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| UT-050 | Low urgency | 31+ seconds remaining | `urgencyLevel` is 'low' | High |
| UT-051 | Medium urgency | 16-30 seconds remaining | `urgencyLevel` is 'medium' | High |
| UT-052 | High urgency | 6-15 seconds remaining | `urgencyLevel` is 'high' | High |
| UT-053 | Critical urgency | 1-5 seconds remaining | `urgencyLevel` is 'critical' | High |
| UT-054 | Complete | 0 seconds remaining | `urgencyLevel` is 'complete' | High |

---

## 2. Unit Tests - Sound System (`sounds.js`)

### 2.1 Sound Control

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| SND-001 | Sound enabled by default | Check `isSoundEnabled()` on init | Returns true | High |
| SND-002 | Disable sounds | Call `setSoundEnabled(false)` | All sound functions silently skip | High |
| SND-003 | Re-enable sounds | Disable then re-enable | Sounds work again | High |
| SND-004 | No AudioContext errors | Call sound functions before user interaction | Gracefully handles suspended AudioContext | High |

### 2.2 Sound Playback (Manual Verification)

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| SND-010 | Button beep | Click any button | Short, satisfying "click" beep | High |
| SND-011 | Start sound | Press START | Ascending tone plays | High |
| SND-012 | Pause sound | Press PAUSE | Descending tone plays | High |
| SND-013 | Reset sound | Press RESET | Distinctive double-beep | High |
| SND-014 | Preset select | Click a preset | Quick select beep | High |
| SND-015 | Wobble sounds | Timer in high/critical urgency | Periodic wobble sounds | Medium |
| SND-016 | Hatch fanfare | Timer reaches 0 | Triumphant ascending arpeggio | Critical |

---

## 3. Integration Tests - User Flows

### 3.1 Basic Timer Flow

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| INT-001 | Quick Egg complete cycle | Select Quick Egg (1 min) → START → Wait → HATCHED | Full flow works, egg wobbles, then hatches with fanfare | Critical |
| INT-002 | Pause and resume | START → PAUSE → wait → START | Timer resumes from paused time | Critical |
| INT-003 | Reset during countdown | START → wait 10s → RESET | Timer returns to initial time, egg stops wobbling | High |
| INT-004 | Change preset while paused | Pause timer → Select different preset | Timer updates to new preset time | High |
| INT-005 | Restart after hatch | Complete timer → Press AGAIN | Timer resets and can start again | High |

### 3.2 Preset Selection Flow

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| INT-010 | Quick Egg preset | Select Quick Egg | Timer set to 1:00 (60 seconds) | High |
| INT-011 | Rare Egg preset | Select Rare Egg | Timer set to 5:00 (300 seconds) | High |
| INT-012 | Legendary preset | Select Legendary Egg | Timer set to 10:00 (600 seconds) | High |
| INT-013 | Pomodoro preset | Select Pomodoro Egg | Timer set to 25:00 (1500 seconds) | High |
| INT-014 | Preset disabled during run | Start timer → Try to click preset | Presets are disabled/unclickable | High |
| INT-015 | Selection indicator | Click preset | Selection cursor ">" appears, item highlighted | Medium |

### 3.3 Egg Animation Flow

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| INT-020 | Idle egg | Timer paused or not started | Egg is static, no wobble | High |
| INT-021 | Low urgency wobble | Timer running, 31+ seconds | Slow, gentle wobble (2s animation) | High |
| INT-022 | Medium urgency wobble | Timer running, 16-30 seconds | Medium wobble (1.5s), yellow border | High |
| INT-023 | High urgency wobble | Timer running, 6-15 seconds | Fast wobble (0.8s), orange border, cracks appear | High |
| INT-024 | Critical wobble | Timer running, 1-5 seconds | Frantic wobble (0.3s), red border, cracks visible | Critical |
| INT-025 | Hatch animation | Timer reaches 0 | Egg cracks open, cute creature appears, sparkles | Critical |
| INT-026 | Creature bounce | After hatch | Creature bounces happily | Medium |

### 3.4 Sound Toggle Flow

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| INT-030 | Toggle to OFF | Click OFF | All sounds disabled, no beeps | High |
| INT-031 | Toggle to ON | Click ON (from OFF) | Confirmation beep plays, sounds enabled | High |
| INT-032 | Sound persists | Toggle OFF → Start/pause/reset | No sounds during entire flow | High |

---

## 4. Edge Cases - The Bug Hunt

### 4.1 Timing Edge Cases

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| EDGE-001 | Rapid start/pause | Quickly click START/PAUSE 10 times | No duplicate intervals, time stays accurate | Critical |
| EDGE-002 | Double-click START | Double-click START quickly | Only one timer starts, no speed-up | Critical |
| EDGE-003 | Reset at exactly 0 | Wait for timer to hit 0, then RESET | Proper reset, no stuck state | High |
| EDGE-004 | Preset change at 0 | Let timer complete, select new preset | New preset time shown, isComplete resets | High |
| EDGE-005 | Tab switch and return | Start timer → Switch browser tab → Return | Timer continued counting accurately | High |
| EDGE-006 | Start immediately after hatch | Timer completes → Press AGAIN immediately | Clean restart, no double sounds | High |

### 4.2 Input Boundary Edge Cases

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| EDGE-010 | Very fast preset clicking | Click all 4 presets rapidly | Last clicked preset is set correctly | Medium |
| EDGE-011 | Button spam during hatch | Spam START during hatch animation | No weird states, animation completes | Medium |
| EDGE-012 | Timer at 1 second | Start timer at 1:00, wait until 0:01 | Critical urgency shows, then completes normally | High |

### 4.3 Browser/System Edge Cases

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| EDGE-020 | No Web Audio support | Test on browser without Web Audio | App works, sounds fail silently | Medium |
| EDGE-021 | AudioContext suspended | First load, no interaction | Timer works, sounds activate on first click | High |
| EDGE-022 | prefers-reduced-motion | Enable reduced motion in OS | Animations disabled/minimal per CSS | Medium |

### 4.4 State Corruption Edge Cases

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| EDGE-030 | Unmount during countdown | Navigate away while timer running | No memory leaks, interval cleaned up | High |
| EDGE-031 | Multiple complete triggers | Ensure `isComplete` only triggers once | Hatch sound plays once, not multiple times | Critical |
| EDGE-032 | Reset after isComplete | Call reset() when isComplete=true | isComplete resets to false properly | High |

---

## 5. Visual/UI Verification (Manual)

### 5.1 GBA Aesthetic

| ID | Test Case | Expected Result | Priority |
|----|-----------|-----------------|----------|
| VIS-001 | Press Start 2P font | All text uses pixel font | High |
| VIS-002 | Pokemon menu frame | Teal border with cream background, proper styling | High |
| VIS-003 | GBA color palette | Colors match spec (#40C8C8 teal, #FFCB05 yellow, etc.) | Medium |
| VIS-004 | Button pixel style | Chunky buttons with shadow, press effect | High |
| VIS-005 | Timer display | Large pixel numbers, blinking colon when running | High |
| VIS-006 | "HATCHED!" text | Shows after completion in celebratory style | High |
| VIS-007 | Pokeball decorations | Pokeball icons visible with "Gotta hatch 'em all!" text | Low |

### 5.2 Responsive Design

| ID | Test Case | Expected Result | Priority |
|----|-----------|-----------------|----------|
| VIS-010 | Mobile view (< 420px) | Full-width container, readable | High |
| VIS-011 | Desktop view (> 480px) | Centered 400px container with shadow | Medium |
| VIS-012 | Font scaling | Pixel font readable at all sizes | High |

---

## 6. Accessibility Testing

| ID | Test Case | Steps | Expected Result | Priority |
|----|-----------|-------|-----------------|----------|
| A11Y-001 | Keyboard navigation | Tab through all controls | All buttons focusable, logical order | High |
| A11Y-002 | Screen reader labels | Test with screen reader | aria-labels on all buttons | High |
| A11Y-003 | Reduced motion | Enable prefers-reduced-motion | Animations disabled via CSS media query | Medium |
| A11Y-004 | Color contrast | Run contrast checker | All text meets WCAG AA | Medium |
| A11Y-005 | Focus indicators | Tab through controls | Visible focus states on all interactive elements | High |

---

## 7. User Acceptance Criteria

Based on PROJECT_PLAN.md "Done When" requirements:

| ID | Acceptance Criteria | Test Method | Status |
|----|---------------------|-------------|--------|
| UAC-001 | Timer counts down accurately | Run 60-second timer with stopwatch, verify accuracy ±1 second | [ ] |
| UAC-002 | Looks unmistakably GBA Pokemon | Visual inspection: pixel font, teal menu frame, chunky buttons | [ ] |
| UAC-003 | Egg wobbles during countdown | Run timer, verify wobble at all urgency levels | [ ] |
| UAC-004 | Egg hatches when timer completes | Run timer to completion, verify hatch animation + creature | [ ] |
| UAC-005 | Sounds are delightfully retro | Toggle sounds ON, verify 8-bit chiptune quality | [ ] |
| UAC-006 | Four presets available | Verify Quick (1m), Rare (5m), Legendary (10m), Pomodoro (25m) | [ ] |
| UAC-007 | Sound can be toggled | Verify ON/OFF toggle works and persists | [ ] |

---

## 8. Bug Severity Classification

| Severity | Definition | Example |
|----------|------------|---------|
| **Critical** | App unusable, core feature broken | Timer doesn't count down, hatch never triggers |
| **High** | Major feature broken, workaround possible | Sounds don't play, wobble animation broken |
| **Medium** | Minor feature issue, cosmetic problems | Wrong urgency color, timing slightly off |
| **Low** | Polish issue, enhancement suggestions | Decoration alignment, minor animation tweaks |

---

## 9. Test Environment

- **Browser Targets:** Chrome, Firefox, Safari, Edge (latest)
- **Mobile:** iOS Safari, Android Chrome
- **Build Tool:** Vite (dev server for testing)
- **Sound Testing:** Requires device with audio output enabled

---

## Test Execution Checklist

- [ ] All Critical tests pass
- [ ] All High priority tests pass
- [ ] Manual visual verification complete
- [ ] Accessibility basics verified
- [ ] All User Acceptance Criteria met
- [ ] Edge cases tested for state corruption
- [ ] Sound toggle verified

---

*"Gotta catch all the bugs!" - Quinn, QA Tester*
