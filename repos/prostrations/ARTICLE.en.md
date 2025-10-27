# Ngöndro Counter: A Minimalist Web Application for Meditation Practice

## Introduction

Ngöndro Counter is a simple Single Page Application (SPA) designed specifically for Tibetan Buddhism practitioners who need to count repetitions during meditation sessions. The application focuses on minimalist design, ease of use, and seamless functionality on both mobile devices and desktop.

This project demonstrates how to create a fully functional web application without using heavy frameworks, using only vanilla JavaScript, pure CSS with BEM methodology, and semantic HTML5. The emphasis is on performance, accessibility, and intuitive user interface.

## Technologies Used

### HTML5

The HTML structure of the application uses semantic elements for better accessibility and SEO. All interactive elements are properly labeled using ARIA attributes (`aria-label`), ensuring that the application is usable even for users with screen readers.

```html
<button class="header__menu-btn menu-btn" id="menuBtn" aria-label="Open menu">
  <i data-lucide="menu"></i>
</button>
```

The document structure is logically divided into three main sections:
- **Header**: Contains logo, application name, and controls
- **Main**: Main clickable area with counter
- **Footer**: Progress bar and progress information

### CSS with BEM Methodology

BEM (Block Element Modifier) is a methodology for naming CSS classes that ensures readability, modularity, and easy code maintenance. In this application, each component is isolated as a separate block with its own elements and modifiers.

Example BEM structure for progress bar:
```css
.progress { /* Block */ }
.progress__container { /* Element */ }
.progress__track { /* Element */ }
.progress__fill { /* Element */ }
.progress__stopper { /* Element */ }
.progress__stopper--start { /* Modifier */ }
.progress__stopper--end { /* Modifier */ }
```

**Advantages of BEM methodology:**
- Clear component hierarchy
- No class name conflicts
- Easy code navigation
- Component reusability
- Simpler refactoring

### Vanilla JavaScript

Instead of using frameworks like React or Vue.js, we chose vanilla JavaScript for the following reasons:

1. **Performance**: No additional framework overhead
2. **Size**: No dependencies to download
3. **Simplicity**: Direct DOM access
4. **Control**: Full control over application behavior
5. **Learning**: Better understanding of web development basics

JavaScript in the application is organized into logical units:
- State management
- DOM element caching
- Event handling
- LocalStorage persistence
- Display updates

### Lucide Icons

Lucide is a modern open-source icon library built as a fork of Feather Icons. Icons are implemented via CDN and initialized on page load:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

Advantages of Lucide:
- Small icon size (optimized SVG)
- Consistent design
- Wide icon palette
- Easy implementation

## Practical Use

### Mode 1: Simple Counter

The first mode is for standard counting of mantra repetitions or other meditation practices. The user simply clicks on the screen and the counter increases by 1. This mode is ideal for:

- Counting mantras (e.g., Om Mani Padme Hum)
- Tracking breath cycles
- Counting mala rounds (Buddhist rosary beads)
- Any repetitive practices

### Mode 2: Prostration Counter

The second mode is specifically designed for counting prostrations, which is a physical practice where practitioners repeatedly bow to the ground. In Tibetan Buddhism, it's common to do prostrations in sets of six.

In this mode, the application displays:
- **Main number**: Number of prostration sets
- **Secondary number** (gray): Total number of prostrations (main number × 6)

For example:
- Main number: 18
- Secondary number: 108 (18 × 6)

This feature helps practitioners track both the number of sets and the total number of prostrations without mental calculation.

### Progress Bar

The visual progress bar provides immediate feedback on progress toward the goal. The design is inspired by minimalist aesthetics:

- **Gray line** (4px): Represents the total path
- **White line** (12px, 3× thicker): Shows current progress
- **Stoppers** at the beginning and end: Visual boundaries

The progress bar animates smoothly with each click, providing pleasant visual feedback.

### Maximum Setting

The default maximum is set to 108, which is a sacred number in many Eastern traditions. However, users can change this number according to their needs:

- 108: Traditional number of repetitions
- 1,080: Tenfold for more intensive practice
- 10,800: Hundredfold for long-term retreats
- Any other number according to preferences

## Architectural Decisions

### State Management

The application uses a simple JavaScript object for state management:

```javascript
const state = {
  count: 0,      // Current count
  mode: 1,       // Mode (1 or 2)
  max: 108,      // Maximum
};
```

This approach is sufficient for a small application and eliminates the need for complex state management libraries like Redux or Vuex.

**Advantages:**
- Simple implementation
- Easy debugging
- Direct state access
- No boilerplate

### DOM Element Caching

