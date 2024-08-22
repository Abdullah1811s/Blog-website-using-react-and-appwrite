import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginStatus: false,
    userDetail: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            console.log("Inside the function : ",  action.payload)
            state.loginStatus = true;
            state.userDetail = action;
        },
        logOut: (state) => {
            state.loginStatus = false;
            state.userDetail = null;
        },
    },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer