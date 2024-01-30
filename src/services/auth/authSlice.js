import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {}, // for user object
    accessToken: null,
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUser: (state, action) => {
            state.userInfo = action.payload
        },
        logout: () => initialState,
    },
})



export const { logout, setAccessToken, setUser } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