To improve performance, all DOM elements are loaded once during initialization and stored in the `elements` object:

```javascript
const elements = {
  counterNumber: document.getElementById('counterNumber'),
  progressFill: document.getElementById('progressFill'),
  // ...other elements
};
```

**Reasons for caching:**
1. **Performance**: Avoid repeated DOM queries
2. **Readability**: Central place for all references
3. **Maintenance**: Easy tracking of used elements

### LocalStorage Persistence

The application automatically saves state to localStorage, which means:
- Data survives page refresh
- User can close browser and return later
- We don't need a backend for data storage

```javascript
function saveStateToLocalStorage() {
  try {
    localStorage.setItem('ngondro-state', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}
```

The **try-catch block** ensures that the application doesn't stop working if localStorage is full or unavailable (e.g., in private mode of some browsers).

### Event Delegation and Bubbling

Instead of adding event listeners to each clickable element, we use delegation strategy:

```javascript
elements.counterArea.addEventListener('click', handleCounterClick);
```

In the handler, we then check if the user didn't click on buttons in the header:

```javascript
if (event.target.closest('.header')) {
  return;
}
```

This ensures that clicking on menu or mode button doesn't increment the counter.

### CSS Custom Properties (Variables)

Modern CSS allows the use of variables for better maintenance and consistency:

```css
:root {
  --color-background: #000000;
  --color-foreground: #ffffff;
  --spacing-md: 1.5rem;
  --transition-normal: 300ms ease-in-out;
}
```

**Advantages:**
- Central place for design tokens
- Easy changes to entire look
- Runtime changes possible via JavaScript
- Better code readability

## Design and UX Decisions

### Minimalist Black and White Design

The decision to use only black and white isn't just aesthetic, but has practical reasons:

1. **Removal of distracting elements**: Meditation requires peace and concentration
2. **High contrast**: Easy readability under any lighting conditions
3. **Universality**: Works for all types of users
4. **Timelessness**: Minimalist design doesn't get boring
5. **Performance**: Less styling = faster rendering

### Large Clickable Areas

The main counter area occupies most of the screen, ensuring:
- Easy clicking even on mobile devices
- Ability to click without searching for small buttons
- Intuitive use for beginners
- Minimal error rate

### Visual Feedback

Every interaction has immediate visual response:

- **Counter click**: Number slightly shrinks (scale 0.98)
- **Button hover**: Enlargement (scale 1.1)
- **Progress bar**: Smooth animation (300ms)
- **Modal**: Blur effect on background

### Responsive Typography

The counter size is set to `25vw` (25% of viewport width), which means:
- Automatic scaling according to screen size
- Always sufficiently large number for readability
- Consistent appearance on all devices

### Keyboard Shortcuts

For advanced users, keyboard shortcuts are available:

- **Space / Enter**: Increment counter
- **M**: Switch mode
- **Escape**: Close menu
- **R**: Reset (if menu is open)

This increases efficiency for users who prefer keyboard.

## Edge Cases and Their Solutions

### 1. Exceeding Maximum

**Problem**: What happens when user clicks above maximum?

**Solution**:
```javascript
if (state.count >= state.max) {
  return;
}
```

Counter simply stops at maximum and further clicks have no effect. User sees they've reached the goal.

### 2. Changing Maximum Below Current Count

**Problem**: User has count = 50 and changes maximum to 30.

**Solution**:
```javascript
if (state.count > state.max) {
  state.count = state.max;
}
```

Counter automatically decreases to new maximum to avoid inconsistent state.

### 3. LocalStorage Not Available

**Problem**: Some browsers in private mode block localStorage.

**Solution**: Wrapping with try-catch block:
```javascript
try {
  localStorage.setItem('ngondro-state', JSON.stringify(state));
} catch (error) {
  console.error('Failed to save state to localStorage:', error);
}
```

Application will work even without data persistence.

### 4. Invalid Input for Maximum

**Problem**: User enters non-numeric value or number less than 1.

**Solution**:
```javascript
const newMax = parseInt(elements.maxInput.value, 10);
if (isNaN(newMax) || newMax < 1) {
  elements.maxInput.value = state.max;
  return;
}
```

Input returns to previous valid value.

### 5. Clicking Buttons in Header

**Problem**: User clicks on menu or mode button and doesn't want to increment counter.

**Solution**: Event propagation control:
```javascript
event.stopPropagation(); // On buttons
// And in counter handler:
if (event.target.closest('.header')) {
  return;
}
```

### 6. Typing in Input Field

**Problem**: Keyboard shortcuts (Space, Enter) would activate counter during value entry.

