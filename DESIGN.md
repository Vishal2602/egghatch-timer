# PokeTimer GBA - Design System

A complete visual design guide capturing the nostalgic aesthetic of Pokemon games from the Game Boy Advance era. Every pixel matters.

---

## 1. Color Palette

### Primary Colors (GBA Pokemon Inspired)

| Name | Hex | Usage |
|------|-----|-------|
| **Teal Frame** | `#40C8C8` | Main UI frames, borders, Pokemon menu style |
| **Deep Teal** | `#208888` | Frame shadows, depth effect |
| **Cream White** | `#F8F8F0` | Main content backgrounds, text boxes |
| **Pure White** | `#FFFFFF` | Highlights, active states |

### Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Pokemon Yellow** | `#FFCB05` | Primary action buttons, highlights |
| **Gold Pressed** | `#CC9900` | Button pressed states |
| **Pokemon Blue** | `#3D7DCA` | Secondary actions, links |
| **Alert Red** | `#E83030` | Stop button, timer complete, warnings |
| **Dark Red** | `#A82020` | Red pressed states |

### Neutral Tones

| Name | Hex | Usage |
|------|-----|-------|
| **GBA Dark** | `#303030` | Primary text, numbers |
| **GBA Gray** | `#606060` | Secondary text, disabled states |
| **Shadow Gray** | `#A0A0A0` | Subtle shadows, borders |
| **Screen BG** | `#B8D8B8` | Outer screen background (GBA screen tint) |

### Special Effect Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Pixel Glow** | `#98F898` | Timer active glow effect |
| **Complete Gold** | `#FFE040` | Celebration animation |
| **Pokeball Red** | `#E03030` | Decorative elements |
| **Pokeball White** | `#F8F8F8` | Decorative elements |

---

## 2. Typography

### Primary Font: Press Start 2P

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

font-family: 'Press Start 2P', cursive;
```

This pixel-perfect font is essential for authentic GBA feel. It mimics the exact typography used in Pokemon games.

### Type Scale

| Element | Size | Line Height | Usage |
|---------|------|-------------|-------|
| **Timer Display** | `48px` | `1.2` | Main countdown numbers |
| **Preset Labels** | `14px` | `1.5` | Battle preset names |
| **Button Text** | `12px` | `1` | Control button labels |
| **Small Text** | `10px` | `1.4` | Secondary info, hints |
| **Micro Text** | `8px` | `1.4` | Decorative text, badges |

### Text Styling

```css
/* All text should have slight text-shadow for depth */
.pixel-text {
  font-family: 'Press Start 2P', cursive;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
}

/* Timer numbers get enhanced shadow */
.timer-numbers {
  text-shadow:
    3px 3px 0 #208888,
    -1px -1px 0 #FFFFFF;
}
```

---

## 3. Component Styles

### 3.1 GBA Frame (Main Container)

The iconic Pokemon menu frame that wraps all content.

```
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │  <- Outer teal border (4px)
│  ║                               ║  │  <- Inner white border (3px)
│  ║     [CONTENT AREA]            ║  │  <- Cream background
│  ║                               ║  │
│  ╚═══════════════════════════════╝  │
└─────────────────────────────────────┘
```

```css
.gba-frame {
  background: #40C8C8;
  padding: 8px;
  border: 4px solid #208888;
  border-radius: 8px;
  box-shadow:
    inset 2px 2px 0 #60E8E8,
    4px 4px 0 #106060;
}

.gba-frame-inner {
  background: #F8F8F0;
  border: 3px solid #FFFFFF;
  border-radius: 4px;
  padding: 16px;
  box-shadow: inset 2px 2px 0 #D8D8D0;
}
```

### 3.2 Timer Display

Large pixel-art styled countdown display.

```
  ╔══════════════════════╗
  ║                      ║
  ║    0 5 : 0 0         ║  <- 48px Press Start 2P
  ║                      ║
  ╚══════════════════════╝
