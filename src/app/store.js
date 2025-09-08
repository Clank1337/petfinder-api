// store.js
import { configureStore } from '@reduxjs/toolkit';
import { animalsReducer } from './components/animal/animalsSlice';

export const store = configureStore({
  reducer: { animals: animalsReducer },
  // If you customize middleware, start from getDefaultMiddleware()
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,            // ensure thunk stays enabled
      serializableCheck: false,
    }),
});
