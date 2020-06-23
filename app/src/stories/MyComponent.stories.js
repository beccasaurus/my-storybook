import React from 'react';
import MyComponent from '../components/MyComponent';

export default {
  title: 'My Component',
  component: MyComponent,
};

export const Hello = () => <MyComponent text="Hello, world!" />;
