import { createSlice } from "@reduxjs/toolkit";

export interface home {}

const homeSlice = createSlice({
  name: "home",
  initialState: {
    isProfileModalOpened:false,
    isSettingsModalOpened:false,
  },
  reducers: {
    isProfileModalOpenedChangeHandler(state,action){
      state.isProfileModalOpened=action.payload;
    },
    isSettingsModalOpened(state,action){
      state.isSettingsModalOpened=action.payload;
    },
    
  },
});

export default homeSlice;