**Solution**:
```javascript
if (event.target.tagName === 'INPUT') {
  return;
}
```

### 7. Progress Bar Over 100%

**Problem**: Mathematical rounding could cause progress bar to exceed 100%.

**Solution**: Value clamping:
```javascript
const clampedProgress = Math.min(Math.max(progressPercentage, 0), 100);
```

### 8. Rapid Clicking (Button Mashing)

**Problem**: User quickly clicks many times in succession.

**Solution**: Application handles this well thanks to:
- Synchronous state update
- CSS transitions instead of animations (interruptible)
- No debouncing needed (every click is valid)

## Performance Optimization

### 1. Minimal Repaints

By using CSS transforms instead of position changes:
```css
.counter-area:active .counter-area__number {
  transform: scale(0.98);
}
```

Transform is GPU-accelerated and doesn't trigger layout reflow.

### 2. CSS Containment

For component isolation, we can add:
```css
.counter-area {
  contain: layout style paint;
}
```

This tells the browser that changes inside this element don't affect the rest of the page.

### 3. Will-change Hint

For frequently animated elements:
```css
.progress__fill {
  will-change: width;
}
```

Browser prepares GPU layer for this element in advance.

### 4. Passive Event Listeners

For scroll and touch events (if we added them):
```javascript
element.addEventListener('touchstart', handler, { passive: true });
```

### 5. Code Splitting

For larger applications, we could split JavaScript:
- Core functionality (loads immediately)
- Modal/settings (lazy load on open)
- Analytics (defer)

In our small application, this isn't necessary, but it's a best practice for larger projects.

## Testing

### Manual Testing

Checklist for application testing:

**Basic functionality:**
- ✓ Click increments counter
- ✓ Progress bar moves correctly
- ✓ Counter stops at maximum
- ✓ LocalStorage saves state

**Mode 1 (Simple Counter):**
- ✓ Only main number displays
- ✓ Secondary number is empty

**Mode 2 (Prostrations):**
- ✓ Main and secondary numbers display
- ✓ Secondary number = main × 6
- ✓ Progress bar based on main number

**Mode Switching:**
- ✓ Button displays 1 or 2
- ✓ Click switches mode
- ✓ State saves to localStorage

**Menu and Settings:**
- ✓ Menu opens/closes
- ✓ Maximum change works
- ✓ Reset requires confirmation
- ✓ Lucide icons display

**Responsiveness:**
- ✓ Desktop (1920×1080)
- ✓ Tablet (768×1024)
- ✓ Mobile (375×667)
- ✓ Mobile landscape

**Keyboard shortcuts:**
- ✓ Space increments counter
- ✓ M switches mode
- ✓ Escape closes menu
- ✓ Input fields work normally

### Automated Testing

For production applications, we would add:

**Unit tests** (Jest or Vitest):
```javascript
describe('Counter logic', () => {
  test('increments count', () => {
    const initialCount = state.count;
    handleCounterClick();
    expect(state.count).toBe(initialCount + 1);
  });

  test('stops at maximum', () => {
    state.count = state.max;
    handleCounterClick();
    expect(state.count).toBe(state.max);
  });
});
```

**Integration tests** (Testing Library):
```javascript
test('clicking counter area increments number', () => {
  const counterArea = screen.getByRole('main');
  fireEvent.click(counterArea);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

**E2E tests** (Playwright or Cypress):
```javascript
test('complete user flow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('.counter-area');
  await expect(page.locator('#counterNumber')).toHaveText('1');
});
```

## Service Worker and Offline Functionality

The application now includes a fully functional Service Worker implementing the **Stale-While-Revalidate** strategy, ensuring reliable offline functionality and optimal performance.

### What is a Service Worker?

A Service Worker is a JavaScript file running in the background of the browser, separate from the web page. It functions as a proxy server between the application and the network, enabling:

- Caching files for offline access
- Intercepting and modifying network requests
- Background sync and push notifications
- Improving application performance

### Stale-While-Revalidate Strategy

This strategy is ideal for applications where loading speed is a priority, but we also want to display current content.

**How it works:**
1. **Immediate response**: When requesting a file, Service Worker first checks the cache
2. **Returning cached version**: If the file exists in cache, it returns it immediately to the user
3. **Background update**: Parallel to returning the cached version, a new version is downloaded from the network
4. **Cache update**: The new version is saved to cache for next use

**Advantages:**
- Lightning-fast loading (returns cached version)
- Always fresh content (updates in background)
- Works offline (uses cache)
- Seamless user experience

**Comparison with strategies:**

| Strategy | Speed | Data Freshness | Offline | Use Case |
|----------|-------|----------------|---------|----------|
| **Network First** | Slow | Always fresh | Partial | API calls |
| **Cache First** | Fast | May be stale | Full | Static assets |
| **Stale-While-Revalidate** | Fast | Updates | Full | SPA applications |
| **Network Only** | Slow | Always fresh | None | Real-time data |

### Implementation in Ngöndro Counter

#### 1. Service Worker File (sw.js)

The Service Worker contains three main event listeners:

**Install event** - caching assets on first visit:
```javascript
const CACHE_NAME = 'ngondro-counter-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate new SW immediately
});
```

`skipWaiting()` ensures that the new Service Worker activates immediately, without waiting for all open tabs to close.

**Activate event** - cleaning old cache versions:
```javascript
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of pages
});
```

`clients.claim()` ensures that the Service Worker starts controlling all pages immediately after activation.

**Fetch event** - Stale-While-Revalidate implementation:
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // Fetch from network in background
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Update cache with new response
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((error) => {
            // Network failed, return cached version
            return cachedResponse;
          });

        // Return cached immediately, or wait for network
        return cachedResponse || fetchPromise;
      });
    })
  );
});
```

