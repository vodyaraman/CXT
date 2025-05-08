import { combineReducers } from '@reduxjs/toolkit';
import { stores } from './storeRegistry';

export const rootReducer = combineReducers(
  Object.fromEntries(stores.map(s => [s.name, s.reducer]))
);
