import { createSlice } from '@reduxjs/toolkit';

export interface ui {
    filter: string | null;
}

const initialState: ui = {
    filter: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export default uiSlice;