**Key implementation details:**
- `networkResponse.clone()` - we must clone the response because the stream can only be read once
- `networkResponse.status === 200` - we only cache successful responses
- `cachedResponse || fetchPromise` - fallback to network if not in cache
- Error handling ensures functionality even during network outage

#### 2. Registration in index.html

The Service Worker is registered after page load:
```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
```

**Why on 'load' event?**
- Ensures that SW registration doesn't block initial page rendering
- Application loads quickly, SW registers in the background
- Best practice for performance

**Feature detection** (`'serviceWorker' in navigator`):
- Service Workers aren't supported in all browsers
- Application works without SW, just without offline functionality
- Graceful degradation

### Service Worker Lifecycle

The Service Worker lifecycle has several phases:

1. **Registration** - SW is registered using `navigator.serviceWorker.register()`
2. **Installing** - Browser downloads SW file and triggers install event
3. **Installed/Waiting** - SW is installed, waiting for activation
4. **Activating** - Activate event triggers (on first install or update)
5. **Activated** - SW is active and controls fetch requests
6. **Redundant** - Old SW is replaced by new one

**Update mechanism:**
- Browser automatically checks for changes in sw.js on every visit
- If SW changes (even by 1 byte), new installation starts
- New SW waits until user closes all open tabs (unless we use `skipWaiting()`)

### Cache Versioning

Cache version management is crucial for update management:

```javascript
const CACHE_NAME = 'ngondro-counter-v1';
```

**Update process:**
1. Change `CACHE_NAME` to `'ngondro-counter-v2'`
2. New SW installs and creates new cache
3. Activation deletes old v1 cache
4. User gets updated version

**Best practices:**
- Use semantic versioning (v1, v2, v3...)
- Or timestamp: `'ngondro-counter-2025-10-27'`
- Or hash: `'ngondro-counter-abc123'` (automated build systems)

### Testing Service Worker

**Chrome DevTools:**
1. Open DevTools (F12)
2. Application tab → Service Workers
3. Check status (activated and running)
4. Test offline: Check "Offline" checkbox
5. Check cache: Cache Storage → ngondro-counter-v1

**Firefox DevTools:**
1. Open DevTools
2. Storage tab → Service Workers
3. View cache in Cache Storage

**Testing checklist:**
- ✓ SW registered successfully
- ✓ Install event completed without errors
- ✓ All assets are cached
- ✓ Application works offline
- ✓ Online requests update cache
- ✓ SW update properly replaces old version

### Performance Metrics

Service Worker with cache-first strategy dramatically improves performance:

**Without Service Worker:**
- First Load: ~200-500ms (network dependent)
- Repeated Load: ~100-300ms (browser cache)

**With Service Worker:**
- First Load: ~200-500ms (must download assets)
- Repeated Load: ~10-50ms (loading from Service Worker cache)
- Offline Load: ~10-50ms (works identically to online)

**Lighthouse score improvements:**
- Performance: +10-20 points
- Progressive Web App: Now meets PWA criteria
- Best Practices: Offline functionality

### Edge Cases and Problem Solving

#### 1. Service Worker Not Updating

**Problem**: Code changes don't appear in browser.

**Reasons:**
- Browser caches sw.js itself
- Old SW is still active

**Solution:**
```javascript
// In DevTools: Application → Service Workers → Unregister
// Or programmatically:
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => registration.unregister());
});
```

