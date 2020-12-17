// import { useEffect, useRef } from 'react';

// function useInterval(callback, delay) {
//   const savedCallback = useRef();
//   // Get callback function (drop)
//   useEffect(() => {
//     // `current` points to the mounted element
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   // eslint-disable-next-line consistent-return
//   useEffect(() => {
//     function tick() {
//       // Call callback function drop()
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       // Increment timer every 1000ms (1s).
//       const id = setInterval(tick, delay);
//       return () => {
//         // Stop timer to stop call function drop()
//         clearInterval(id);
//       };
//     }
//   }, [delay]);
// }

// export default useInterval;
import { useEffect } from 'react';

function useInterval(callback, delay) {
  const tick = () => callback();

  // Set up the interval.
  useEffect(() => {
    if (delay !== null && delay !== 0) {
      const id = setInterval(tick, delay);
      return () => {
        // Stop timer to stop call function drop()
        clearInterval(id);
      };
    }
  }, [delay]);
}

export default useInterval;
