import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 767) {
  const [isMobile, setUseMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setUseMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return isMobile;
}