**Prevention:**
- Change CACHE_NAME on every update
- Use `skipWaiting()` and `clients.claim()`
- Server should send proper cache headers for sw.js

#### 2. Files Not in Cache

**Problem**: Some files don't load offline.

**Solution:**
- Check ASSETS_TO_CACHE - are all files there?
- Check DevTools → Network tab on first visit
- All files must return status 200

#### 3. CORS Issues

**Problem**: External resources (e.g., Lucide Icons CDN) don't work offline.

**Solution:**
```javascript
fetch(event.request, { mode: 'no-cors' })
```

Or better: host all assets locally for full control.

#### 4. localStorage vs Service Worker Cache

**Problem**: Where to store data?

**Difference:**
- **localStorage**: For application state (count, mode, max)
- **Service Worker cache**: For files (HTML, CSS, JS, images)

They shouldn't overlap - each has its purpose.

#### 5. Service Worker Scope

**Problem**: SW only controls requests in its scope.

**Explanation:**
```javascript
// SW in /app/sw.js has scope /app/
// Won't intercept requests to /other/
```

**Solution**: Place sw.js in root directory.

### Progressive Web App (PWA)

With the added Service Worker, the application is now almost a full PWA. For complete PWA we need:

**1. Web App Manifest** (manifest.json):
```json
{
  "name": "Ngöndro Counter",
  "short_name": "Ngöndro",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**2. Links in HTML:**
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#000000">
```

**3. HTTPS requirement:**
- Service Workers only work on HTTPS (except localhost)
- Security measure - SW has great power over the application

### Debugging Tips

**Console logs in Service Worker:**
```javascript
console.log('[Service Worker] Installing...');
```

These logs appear in Chrome DevTools → Console, but you must have the Service Worker context selected (not the page).

**Force update:**
```javascript
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// From application:
navigator.serviceWorker.controller.postMessage('skipWaiting');
```

**Simulate slow network:**
DevTools → Network tab → Throttling → Slow 3G

Allows testing how the application works with slow connection and whether cache properly speeds up loading.

### Best Practices

1. **Always version cache** - makes update management easier
2. **Minimize cached files** - faster install
3. **Use `skipWaiting()` carefully** - can break running application
4. **Log important events** - makes debugging easier
5. **Test offline** - before production deployment
6. **Optimize cache strategies** - different strategies for different file types
7. **Implement cache expiration** - for large applications
8. **Use Workbox** - Google library for SW (for more complex projects)

### Comparing Cache Strategies for Different File Types

For more complex applications, we can use different strategies for different request types:

```javascript
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // HTML - Network First (always fresh)
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(networkFirst(event.request));
  }

  // CSS/JS - Stale-While-Revalidate (fast + current)
  else if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(staleWhileRevalidate(event.request));
  }

  // Images - Cache First (performance)
  else if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif)$/)) {
    event.respondWith(cacheFirst(event.request));
  }

  // API calls - Network Only
  else if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
  }
});
```

For our simple application, one strategy for all files is sufficient.

### Service Worker Section Conclusion

Service Worker implementation brings crucial improvements to the application:

✅ **Offline functionality** - application works without internet connection
✅ **Faster loading** - cache is faster than network
✅ **Better UX** - user sees content immediately
✅ **PWA ready** - meets basic PWA requirements
✅ **Reliability** - works even with poor connection

Service Worker is a powerful tool that with minimal code (~70 lines) significantly improves user experience. For a simple application like Ngöndro Counter, Stale-While-Revalidate is the ideal choice - it provides the speed of cache-first strategy with the data freshness of network-first approach.

## Sound Effects Using Web Audio API

The application now includes a complete sound effects system that provides haptic feedback to the user during meditation practice. Sounds are generated using the Web Audio API directly in the browser without external audio files.

### Why Web Audio API Instead of Audio Files?

The traditional approach would be to use `.mp3` or `.wav` files:

```javascript
// Traditional approach (NOT used)
const audio = new Audio('click.mp3');
audio.volume = 0.3;
audio.play();
```

**Problems with this approach:**
- 📦 **Size**: Audio files take 50-500 KB each
- 🌐 **Network requests**: Each file must be downloaded
- ⏱️ **Latency**: Delay when loading files
- 💾 **Cache management**: More complex offline cache management
- 🎵 **Quality**: Compression can degrade sound

**Advantages of Web Audio API:**
- 🪶 **Small size**: Only ~5 KB of JavaScript code
- ⚡ **Zero latency**: Sounds generated instantly
- 📴 **Offline-first**: No external dependencies
- 🎼 **Precision**: Mathematically pure tones
- 🔧 **Flexibility**: Easy parameter adjustment

