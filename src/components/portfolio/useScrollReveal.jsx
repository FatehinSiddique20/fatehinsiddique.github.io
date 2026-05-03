import { useRef, useState, useEffect } from 'react';

/**
 * useScrollReveal — fires once when the element enters the viewport.
 * Uses IntersectionObserver (no scroll listener) for best performance.
 */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * useCountUp — animates a number from 0 to target when visible.
 */
export function useCountUp(target, duration = 1600, active = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || target === 0) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

// Default export for backwards compatibility
export default useScrollReveal;