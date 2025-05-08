import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { rootMiddleware } from './rootMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }).concat(...rootMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
