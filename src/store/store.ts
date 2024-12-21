'use client';
import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './Slices/uiSlice';
import { register } from 'module';
import registerSlice from './Slices/registerSlice';
import homeSlice from './Slices/home';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        register:registerSlice.reducer,
        home:homeSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
