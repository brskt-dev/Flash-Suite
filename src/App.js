import React from 'react';
import { Page, Text, Button } from '@geist-ui/core';

const App = () => {
  return (
    <Page>
      <Text h1>Flash Suite</Text>
      <Text>This is the main interface for flashing firmware to microcontrollers.</Text>
      <Button type="success">Connect Device</Button>
    </Page>
  );
};

export default App;
