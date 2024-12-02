import React from 'react';
import ReactDOM from 'react-dom';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import App from './App';

ReactDOM.render(
  <GeistProvider>
    <CssBaseline />
    <App />
  </GeistProvider>,
  document.getElementById('root')
);