```

```css
.timer-display {
  background: linear-gradient(180deg, #E8F8E8 0%, #D0E8D0 100%);
  border: 3px solid #208888;
  border-radius: 4px;
  padding: 24px 32px;
  text-align: center;
  box-shadow:
    inset 0 2px 0 #F8FFF8,
    inset 0 -2px 0 #B8D8B8;
}

.timer-numbers {
  font-size: 48px;
  color: #303030;
  font-family: 'Press Start 2P', cursive;
}

/* Colon separator blinks when active */
.timer-colon.blinking {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

### 3.3 Control Buttons

Chunky GBA-style buttons with satisfying press feedback.

**Button States:**

```
IDLE:                    HOVER:                   PRESSED:
┌────────────┐           ┌────────────┐          ┌────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓│           │████████████│          │░░░░░░░░░░░░│
│▓▓ START ▓▓│           │██ START ██│          │░░ START ░░│
│▓▓▓▓▓▓▓▓▓▓▓▓│           │████████████│          │░░░░░░░░░░░░│
└────────────┘           └────────────┘          └────────────┘
  + shadow                 + glow                  - shadow (pushed in)
```

```css
/* Primary Button (Start - Yellow) */
.btn-primary {
  background: linear-gradient(180deg, #FFE040 0%, #FFCB05 50%, #E8B800 100%);
  border: 3px solid #CC9900;
  border-radius: 4px;
  padding: 12px 24px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: #303030;
  cursor: pointer;
  box-shadow:
    0 4px 0 #996600,
    inset 0 2px 0 rgba(255,255,255,0.3);
  transition: all 0.05s ease;
}

.btn-primary:hover {
  background: linear-gradient(180deg, #FFF060 0%, #FFD020 50%, #F0C000 100%);
}

.btn-primary:active {
  box-shadow: 0 1px 0 #996600;
  transform: translateY(3px);
}

/* Secondary Button (Reset - Blue) */
.btn-secondary {
  background: linear-gradient(180deg, #5090E0 0%, #3D7DCA 50%, #306AB8 100%);
  border: 3px solid #285090;
  color: #FFFFFF;
  box-shadow: 0 4px 0 #1A3060;
}

/* Danger Button (Stop - Red) */
.btn-danger {
  background: linear-gradient(180deg, #F04040 0%, #E83030 50%, #D02020 100%);
  border: 3px solid #A82020;
  color: #FFFFFF;
  box-shadow: 0 4px 0 #801010;
}
```

### 3.4 Preset Selector

Pokemon PC box-style selection interface.

```
╔═══════════════════════════════════╗
║  BATTLE PRESETS                   ║
╠═══════════════════════════════════╣
║  > Wild Encounter    [1:00]       ║  <- Selected (highlighted)
║    Gym Battle        [5:00]       ║
║    Elite Four       [10:00]       ║
╚═══════════════════════════════════╝
```

```css
.preset-selector {
  background: #F8F8F0;
  border: 3px solid #40C8C8;
  border-radius: 4px;
}

.preset-header {
  background: #40C8C8;
  color: #FFFFFF;
  padding: 8px 12px;
  font-size: 10px;
  border-bottom: 2px solid #208888;
}

.preset-item {
  padding: 10px 12px;
  font-size: 11px;
  border-bottom: 1px solid #E0E0E0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preset-item:hover {
  background: #E8F8F8;
}

.preset-item.selected {
  background: #40C8C8;
  color: #FFFFFF;
}

.preset-item.selected::before {
  content: '>';
  margin-right: 8px;
  animation: cursor-blink 0.5s step-end infinite;
}

.preset-time {
  font-size: 10px;
  opacity: 0.8;
}
```

### 3.5 Time Input

Pokemon naming screen-style number entry.

```
     ┌───┐   ┌───┐   ┌───┐
     │ ▲ │   │ ▲ │   │ ▲ │
     └───┘   └───┘   └───┘
     ┌───┐   ┌───┐   ┌───┐
     │05 │ : │00 │ : │00 │
     └───┘   └───┘   └───┘
     ┌───┐   ┌───┐   ┌───┐
     │ ▼ │   │ ▼ │   │ ▼ │
     └───┘   └───┘   └───┘
      HRS     MIN     SEC
```

```css
.time-input-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.time-digit {
  background: #E8F8E8;
  border: 2px solid #208888;
  border-radius: 2px;
  width: 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.time-arrow {
  background: #40C8C8;
  border: 2px solid #208888;
  border-radius: 2px;
  width: 32px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

.time-arrow:hover {
  background: #60E8E8;
}

.time-arrow:active {
  background: #208888;
}

.time-label {
  font-size: 8px;
  color: #606060;
  text-align: center;
  margin-top: 4px;
}
```

### 3.6 Sound Toggle

GBA options menu-style toggle switch.

```
  SOUND  [ON]  OFF
          ▲
        selected
```

```css
.toggle-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-label {
  font-size: 10px;
  color: #303030;
}

.toggle-option {
  padding: 6px 12px;
  font-size: 10px;
  border: 2px solid #A0A0A0;
  background: #F8F8F0;
  cursor: pointer;
}

.toggle-option.active {
  background: #40C8C8;
  border-color: #208888;
  color: #FFFFFF;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2);
}
```

---

## 4. Layout Patterns

### 4.1 Main App Layout

```
┌─────────────────────────────────────────┐
│           POKETIMER GBA                 │  <- Header (optional)
├─────────────────────────────────────────┤
│  ╔═════════════════════════════════╗    │
│  ║   ┌─────────────────────────┐   ║    │
│  ║   │                         │   ║    │
│  ║   │      05:00              │   ║    │  <- Timer Display
│  ║   │                         │   ║    │
│  ║   └─────────────────────────┘   ║    │
│  ║                                 ║    │
│  ║   [START]  [STOP]  [RESET]      ║    │  <- Control Buttons
│  ║                                 ║    │
│  ║   ┌─────────────────────────┐   ║    │
│  ║   │ BATTLE PRESETS          │   ║    │  <- Preset Selector
│  ║   │ > Wild Encounter  1:00  │   ║    │
│  ║   │   Gym Battle      5:00  │   ║    │
│  ║   │   Elite Four     10:00  │   ║    │
│  ║   └─────────────────────────┘   ║    │
│  ║                                 ║    │
│  ║        SOUND [ON] OFF           ║    │  <- Sound Toggle
│  ╚═════════════════════════════════╝    │
│                                         │
│      �Pokemon-inspired decorations      │  <- Pokeball icons
└─────────────────────────────────────────┘
```

### 4.2 Spacing System

Use consistent spacing based on 4px grid (GBA pixels):

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps, icon spacing |
| `--space-sm` | `8px` | Between related elements |
| `--space-md` | `16px` | Section padding |
| `--space-lg` | `24px` | Major section gaps |
| `--space-xl` | `32px` | Outer margins |

### 4.3 Container Widths

```css
.app-container {
  max-width: 400px;  /* Compact like a GBA screen */
  margin: 0 auto;
  padding: 16px;
}
```

### 4.4 Responsive Behavior

Keep the nostalgic compact feel even on larger screens:

```css
/* Center the app with GBA-screen-like constraints */
@media (min-width: 480px) {
  .app-container {
    margin-top: 32px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
}

/* On very small screens, go full-width */
@media (max-width: 420px) {
  .app-container {
    max-width: 100%;
    border-radius: 0;
  }
}
```

---

## 5. Special Visual Effects

### 5.1 Pixel Border Effect

Create pixel-perfect borders without images:

```css
.pixel-border {
  position: relative;
  background: #F8F8F0;
}

.pixel-border::before {
  content: '';
  position: absolute;
  inset: -4px;
  background:
    linear-gradient(90deg, #40C8C8 4px, transparent 4px),
    linear-gradient(180deg, #40C8C8 4px, transparent 4px),
    linear-gradient(90deg, transparent calc(100% - 4px), #40C8C8 calc(100% - 4px)),
    linear-gradient(180deg, transparent calc(100% - 4px), #40C8C8 calc(100% - 4px));
  pointer-events: none;
}
```

### 5.2 Timer Complete Animation

Celebratory effect when countdown reaches zero:

```css
@keyframes complete-flash {
  0%, 100% { background: #F8F8F0; }
  25%, 75% { background: #FFE040; }
  50% { background: #F8F8F0; }
}

@keyframes complete-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.timer-complete {
  animation:
    complete-flash 0.3s ease 3,
    complete-bounce 0.3s ease 3;
}

.timer-complete .timer-numbers {
  color: #E83030;
  text-shadow:
    0 0 10px #FFE040,
    3px 3px 0 #A82020;
}
```

### 5.3 Button Press Effect

Satisfying tactile feedback:

```css
.btn-press {
  position: relative;
  transition: transform 0.05s ease, box-shadow 0.05s ease;
}

.btn-press:active {
  transform: translateY(4px);
}

/* Ripple effect on click */
.btn-press::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.3);
  opacity: 0;
  transition: opacity 0.1s;
}

.btn-press:active::after {
  opacity: 1;
}
```

### 5.4 Selection Cursor Animation

Classic RPG menu cursor blink:

```css
@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.selection-cursor {
  animation: cursor-blink 0.5s step-end infinite;
}

.selection-cursor::before {
  content: '>';
  font-family: 'Press Start 2P', cursive;
  margin-right: 8px;
}
```

### 5.5 Idle Animation (Pokeball Spin)

Subtle decorative animation:

```css
@keyframes pokeball-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(5deg); }
}

.pokeball-decoration {
  animation: pokeball-float 2s ease-in-out infinite;
}
```

### 5.6 Scanline Overlay (Optional Retro CRT Effect)

```css
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03) 0px,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

### 5.7 Screen Glow Effect

Subtle GBA backlight feel:

```css
.screen-glow {
  box-shadow:
    0 0 40px rgba(152, 248, 152, 0.2),
    inset 0 0 20px rgba(152, 248, 152, 0.1);
}
```

---

## 6. Iconography

### Pokeball Icon (CSS-only)

```css
.pokeball-icon {
  width: 16px;
  height: 16px;
  background: linear-gradient(
    180deg,
    #E03030 0%,
    #E03030 45%,
    #303030 45%,
    #303030 55%,
    #F8F8F8 55%,
    #F8F8F8 100%
  );
  border-radius: 50%;
  border: 2px solid #303030;
  position: relative;
}

.pokeball-icon::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background: #F8F8F8;
  border: 2px solid #303030;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Arrow Icons

```css
.arrow-up::before { content: '▲'; }
.arrow-down::before { content: '▼'; }
.arrow-left::before { content: '◄'; }
.arrow-right::before { content: '►'; }
```

---

## 7. CSS Variables Summary

```css
:root {
  /* Colors */
  --color-teal: #40C8C8;
  --color-teal-dark: #208888;
  --color-teal-light: #60E8E8;
  --color-cream: #F8F8F0;
  --color-white: #FFFFFF;

  --color-yellow: #FFCB05;
  --color-yellow-light: #FFE040;
  --color-yellow-dark: #CC9900;

  --color-blue: #3D7DCA;
  --color-blue-dark: #285090;

  --color-red: #E83030;
  --color-red-dark: #A82020;

  --color-text: #303030;
  --color-text-secondary: #606060;
  --color-shadow: #A0A0A0;

  --color-screen-bg: #B8D8B8;
  --color-glow: #98F898;

  /* Typography */
  --font-pixel: 'Press Start 2P', cursive;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Borders */
  --border-width: 3px;
  --border-radius-sm: 2px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;

  /* Shadows */
  --shadow-button: 0 4px 0;
  --shadow-frame: 4px 4px 0;
}
```

---

## 8. Accessibility Notes

- Ensure sufficient color contrast (WCAG AA minimum)
- All interactive elements must have visible focus states
- Timer numbers should be large enough to read easily
- Sound should be optional and default to user preference
- Button text should be readable despite pixel font
- Animations should respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

*This design system captures the quirky, nostalgic spirit of Pokemon GBA games while ensuring PokeTimer GBA is functional, accessible, and delightful to use.*
