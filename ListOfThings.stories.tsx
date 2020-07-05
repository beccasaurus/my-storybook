import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store';

import ListOfThings, { DisconnectedListOfThings } from './ListOfThings';

const store = createStore();

export default {
  title: 'List of Things',
  component: DisconnectedListOfThings,
};

export const Overview = () => (
  <Provider store={store}>
    <ListOfThings />
  </Provider>
);
