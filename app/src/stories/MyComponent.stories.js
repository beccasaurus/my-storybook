import React from 'react';
import MyComponent from '../components/MyComponent';
import { specs } from 'storybook-addon-specifications';
import myComponentSpecs from '../components/MyComponent.test';

export default {
  title: 'My Component',
  component: MyComponent,
};

export const Hello = () => {
  specs(() => myComponentSpecs);
  return <MyComponent text="Hello, world!" />;
};
