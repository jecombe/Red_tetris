import { useEffect } from 'react';

const keyevent = 'keydown';

function useKey(callback) {
  let lastKeyCode = null;
  let lastKeyTime = Date.now();

  const handleEvent = (event) => {
    const currentTime = Date.now();

    if (event.keyCode !== lastKeyCode || currentTime - lastKeyTime > 10) {
      // if (conditions.started && !conditions.loose) {
      callback(event);
      lastKeyCode = event.keyCode;
      lastKeyTime = currentTime;
      // }
    }
  };

  useEffect(() => {
    const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    if (!canUseDOM) {
      console.error('Window is not defined');
      return null;
    }

    window.addEventListener(keyevent, handleEvent);
    return () => {
      window.removeEventListener(keyevent, handleEvent);
    };
  }, []);
}

export default useKey;
