import { useEffect } from 'react';

const keyevent = 'keydown';

function useKey(callback, conditions) {
    let lastKeyCode = null;
    let lastKeyTime = Date.now();

    const handleEvent = (event) => {
        const currentTime = Date.now();

        if (event.keyCode !== lastKeyCode || currentTime - lastKeyTime > 209) {
            if (conditions.started && !conditions.loose) {
                callback(event);
                lastKeyCode = event.keyCode;
                lastKeyTime = currentTime;
            }
        }
    };

    useEffect(() => {
        const canUseDOM = !!(
            typeof window !== 'undefined' &&
            window.document &&
            window.document.createElement
        );
        if (!canUseDOM) {
            console.error('Window is not defined');
            return null;
        }

        window.addEventListener(keyevent, handleEvent);
        return () => {
            window.removeEventListener(keyevent, handleEvent);
        };
    }, [conditions]);
}

export default useKey;
