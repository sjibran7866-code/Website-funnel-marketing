# UI Animations Guide

## Overview

The website uses a custom animation system built with CSS keyframes + a React `AnimateOnScroll` component for scroll-triggered effects. All animations use a consistent `cubic-bezier(0.16, 1, 0.3, 1)` easing curve for a smooth, natural feel.

No animation libraries are used — everything is pure CSS + Intersection Observer.

---

## Animation System Architecture

### Files

| File | Purpose |
|---|---|
| `src/app/globals.css` | All keyframe definitions and animation classes |
| `src/components/ui/AnimateOnScroll.tsx` | Reusable scroll-triggered animation wrapper |
| `src/components/ui/StaggerChildren.tsx` | Stagger animation delays across child elements |

### How `AnimateOnScroll` Works

Wrap any content to animate it when it scrolls into view:

```tsx
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

<AnimateOnScroll animation="fade-up" delay={100}>
  <div>This fades up when scrolled into view</div>
</AnimateOnScroll>
```

**Available animation types:**

| Animation | Effect |
|---|---|
| `fade-up` | Fades in while moving up (default) |
| `fade-down` | Fades in while moving down |
| `fade-left` | Fades in while moving left |
| `fade-right` | Fades in while moving right |
| `zoom-in` | Fades in while scaling up from 90% |
| `zoom-out` | Fades in while scaling down from 110% |
| `flip-up` | Fades in with a subtle 3D rotation |
| `blur-in` | Fades in while de-blurring |

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `animation` | string | `"fade-up"` | Which animation to use |
| `delay` | number | `0` | Delay in ms before animation starts |
| `duration` | number | `600` | Animation duration in ms |
| `threshold` | number | `0.15` | How much of the element must be visible (0-1) |
| `once` | boolean | `true` | Only animate once, or every time it enters view |
| `className` | string | `""` | Additional CSS classes |

---

## Animations by Page Section

### Hero Section (`src/components/home/Hero.tsx`)

