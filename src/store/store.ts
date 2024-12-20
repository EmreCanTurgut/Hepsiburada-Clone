'use client';
import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './Slices/uiSlice';
import { register } from 'module';
import registerSlice from './Slices/registerSlice';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        register:registerSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