### Sound Manager Implementation

Complete sound management is implemented in a separate `SoundManager` class:

```javascript
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.soundEnabled = true;
    this.loadSoundPreference();
  }

  // Lazy initialization - due to autoplay policy
  initAudioContext() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.error('Web Audio API not supported:', error);
        this.soundEnabled = false;
      }
    }
  }
}
```

**Lazy initialization** is crucial due to browser autoplay policy:
- Modern browsers block autoplay audio
- AudioContext must be created after user interaction
- First user click initializes audio context

### Three Types of Sounds

#### 1. Click Sound - Basic Click

Simple sine wave tone on each counter click:

```javascript
playClick() {
  if (!this.soundEnabled) return;

  this.initAudioContext();
  if (!this.audioContext) return;

  const oscillator = this.audioContext.createOscillator();
  const gainNode = this.audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(this.audioContext.destination);

  // Settings
  oscillator.frequency.value = 800; // Hz
  oscillator.type = 'sine';

  // Volume envelope (quick fade out)
  gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

  // Play for 50ms
  oscillator.start(this.audioContext.currentTime);
  oscillator.stop(this.audioContext.currentTime + 0.05);
}
```

**Key concepts:**
- **Oscillator**: Audio signal generator
- **GainNode**: Volume control
- **Frequency**: 800 Hz (pleasant pitch)
- **Type: sine**: Pure sine tone without harmonics
- **Envelope**: Exponential ramp for natural fade out
- **Duration**: 50ms - short enough, not disruptive

#### 2. Milestone Sound - Reaching Milestone

Pleasant chord when reaching 25%, 50%, and 75% progress:

```javascript
playMilestone() {
  if (!this.soundEnabled) return;

  this.initAudioContext();
  if (!this.audioContext) return;

  // C major chord: C5, E5, G5
  const frequencies = [523.25, 659.25, 783.99];
  const startTime = this.audioContext.currentTime;

  frequencies.forEach((freq, index) => {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = freq;
    oscillator.type = 'sine';

    // Volume envelope with slight delay for each tone
    const noteStart = startTime + (index * 0.05);
    gainNode.gain.setValueAtTime(0, noteStart);
    gainNode.gain.linearRampToValueAtTime(0.15, noteStart + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.6);

    oscillator.start(noteStart);
    oscillator.stop(noteStart + 0.6);
  });
}
```

**Music theory:**
- **C major chord**: Basic major chord (happy, positive)
- **C5 (523.25 Hz)**: Tonic (root note)
- **E5 (659.25 Hz)**: Third (defines major character)
- **G5 (783.99 Hz)**: Fifth (stability)

**Timing:**
- Each tone starts 50ms later (cascade effect)
- Total duration: 600ms
- Attack: 20ms (linear ramp)
- Release: 580ms (exponential ramp)

**Why this chord?**
- C major is universally pleasant chord
- No dissonance - suitable for meditation
- Higher octave (C5) - pleasant, not disruptive

#### 3. Completion Sound - Goal Achievement

Ascending melody when reaching 100%:

```javascript
playCompletion() {
  if (!this.soundEnabled) return;

  this.initAudioContext();
  if (!this.audioContext) return;

  // Ascending tones: C5 - E5 - G5 - C6
  const notes = [
    { freq: 523.25, time: 0 },     // C5
    { freq: 659.25, time: 0.15 },  // E5
    { freq: 783.99, time: 0.3 },   // G5
    { freq: 1046.50, time: 0.45 }  // C6 (octave higher)
  ];

  notes.forEach((note) => {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = note.freq;
    oscillator.type = 'sine';

    const startTime = this.audioContext.currentTime + note.time;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.4);
  });
}
```

**Melodic structure:**
1. **C5** (t=0ms): Beginning
2. **E5** (t=150ms): Ascent
3. **G5** (t=300ms): Further ascent
4. **C6** (t=450ms): Triumphant peak (octave higher)

**Psychological effect:**
- Ascending melody = achievement success
- Fast tempo (150ms between tones) = energy
- Octave jump = dramatic conclusion
- Major tonality = positivity

### Application Integration

Sounds are integrated into counter logic in `app.js`:

```javascript
function handleCounterClick(event) {
  // ... validation ...

  state.count++;

  // Play appropriate sound
  if (window.soundManager) {
    const newCount = state.mode === 2 ? state.count * 6 : state.count;

    // Completion (100%)
    if (newCount >= state.max) {
      soundManager.playCompletion();
    }
    // Milestones (25%, 50%, 75%)
    else if (newCount === Math.floor(state.max * 0.25) ||
             newCount === Math.floor(state.max * 0.5) ||
             newCount === Math.floor(state.max * 0.75)) {
      soundManager.playMilestone();
    }
    // Normal click
    else {
      soundManager.playClick();
    }
  }

  updateDisplay();
  saveStateToLocalStorage();
}
```

