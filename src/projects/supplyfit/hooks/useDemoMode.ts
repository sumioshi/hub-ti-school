import { useState, useEffect } from 'react';

export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const demoMode = localStorage.getItem('demoMode');
    if (demoMode === 'true') {
      setIsDemoMode(true);
    }
  }, []);

  const toggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    localStorage.setItem('demoMode', newDemoMode.toString());
  };

  return { isDemoMode, toggleDemoMode };
};
