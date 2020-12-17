import { useState, useEffect } from 'react';

export default function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState();
  let lastKeyTime = Date.now();


  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    const currentTime = Date.now();

    console.log(lastKeyTime, currentTime);

    if (currentTime - lastKeyTime > 500) {
      console.log(key);
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    lastKeyTime = currentTime;
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
