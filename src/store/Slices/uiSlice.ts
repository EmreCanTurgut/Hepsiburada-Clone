import { createSlice } from '@reduxjs/toolkit';

export interface ui {}
const initialState: ui = {};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {},
});

export default uiSlice;
