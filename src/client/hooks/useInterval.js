import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay, conditions) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && delay !== 0) {
      if (conditions.started && !conditions.loose) {
        const id = setInterval(tick, delay);

        return () => {
          clearInterval(id);
        };
      }
    }
  }, [delay, conditions]);
}
