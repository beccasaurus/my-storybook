import * as React from 'react';

import MyComponent from './MyComponent';

export default {
  title: 'My Component',
  component: MyComponent,
};

export const Overview = () => <MyComponent hello="Hi there!" />;
