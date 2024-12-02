import React from 'react';
import { GeistProvider, CssBaseline, Page } from '@geist-ui/core';
import FlashInterface from './components/FlashInterface';

const App = () => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Page>
        <FlashInterface />
      </Page>
    </GeistProvider>
  );
};

export default App;
