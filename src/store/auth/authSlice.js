import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accessToken: null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCredentials, logout, setUser } = authSlice.actions

export default authSlice.reducer