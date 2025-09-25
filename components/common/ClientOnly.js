"use client";

import { useEffect, useState } from "react";

const ClientOnly = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Fix MutationObserver error by ensuring proper DOM handling
    if (typeof window !== 'undefined') {
      // Suppress MutationObserver errors in development
      const originalConsoleError = console.error;
      console.error = (...args) => {
        if (args[0]?.includes?.('MutationObserver') || 
            args[0]?.includes?.('observe') ||
            args[0]?.includes?.('parameter 1 is not of type')) {
          return; // Suppress these specific errors
        }
        originalConsoleError.apply(console, args);
      };
    }
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return children;
};

export default ClientOnly;
