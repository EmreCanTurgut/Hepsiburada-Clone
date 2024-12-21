import { createSlice } from "@reduxjs/toolkit";
export interface register{}

const registerSlice=createSlice({
    name:'register',
    initialState:{
        userName:"",
        userPhoneNumber:"",
        userPassword:"",
        userEmail:"",
        //login
        emailCheck:"",
        passwordCheck:"",
    },
    reducers:{
    userNameChangeHander(state,action){
        state.userName=action.payload;
    },
    userPhoneNumberChangeHandler(state,action){
        state.userPhoneNumber=action.payload;
    },userPasswordChangeHandler(state,action){
        state.userPassword=action.payload;
    },
    userEmailChangeHandler(state,action){
        state.userEmail=action.payload;
    },
    emailCheckChangeHandler(state,action){
        state.emailCheck=action.payload;
    },
    passwordCheckChangeHandler(state,action){
        state.passwordCheck=action.payload;
    }

    }
})

export default registerSlice;
