import { createEntityAdapter, createSlice, Middleware } from '@reduxjs/toolkit';

export interface Thing {
  id: string;
  name: string;
}

export const thingsMiddleware: Middleware = ({ dispatch }) => next => async action => {
  next(action);
};

const thingAdapter = createEntityAdapter<Thing>({
  selectId: thing => thing.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const thingSlice = createSlice({
  name: 'things',
  initialState: thingAdapter.getInitialState(),
  reducers: {
    addThing: thingAdapter.addOne,
    addThings: thingAdapter.addMany,
    removeThing: thingAdapter.removeOne,
  },
});

export const actions = thingSlice.actions;

export const selectors = thingAdapter.getSelectors();

export const thingsReducer = thingSlice.reducer;
