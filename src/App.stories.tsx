import React from 'react';
import { specs } from 'storybook-addon-specifications';
import App from './App';
import { appTests } from './App.test';

export default {
  title: 'App',
  component: App,
};

export const Overview = () => {
  specs(() => appTests);
  return <App />;
};
