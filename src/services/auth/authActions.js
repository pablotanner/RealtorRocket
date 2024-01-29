import {logout} from "./authSlice.js";

export function logoutUser() {
    logout();
    localStorage.removeItem('refreshToken')

}