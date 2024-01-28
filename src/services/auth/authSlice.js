import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {}, // for user object
    tokenDetails: {
        accessToken: null,
        refreshToken: null,
    },
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.tokenDetails = action.payload
        },
        logout: () => initialState,
    },
})


export const { setCredentials, logout, setToken } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
