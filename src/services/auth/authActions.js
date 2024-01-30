import {logout} from "./authSlice.js";

export function logoutUser() {
    logout();
    localStorage.removeItem('refreshToken')

    // If user not already on login page, redirect to login page
    if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
}