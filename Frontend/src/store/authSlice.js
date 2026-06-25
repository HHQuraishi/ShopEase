import {createSlice} from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null;

const tokenFromStorage = localStorage.getItem('token') || null;

const initialState = {
    user: userFromStorage,
    token: tokenFromStorage,
    isLoggedIn: !!userFromStorage,
    isAdmin: userFromStorage?.role === 'admin',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state,action) => {
            const {user,token} = action.payload;
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;
            state.isAdmin = user?.role === 'admin';
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token',token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.isAdmin = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const {setCredentials,logout} = authSlice.actions;
export const selectUser      = state => state.auth.user;
export const selectToken     = state => state.auth.token;
export const selectIsLoggedIn= state => state.auth.isLoggedIn;
export const selectIsAdmin   = state => state.auth.isAdmin;
export default authSlice.reducer;