The hero uses sequenced CSS animations that play automatically on page load (no scroll trigger needed since it's above the fold).

| Element | Animation | Delay | CSS Class |
|---|---|---|---|
| "Veteran-Owned" badge | Fade in + slight scale from above | 0.2s | `.hero-badge` |
| Main headline | Fade up into position | 0.4s | `.hero-title` |
| Subtitle paragraph | Fade up into position | 0.6s | `.hero-subtitle` |
| CTA buttons | Fade up into position | 0.8s | `.hero-buttons` |
| "Trusted by 7,500+" text | Fade up into position | 1.0s | `.hero-trust` |
| Scroll-down arrow | Continuous bounce | infinite | `.scroll-indicator` |
| Background blurs | Continuous float | infinite | `animate-[float_6s...]` |

The "Book Now!" button also has a continuous pulsing glow (`.btn-pulse`) to draw attention.

---

### Stats Counter (`src/components/home/StatsCounter.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Counter numbers | Count up from 0 to target over 2 seconds | Scroll into view (Intersection Observer) |
| Final number | Pop/bounce scale effect when count finishes | Count completion |
| Stat icons | Scale up 10% | Hover |

The counter uses a custom `AnimatedNumber` component that:
1. Watches for the element to enter the viewport
2. Increments the number over 60 steps across 2 seconds
3. Triggers a `.counter-pop` bounce when the target is reached

---

### Booth Showcase Cards (`src/components/home/BoothShowcase.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Section heading | Fade up | Scroll into view |
| Each booth card | Staggered fade up (100ms between cards) | Scroll into view |
| Card container | Lift 6px + shadow expansion | Hover |
| Card image area | Scale to 105% | Hover (via parent card hover) |
| "Learn More" arrow | Slide 8px right | Hover |
| Booth name text | Color transition to brand pink | Hover |

The stagger effect means the first card appears immediately, the second 100ms later, the third 200ms later, etc. This creates a wave-like reveal.

---

### Trust Badges (`src/components/home/TrustBadges.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Each badge | Zoom-in with staggered delay (120ms apart) | Scroll into view |
| Badge icon circle | Scale up + swap to white-on-brand colors | Hover |

---

### Testimonial Carousel (`src/components/home/TestimonialCarousel.tsx`)

**Desktop (3-column grid):**

| Element | Animation | Trigger |
|---|---|---|
| Section heading | Fade up | Scroll into view |
| Each testimonial card | Staggered fade up (100ms apart) | Scroll into view |
| Cards | Lift + shadow expansion | Hover |

**Mobile (single-card carousel):**

| Element | Animation | Trigger |
|---|---|---|
| Card transition | Crossfade + slight horizontal slide | Auto-advance every 5 seconds or dot click |
| Active dot indicator | Width expands from circle to pill shape | Active state |
| Inactive dots | Shrink back to circle | Inactive state |

---

### FAQ Accordion (`src/components/ui/Accordion.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Answer panel | CSS Grid row expand/collapse | Click on question |
| Chevron arrow | 180-degree rotation | Click (rotates when open) |

The accordion uses `grid-template-rows: 0fr` → `1fr` for a smooth height transition. This is more performant than `max-height` hacks because it doesn't need a fixed max value.

---

### CTA Section (`src/components/home/CTASection.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Headline | Fade up | Scroll into view |
| Subtitle | Fade up with 100ms delay | Scroll into view |
| Buttons | Zoom in with 200ms delay | Scroll into view |
| Background circles | Continuous floating at different speeds | Always (6s, 8s, 10s cycles) |

---

### Homepage FAQ (`src/components/home/HomeFAQ.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Section heading | Fade up | Scroll into view |
| Accordion block | Fade up with 150ms delay | Scroll into view |
| "View All FAQs" button | Fade up with 300ms delay | Scroll into view |

---

## Global UI Animations

### Buttons (all buttons across the site)

Applied via the `.btn-animate` class (automatically added to all `<Button>` components):

| State | Effect |
|---|---|
| Hover | Lift 2px upward + pink shadow glow |
| Active (click) | Press back down + reduced shadow |
| CTA buttons | Continuous pulsing glow ring (`.btn-pulse`) |

---

### Navigation Links (`src/components/layout/Header.tsx`)

Applied via the `.nav-link` class:

| State | Effect |
|---|---|
| Default | No underline |
| Hover | Pink underline slides in from center outward |
| "Book Now" nav button | Lift + shadow on hover (`.btn-animate`) |

---

### Form Inputs

Applied via the `.input-animate` class (available for use on any input):

| State | Effect |
|---|---|
| Focus | Lift 1px + soft pink shadow glow |

---

### Promo Banner (`src/components/funnel/PromoBanner.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Banner bar | Slides down from above the viewport | Page load |

Applied via `.promo-banner` class. Uses `@keyframes slide-down`.

---

### Exit-Intent Popup (`src/components/funnel/ExitIntentPopup.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Dark backdrop | Fades in | Mouse leaves viewport (top edge) |
| Modal card | Scales up from 90% + slides up 20px | After backdrop (100ms delay) |

Applied via `.popup-backdrop` and `.popup-content` classes. Only shows once per session.

---

### Sticky Mobile CTA Bar (`src/components/layout/StickyMobileCTA.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Bottom bar | Slides up from below the viewport | Page load with 1-second delay |

Applied via `.mobile-cta` class. The delay prevents it from appearing before the user has time to see the hero.

---

### Booking Wizard Steps (`src/app/book/BookingWizard.tsx`)

| Element | Animation | Trigger |
|---|---|---|
| Step content panel | Slides in from the right + fades in | Step change (Continue/Back buttons) |

Applied via `.step-content` class. A `key` prop resets the animation on every step transition.

---

## CSS Keyframes Reference

All keyframes are defined in `src/app/globals.css`:

| Keyframe Name | Used For |
|---|---|
| `hero-fade-in` | Hero text elements entrance |
| `hero-badge-in` | Hero badge entrance with scale |
| `float` | Continuous floating for decorative elements |
| `pulse-glow` | CTA button pulsing ring |
| `stagger-in` | StaggerChildren component |
| `counter-pop` | Stats counter bounce on finish |
| `line-expand` | Section heading underline |
| `slide-down` | Promo banner entrance |
| `slide-up` | Mobile CTA bar entrance |
| `popup-backdrop` | Exit popup backdrop fade |
| `popup-enter` | Exit popup modal entrance |
| `step-enter` | Booking wizard step transition |
| `testimonial-enter` | Testimonial card entrance |
| `shimmer` | Loading skeleton placeholder |
| `scroll-bounce` | Scroll indicator bounce |

---

## Utility Classes Reference

These classes can be added to any element:

| Class | Effect |
|---|---|
| `.btn-animate` | Hover lift + shadow + active press (auto-applied to all Buttons) |
| `.btn-pulse` | Pulsing glow ring (for primary CTAs) |
| `.card-hover` | Card lift + shadow expansion on hover |
| `.card-image` | Image scale on parent card hover |
| `.nav-link` | Underline slide-in on hover |
| `.input-animate` | Focus lift + shadow |
| `.promo-banner` | Slide-down entrance |
| `.popup-backdrop` | Fade-in backdrop |
| `.popup-content` | Scale-up modal entrance |
| `.mobile-cta` | Slide-up entrance with delay |
| `.step-content` | Slide-in-from-right entrance |
| `.skeleton` | Shimmer loading placeholder |
| `.hero-badge`, `.hero-title`, etc. | Sequenced hero entrance |
| `.scroll-indicator` | Continuous bounce |

---

## Performance Notes

- All animations use `transform` and `opacity` only — these are GPU-accelerated and don't trigger layout reflows
- `AnimateOnScroll` uses `IntersectionObserver` (not scroll event listeners) for zero scroll-jank
- Animations are `once: true` by default so they only play the first time an element enters view
- The consistent `cubic-bezier(0.16, 1, 0.3, 1)` easing gives a fast start with a gentle overshoot — feels snappy without being jarring
- No animation library dependencies — zero additional bundle size
