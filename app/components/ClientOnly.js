'use client';
import { useState, useEffect } from 'react';

export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // This runs only once, client-side, after the initial render.
    setHasMounted(true);
  }, []);

  // During the server render (and initial client render before useEffect runs),
  // we render null to ensure no mismatch.
  if (!hasMounted) {
    return null;
  }

  // Once mounted on the client, render the children (the full application)
  return <>{children}</>;
}