// app.js
// Main application logic for Ngöndro counter with two meditation modes
// Does NOT include backend synchronization or multi-device data sharing

// Application state management
const state = {
  count: 0,
  mode: 1, // 1 = simple counter, 2 = prostration counter
  max: 108,
};

// DOM elements - cached for performance
const elements = {
  counterNumber: document.getElementById('counterNumber'),
  secondaryNumber: document.getElementById('secondaryNumber'),
  progressFill: document.getElementById('progressFill'),
  progressLabel: document.getElementById('progressLabel'),
  modeIndicator: document.getElementById('modeIndicator'),
  counterArea: document.getElementById('counterArea'),
  modeBtn: document.getElementById('modeBtn'),
  menuBtn: document.getElementById('menuBtn'),
  menuModal: document.getElementById('menuModal'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalClose: document.getElementById('modalClose'),
  maxInput: document.getElementById('maxInput'),
  resetBtn: document.getElementById('resetBtn'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
};

// Initialize application
function init() {
  loadStateFromLocalStorage();
  updateDisplay();
  updateSoundToggleButton();
  attachEventListeners();
}

// Load state from localStorage to persist data across sessions
function loadStateFromLocalStorage() {
  const savedState = localStorage.getItem('ngondro-state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state.count = parsed.count || 0;
      state.mode = parsed.mode || 1;
      state.max = parsed.max || 108;
      elements.maxInput.value = state.max;
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
  }
}

// Save state to localStorage
function saveStateToLocalStorage() {
  try {
    localStorage.setItem('ngondro-state', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}

// Attach all event listeners
function attachEventListeners() {
  // Counter increment on click
  elements.counterArea.addEventListener('click', handleCounterClick);

  // Mode switching
  elements.modeBtn.addEventListener('click', handleModeSwitch);

  // Menu open/close
  elements.menuBtn.addEventListener('click', openMenu);
  elements.modalClose.addEventListener('click', closeMenu);
  elements.modalOverlay.addEventListener('click', closeMenu);

  // Settings
  elements.maxInput.addEventListener('change', handleMaxChange);
  elements.resetBtn.addEventListener('click', handleReset);
  elements.soundToggleBtn.addEventListener('click', handleSoundToggle);

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle counter increment
function handleCounterClick(event) {
  // Prevent incrementing if clicking on buttons in header
  if (event.target.closest('.header')) {
    return;
  }

  // Don't increment beyond maximum
  // In prostration mode (mode 2), check against count * 6
  const currentCount = state.mode === 2 ? state.count * 6 : state.count;
  if (currentCount >= state.max) {
    // Play completion sound when at maximum
    if (window.soundManager) {
      soundManager.playCompletion();
    }
    return;
  }

  state.count++;

  // Play appropriate sound
  if (window.soundManager) {
    const newCount = state.mode === 2 ? state.count * 6 : state.count;

    // Play completion sound if reached maximum
    if (newCount >= state.max) {
      soundManager.playCompletion();
    }
    // Play milestone sound at 25%, 50%, 75% progress
    else if (newCount === Math.floor(state.max * 0.25) ||
             newCount === Math.floor(state.max * 0.5) ||
             newCount === Math.floor(state.max * 0.75)) {
      soundManager.playMilestone();
    }
    // Play regular click sound
    else {
      soundManager.playClick();
    }
  }

  updateDisplay();
  saveStateToLocalStorage();
}

// Handle mode switching between simple counter (1) and prostration counter (2)
function handleModeSwitch(event) {
  event.stopPropagation(); // Prevent counter increment

  state.mode = state.mode === 1 ? 2 : 1;
  elements.modeIndicator.textContent = state.mode;

  // If switching to prostration mode (2), check if count * 6 exceeds maximum
  if (state.mode === 2) {
    const prostrationCount = state.count * 6;
    if (prostrationCount > state.max) {
      // Adjust count to not exceed maximum
      state.count = Math.floor(state.max / 6);
    }
  }

  updateDisplay();
  saveStateToLocalStorage();
}

// Update all display elements based on current state
function updateDisplay() {
  // Update main counter number
  elements.counterNumber.textContent = state.count;

  // Update secondary number (only for prostration mode)
  // In prostration mode, show count multiplied by 6
  let displayCount = state.count;
  if (state.mode === 2) {
    const prostrationCount = state.count * 6;
    elements.secondaryNumber.textContent = prostrationCount;
    displayCount = prostrationCount;
  } else {
    elements.secondaryNumber.textContent = '';
  }

  // Update progress bar
  updateProgressBar();

  // Update progress label
  // In prostration mode, show total prostrations (count * 6)
  elements.progressLabel.textContent = `${displayCount} / ${state.max}`;

  // Update mode indicator
  elements.modeIndicator.textContent = state.mode;
}

// Update progress bar fill width
function updateProgressBar() {
  // In prostration mode (mode 2), calculate progress based on count * 6
  const currentCount = state.mode === 2 ? state.count * 6 : state.count;

  // Calculate progress percentage (0-100%)
  const progressPercentage = (currentCount / state.max) * 100;

  // Clamp between 0 and 100
  const clampedProgress = Math.min(Math.max(progressPercentage, 0), 100);

  // Update progress bar width
  elements.progressFill.style.width = `${clampedProgress}%`;
}

// Open settings menu
function openMenu(event) {
  event.stopPropagation(); // Prevent counter increment
  elements.menuModal.style.display = 'block';
  // Re-initialize Lucide icons in modal
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Close settings menu
function closeMenu() {
  elements.menuModal.style.display = 'none';
}

// Handle maximum value change
function handleMaxChange() {
  const newMax = parseInt(elements.maxInput.value, 10);

  // Validate input - must be at least 1
  if (isNaN(newMax) || newMax < 1) {
    elements.maxInput.value = state.max;
    return;
  }

  state.max = newMax;

  // If current count exceeds new maximum, reset to maximum
  // In prostration mode (mode 2), check against count * 6
  const currentCount = state.mode === 2 ? state.count * 6 : state.count;
  if (currentCount > state.max) {
    // In prostration mode, divide by 6 to get number of sets
    state.count = state.mode === 2 ? Math.floor(state.max / 6) : state.max;
  }

  updateDisplay();
  saveStateToLocalStorage();
}

// Handle reset counter
function handleReset() {
  // Ask for confirmation before resetting
  const confirmed = confirm('Reset counter to 0?');

  if (confirmed) {
    state.count = 0;
    updateDisplay();
    saveStateToLocalStorage();
    closeMenu();
  }
}

// Handle keyboard shortcuts for accessibility
function handleKeyboardShortcuts(event) {
  // Space or Enter = increment counter
  if (event.code === 'Space' || event.code === 'Enter') {
    // Don't trigger if typing in input field
    if (event.target.tagName === 'INPUT') {
      return;
    }

    event.preventDefault();
    handleCounterClick(event);
  }

  // Escape = close menu
  if (event.code === 'Escape') {
    closeMenu();
  }

  // M key = toggle mode
  if (event.code === 'KeyM' && !event.target.closest('input')) {
    handleModeSwitch(event);
  }

  // R key = reset (only if menu is open)
  if (event.code === 'KeyR' && elements.menuModal.style.display === 'block') {
    handleReset();
  }

  // S key = toggle sound (only if menu is open)
  if (event.code === 'KeyS' && elements.menuModal.style.display === 'block') {
    handleSoundToggle();
  }
}

// Handle sound toggle
function handleSoundToggle() {
  if (window.soundManager) {
    soundManager.toggleSound();
    updateSoundToggleButton();

    // Play a test sound if enabling
    if (soundManager.isSoundEnabled()) {
      soundManager.playClick();
    }
  }
}

// Update sound toggle button text
function updateSoundToggleButton() {
  if (window.soundManager && elements.soundToggleBtn) {
    const isEnabled = soundManager.isSoundEnabled();
    elements.soundToggleBtn.textContent = `Sound: ${isEnabled ? 'ON' : 'OFF'}`;
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