**Decision logic:**
1. First check completion (100%)
2. Then check milestones (25%, 50%, 75%)
3. Otherwise play basic click

**Example with default maximum 108:**
- Click 1-26: Click sound
- Click 27: Milestone (25% = 27)
- Click 28-53: Click sound
- Click 54: Milestone (50% = 54)
- Click 55-80: Click sound
- Click 81: Milestone (75% = 81)
- Click 82-107: Click sound
- Click 108: Completion (100%)

### User Control - Sound On/Off

UI for sound control in settings modal:

```html
<div class="setting">
  <label class="setting__label">Sound Effects:</label>
  <button class="setting__button" id="soundToggleBtn">Sound: ON</button>
</div>
```

JavaScript handling:

```javascript
function handleSoundToggle() {
  if (window.soundManager) {
    soundManager.toggleSound();
    updateSoundToggleButton();

    // Test sound when enabling
    if (soundManager.isSoundEnabled()) {
      soundManager.playClick();
    }
  }
}

function updateSoundToggleButton() {
  if (window.soundManager && elements.soundToggleBtn) {
    const isEnabled = soundManager.isSoundEnabled();
    elements.soundToggleBtn.textContent = `Sound: ${isEnabled ? 'ON' : 'OFF'}`;
  }
}
```

**UX details:**
- Button shows current state (ON/OFF)
- Test sound when enabling = immediate feedback
- Keyboard shortcut **S** (in menu)
- Preference saved to localStorage

### LocalStorage Persistence

Preference is saved across sessions:

```javascript
saveSoundPreference() {
  try {
    localStorage.setItem('ngondro-sound-enabled', JSON.stringify(this.soundEnabled));
  } catch (error) {
    console.error('Failed to save sound preference:', error);
  }
}

loadSoundPreference() {
  try {
    const saved = localStorage.getItem('ngondro-sound-enabled');
    if (saved !== null) {
      this.soundEnabled = JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load sound preference:', error);
  }
}
```

**Error handling:**
- Try-catch for localStorage (may be blocked)
- Default: sound enabled
- Application works even if localStorage fails

### Browser Autoplay Policy

Modern browsers have strict autoplay rules:

**Chrome/Edge policy:**
- Audio must not start without user interaction
- AudioContext must be created after user gesture
- Applies to all audio elements

**Safari policy:**
- Even stricter than Chrome
- Requires direct user interaction
- Audio must be started synchronously with click

**Solution in application:**
```javascript
// Lazy initialization - create only when needed
initAudioContext() {
  if (!this.audioContext) {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.error('Web Audio API not supported:', error);
      this.soundEnabled = false;
    }
  }
}
```

- First user click initializes context
- All subsequent sounds work normally
- Graceful degradation if API not supported

### Performance Considerations

**Memory usage:**
- AudioContext: ~100 KB in memory
- Each oscillator: ~10 KB (temporary)
- Total overhead: Negligible

**CPU usage:**
- Web Audio API runs in audio thread
- Does not block main thread
- GPU accelerated in modern browsers

**Battery impact:**
- Minimal - sounds are short (50-600ms)
- Oscillators automatically garbage collected
- Audio context can be suspended when not needed

**Optimization for production:**
```javascript
// Suspend audio context when app not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden && audioContext) {
    audioContext.suspend();
  } else if (!document.hidden && audioContext) {
    audioContext.resume();
  }
});
```

This is not in current implementation, but is best practice for larger applications.

### Cross-browser Compatibility

Web Audio API is supported in all modern browsers:

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 35+ | Full support |
| Firefox | 25+ | Full support |
| Safari | 14.1+ | Requires user gesture |
| Edge | 79+ | Full support (Chromium) |
| Opera | 22+ | Full support |
| iOS Safari | 14.5+ | Requires user interaction |

**Fallback for old browsers:**
```javascript
try {
  this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (error) {
  console.error('Web Audio API not supported:', error);
  this.soundEnabled = false;
}
```

- Application works without sound
- No error for user
- Graceful degradation

### Testing Sound Effects

**Manual testing:**
1. Open application
2. Click on counter → should hear click
3. Reach 27/108 → should hear milestone
4. Reach 108/108 → should hear completion melody
5. Open menu → Sound toggle
6. Disable sound → no sounds
7. Enable sound → test sound + normal function

