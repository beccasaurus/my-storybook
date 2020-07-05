import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import * as things from './things';

const reducer = combineReducers({ things: things.thingsReducer });

export type State = ReturnType<typeof reducer>;

export const createStore = () =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .prepend(things.thingsMiddleware)
        .concat(logger),
  });
