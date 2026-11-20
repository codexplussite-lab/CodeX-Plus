'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import gsap from 'gsap';

export interface DepthCarouselItemObject {
  image: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
}

export type DepthCarouselItem = string | DepthCarouselItemObject;
type TiltDirection = 'left' | 'right';

export interface DepthCarouselProps {
  items?: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: TiltDirection;
  perspective?: number;
  visibleCards?: number;
  initialIndex?: number;
  centerOffset?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: DepthCarouselItemObject) => void;
  className?: string;
}

interface DragState {
  startX: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  id: number;
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  { image: 'https://picsum.photos/seed/depth1/800/1000', alt: 'Slide 1' },
  { image: 'https://picsum.photos/seed/depth2/800/1000', alt: 'Slide 2' },
  { image: 'https://picsum.photos/seed/depth3/800/1000', alt: 'Slide 3' },
  { image: 'https://picsum.photos/seed/depth4/800/1000', alt: 'Slide 4' },
  { image: 'https://picsum.photos/seed/depth5/800/1000', alt: 'Slide 5' },
  { image: 'https://picsum.photos/seed/depth6/800/1000', alt: 'Slide 6' },
];

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeItem = (it: DepthCarouselItem): DepthCarouselItemObject =>
  typeof it === 'string' ? { image: it, alt: '' } : it;

