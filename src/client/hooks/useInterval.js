import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Get callback function (drop)
  useEffect(() => {
    // `current` points to the mounted element
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // Call callback function drop()
      savedCallback.current();
    }
    if (delay !== null) {
      // Increment timer every 1000ms (1s).
      const id = setInterval(tick, delay);
      return () => {
        // Stop timer to stop call function drop()
        clearInterval(id);
      };
    }
  }, [delay]);
}