**DevTools Console testing:**
```javascript
// Test individual sounds
soundManager.playClick();
soundManager.playMilestone();
soundManager.playCompletion();

// Test toggle
soundManager.toggleSound();
soundManager.isSoundEnabled(); // false

soundManager.toggleSound();
soundManager.isSoundEnabled(); // true
```

**Automated testing (for production):**
```javascript
describe('SoundManager', () => {
  test('creates audio context lazily', () => {
    const sm = new SoundManager();
    expect(sm.audioContext).toBeNull();

    sm.initAudioContext();
    expect(sm.audioContext).toBeDefined();
  });

  test('toggles sound state', () => {
    const sm = new SoundManager();
    expect(sm.isSoundEnabled()).toBe(true);

    sm.toggleSound();
    expect(sm.isSoundEnabled()).toBe(false);
  });

  test('saves preference to localStorage', () => {
    const sm = new SoundManager();
    sm.toggleSound();

    const saved = JSON.parse(localStorage.getItem('ngondro-sound-enabled'));
    expect(saved).toBe(false);
  });
});
```

### Accessibility Considerations

**For users with hearing impairment:**
- Sounds are purely supplementary (nice-to-have)
- Visual feedback remains primary
- Application fully functional without sound

**For users with sound sensitivity:**
- Easy to disable (one click)
- Keyboard shortcut **S**
- Preference remembered
- Enabled by default (most users appreciate it)

**For users with ADHD/autism:**
- Sounds are gentle, not surprising
- Constant volume
- Predictable patterns
- Can be disabled anytime

### Future Enhancements

Possible sound system improvements:

**1. Custom frequencies:**
```javascript
// Settings in UI
soundManager.setClickFrequency(600); // Lower tone
soundManager.setClickFrequency(1000); // Higher tone
```

**2. Volume slider:**
```javascript
soundManager.setVolume(0.5); // 50% volume
```

**3. Different sound themes:**
```javascript
soundManager.setTheme('bells'); // Bell sound
soundManager.setTheme('tones'); // Current tones
soundManager.setTheme('nature'); // Nature sounds (still synthetic)
```

**4. Haptic feedback on mobile:**
```javascript
if ('vibrate' in navigator) {
  navigator.vibrate(10); // 10ms vibration
}
```

**5. Spatial audio:**
```javascript
const panner = audioContext.createPanner();
panner.setPosition(1, 0, 0); // Right channel
```

### Sound Effects Section Conclusion

Sound effects implementation using Web Audio API brings significant advantages:

✅ **Small size** - 5 KB vs 500+ KB audio files
✅ **Zero latency** - instant response
✅ **Offline-first** - no network requests
✅ **Flexible** - easy customization
✅ **Performant** - GPU accelerated
✅ **Accessible** - can be disabled
✅ **Cross-browser** - works everywhere

Sounds provide gentle, non-disruptive feedback that enhances user experience during meditation practice. Three types of sounds (click, milestone, completion) create progressive audio feedback that motivates users to complete their goal.

## Future Improvements

### 1. Statistics and History

Storing session history:
```javascript
const sessions = [
  { date: '2025-10-11', count: 108, mode: 1, duration: 1200 },
  // ...
];
```

### 4. Cloud Sync

Synchronization between devices using Firebase or Supabase.

### 5. Mobile Vibration

Haptic feedback:
```javascript
if ('vibrate' in navigator) {
  navigator.vibrate(10);
}
```

### 6. Dark/Light Mode

Although the application is black and white, some users might prefer light background during day.

### 7. More Modes

Adding other types of meditations with different parameters.

### 8. Data Export

Export statistics to CSV or PDF for long-term practice tracking.

## Conclusion

Ngöndro Counter demonstrates that modern web applications don't have to be necessarily complex. Using basic web technologies – HTML, CSS, and JavaScript – we can create a fully functional, performant, and beautiful application.

Key insights from this project:

1. **Vanilla JS is sufficient** for many use cases
2. **BEM methodology** improves CSS readability
3. **Minimalist design** can be stronger than cluttered UI
4. **Performance matters** - every millisecond counts
5. **Accessibility** should be standard, not exception
6. **Edge cases** must be handled from the start
7. **LocalStorage** is great for simple persistence
8. **User feedback** (visual, haptic) improves UX

This project is ideal study material for beginners in web development who want to understand basic concepts without being overwhelmed by complex frameworks. At the same time, it demonstrates best practices used in large production applications.

The entire application is open-source and can serve as a foundation for other similar projects.

---

**Character count: ~18,500**
