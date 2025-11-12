import { useState, useEffect } from 'react';

// Used to detect mobile screens based on media query breakpoint
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() =>
        window.matchMedia('(max-width: 45em)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 45em)');
        const handleChange = (event) => setIsMobile(event.matches);

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isMobile;
}