export default function DepthCarousel({
  items = DEFAULT_ITEMS,
  cardWidth = 300,
  cardHeight = 400,
  radius = 22,
  tint = '#0e0b12',
  depth = 55,
  spread = 52,
  tilt = 11,
  tiltDirection = 'right',
  perspective = 1800,
  visibleCards = 6,
  initialIndex = 0,
  centerOffset = 0,
  falloff = 0.12,
  blur = 3,
  duration = 450,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = '',
}: DepthCarouselProps) {
  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items]);
  const count = data.length;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const validInitial = initialIndex >= 0 && initialIndex < count ? initialIndex : 0;
  const posRef = useRef(validInitial);
  const focusRef = useRef(validInitial);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);

  const dragRef = useRef<DragState | null>(null);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef = useRef(false);

  const [active, setActive] = useState(validInitial);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync initialIndex if items change
  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < count && focusRef.current !== initialIndex) {
      focusRef.current = initialIndex;
      posRef.current = initialIndex;
      setActive(initialIndex);
    }
  }, [initialIndex, count]);

  // Primary 3D coverflow/deck layout calculation
  const layout = useCallback(
    (pos: number) => {
      const n = count;
      if (!n) return;

      const dir = tiltDirection === 'left' ? -1 : 1;
      const sc = scaleRef.current;
      const maxStacked = Math.min(visibleCards, n - 1);
      // Perfectly center the full stack (front card + stacked cards) horizontally
      const centerShift = -dir * ((maxStacked * spread) / 2) + centerOffset;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let d = i - pos;
        if (loop && n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }

        // Visibility boundaries: allows 1 exiting card on the left and visibleCards stacked to the right
        const isVisible = d >= -1.25 && d <= maxStacked + 0.65;

        if (!isVisible) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          el.style.visibility = 'hidden';
          continue;
        }

        el.style.visibility = 'visible';

        let tx = 0;
        let tz = 0;
        let ry = 0;
        let scale = 1;
        let opacity = 1;
        let brightness = 1;
        let blurPx = 0;
        let zIndex = 50;

        if (d >= 0) {
          // Front card (d = 0) and cards cascading back to the right (d > 0)
          tx = centerShift + dir * d * spread;
          tz = -depth * d;
          ry = -dir * tilt * clamp(d, 0, 1.2);
          scale = clamp(1 - d * 0.032, 0.76, 1);
          brightness = clamp(1 - d * falloff, 0.16, 1);
          blurPx = blur > 0 && d > 1 ? Math.min(blur, (d / maxStacked) * blur) : 0;
          zIndex = Math.round(1000 - d * 25);

          if (d > maxStacked) {
            opacity = clamp(1 - (d - maxStacked) / 0.6, 0, 1);
          } else {
            opacity = 1;
          }
        } else {
          // Card exiting smoothly to the left (d < 0)
          tx = centerShift + dir * d * (spread * 1.7);
          tz = depth * d * 0.4;
          ry = dir * tilt * clamp(Math.abs(d), 0, 1.2);
          scale = clamp(1 - Math.abs(d) * 0.06, 0.76, 1);
          brightness = clamp(1 - Math.abs(d) * 0.35, 0.3, 1);
          blurPx = 0;
          zIndex = Math.round(1050 + d * 25);
          opacity = clamp(1 + d, 0, 1);
        }

        el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `brightness(${brightness.toFixed(3)}) ${blurPx > 0 ? `blur(${blurPx.toFixed(2)}px)` : ''}`.trim();
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = opacity > 0.15 ? 'auto' : 'none';

        const ov = overlayRefs.current[i];
        if (ov) {
          const tintAlpha = d > 0 ? clamp(d * falloff * 1.4, 0, 0.82) : 0;
          ov.style.opacity = tintAlpha.toFixed(3);
        }
      }
    },
    [count, tiltDirection, visibleCards, spread, centerOffset, loop, depth, tilt, falloff, blur]
  );

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data]
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const n = count;

      if (!animate || reducedRef.current || duration <= 0) {
        let finalPos = target;
        if (loop && n > 0) {
          finalPos = ((finalPos % n) + n) % n;
        }
        posRef.current = finalPos;
        layout(finalPos);
        return;
      }

      const proxy = { p: posRef.current };
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: duration / 1000,
        ease: ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          if (loop && n > 0) {
            posRef.current = ((proxy.p % n) + n) % n;
          } else {
            posRef.current = proxy.p;
          }
          layout(posRef.current);
        },
      });
    },
    [count, loop, duration, ease, layout]
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const n = count;
      if (!n) return;
      const idx = loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);

      // Compute shortest delta
      let delta = idx - (posRef.current % n);
      if (loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }

      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [count, loop, tweenTo, notify]
  );

  const navigateBy = useCallback(
    (step: number) => {
      setFocus(focusRef.current + step, true);
    },
    [setFocus]
  );

  // Responsive scaling observer
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const maxStacked = Math.min(visibleCards, count - 1);
      const needed = cardWidth + maxStacked * spread + 100;
      if (w < needed) {
        scaleRef.current = clamp((w - 40) / (cardWidth + maxStacked * spread), 0.52, 1);
      } else {
        scaleRef.current = 1;
      }
      layout(posRef.current);
    });

    ro.observe(root);
    return () => ro.disconnect();
  }, [cardWidth, count, visibleCards, spread, layout]);

  // Wheel horizontal navigation
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (count < 2) return;
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(raw) < 12) return;

      e.preventDefault();
      tweenRef.current?.kill();

      const delta = e.deltaMode === 1 ? raw * 20 : raw;
      const step = clamp(delta / (cardWidth * 0.9), -0.5, 0.5);
      posRef.current += step;
      layout(posRef.current);

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        setFocus(Math.round(posRef.current), true);
      }, 120);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [count, cardWidth, layout, setFocus]);

  // Pointer drag gestures
  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (count < 2) return;
      tweenRef.current?.kill();
      dragRef.current = {
        startX: e.clientX,
        startPos: posRef.current,
        lastX: e.clientX,
        lastT: performance.now(),
        v: 0,
        moved: false,
        id: e.pointerId,
      };
    },
    [count]
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;

      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (!drag.moved) return;

      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;

      const stepPx = Math.max(cardWidth * 0.45 * scaleRef.current, 50);
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [cardWidth, layout]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;

    const stepPx = Math.max(cardWidth * 0.45 * scaleRef.current, 50);
    const projected = posRef.current - (drag.v * 140) / stepPx;
    setFocus(Math.round(projected), true);
  }, [cardWidth, setFocus]);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return;
      setFocus(index, true);
    },
    [setFocus]
  );

  // Autoplay timer
  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoplay || reducedRef.current || count < 2) return;

    const root = rootRef.current;
    let paused = false;

    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };

    const start = () => {
      stop();
      autoTimerRef.current = setInterval(() => {
        if (!paused) navigateBy(1);
      }, Math.max(autoplayDelay, 1200));
    };

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    root?.addEventListener('mouseenter', onEnter);
    root?.addEventListener('mouseleave', onLeave);
    root?.addEventListener('focusin', onEnter);
    root?.addEventListener('focusout', onLeave);

    start();

    return () => {
      stop();
      root?.removeEventListener('mouseenter', onEnter);
      root?.removeEventListener('mouseleave', onLeave);
      root?.removeEventListener('focusin', onEnter);
      root?.removeEventListener('focusout', onLeave);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  // Initial layout call
  useEffect(() => {
    layout(posRef.current);
  }, [layout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-[360px] w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none [perspective-origin:50%_50%] active:cursor-grabbing focus-visible:rounded-2xl focus-visible:outline-2 focus-visible:outline-violet-400/50 ${className}`.trim()}
      style={{ perspective: `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Studio Team Depth Carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      {/* 3D Stage Container */}
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {data.map((item, i) => {
          const isActive = active === i;
          return (
            <div
              key={i}
              className="group absolute top-1/2 left-1/2 cursor-pointer overflow-hidden border border-white/10 bg-[#0e071a] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_-12px_rgba(139,92,246,0.3)] transition-colors duration-300 hover:border-violet-400/35 [transform-origin:center] [will-change:transform,opacity,filter]"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${item.title || 'Member'}`}
              aria-hidden={!isActive}
              onClick={() => onCardClick(i)}
            >
              <img
                className="block h-full w-full select-none object-cover object-top grayscale contrast-110 [pointer-events:none] [-webkit-user-drag:none]"
                src={item.image}
                alt={item.alt || item.title || ''}
                draggable={false}
                loading={i < 4 ? 'eager' : 'lazy'}
              />

              {/* Front and Stacked Card Title, Badge, and Subtitle Overlay */}
              {(item.title || item.subtitle || item.badge) && (
                <>
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-75'
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute right-0 bottom-0 left-0 p-6 transition-all duration-300 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-0 opacity-75'
                    }`}
                  >
                    {item.badge && isActive && (
                      <span className="inline-block rounded-full border border-white/20 bg-black/65 px-3 py-1 text-[11px] font-medium tracking-wide text-white/95 shadow-lg backdrop-blur-md">
                        {item.badge}
                      </span>
                    )}
                    {item.title && (
                      <h3
                        className={`font-display font-bold tracking-tight text-white drop-shadow-sm ${
                          isActive ? 'mt-2.5 text-xl' : 'mt-1 text-base opacity-90'
                        }`}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.subtitle && (
                      <p className="mt-0.5 text-xs font-medium text-gray-300/85 drop-shadow">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Depth tint shadow overlay */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                style={{ background: tint }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Buttons */}
      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-3 z-[3000] grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-violet-400/25 bg-[#140a24]/80 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-violet-400/60 hover:bg-violet-600/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] active:scale-95 sm:left-6"
            aria-label="Previous team member"
            onClick={(e) => {
              e.stopPropagation();
              navigateBy(-1);
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 z-[3000] grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-violet-400/25 bg-[#140a24]/80 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-violet-400/60 hover:bg-violet-600/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] active:scale-95 sm:right-6"
            aria-label="Next team member"
            onClick={(e) => {
              e.stopPropagation();
              navigateBy(1);
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Pagination Dot Indicators */}
      {showIndicators && count > 1 && (
        <div
          className="absolute bottom-4 left-1/2 z-[3000] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#120820]/80 px-4 py-2 shadow-lg backdrop-blur-md"
          role="tablist"
          aria-label="Team Members"
        >
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                active === i
                  ? 'h-[7px] w-6 bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.75)]'
                  : 'h-[7px] w-[7px] bg-white/20 hover:bg-white/50'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setFocus(i, true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
