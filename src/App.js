import '@fortawesome/fontawesome-free/css/all.min.css';
import React, {useState, useEffect} from 'react';
import { GeistProvider, CssBaseline, Page } from '@geist-ui/core';

import FlashInterface from './components/FlashInterface';

const App = () => {

  const [themeType, setThemeType] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setThemeType(storedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Page>
        <FlashInterface toggleTheme={toggleTheme} currentTheme={themeType} />
      </Page>
    </GeistProvider>
  );
};

export default App;
