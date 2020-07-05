import * as React from 'react';
import { specs } from 'storybook-addon-specifications';
import { myComponentTests } from './MyComponent.test';

import MyComponent from './MyComponent';

export default {
  title: 'My Component',
  component: MyComponent,
};

export const Overview = () => {
  specs(() => myComponentTests);
  return <MyComponent hello="Hi there!" />;
};
