import { useEffect } from 'react';

const keyevent = 'keydown';

function useKey(callback, allowedKeys = [], conditions) {
  let lastKeyTime = Date.now();

  const handleEvent = (event) => {
    const currentTime = Date.now();

    // callback(event);

    if (currentTime - lastKeyTime > 15) {
      // if (conditions.started && !conditions.loose
      //   && allowedKeys.includes(event.keyCode)) {
          callback(event);
          lastKeyTime = currentTime;
      // }
    }
  };

  // Add event listeners
  useEffect(() => {
    const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    if (!canUseDOM) {
      console.error('Window is not defined');
      return null;
    }

    // if const currentTime = Date.now();


    window.addEventListener(keyevent, handleEvent);
    return () => {
      window.removeEventListener(keyevent, handleEvent);
    };
  }, [conditions]);
}

export default useKey;
