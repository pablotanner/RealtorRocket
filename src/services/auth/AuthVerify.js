import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "./authActions.js";
import {setAccessToken} from "./authSlice.js";
import {useRefreshMutation} from "../api/authApi.js";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = () => {
    const state = useSelector((state) => state.authSlice);
    const accessToken = state.accessToken;
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem("refreshToken")
    const [refresh, {isLoading: isRefreshing}] = useRefreshMutation();

    useEffect(() => {
        if (accessToken && refreshToken) {
            const decodedAccess = parseJwt(accessToken);
            const decodedRefresh = parseJwt(refreshToken);

            // If access token expired, refresh the token
            if (decodedAccess && decodedAccess.exp * 1000 < Date.now()) {
                if (!isRefreshing) {
                    refresh().then((response) => {
                        if (!response.data || response.error) {
                            console.log('Refresh token failed');
                            logoutUser(state);
                        }
                    })
                }
            }

            if (decodedRefresh && decodedRefresh.exp * 1000 < Date.now()) {
                console.log('Refresh token expired');
                logoutUser(state);
            }
        }
    }, [accessToken, refreshToken, dispatch]);


    /*
    // Check token expiration
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        if (!userJson) return;
        const user = JSON.parse(userJson);
        if (user && user.accessToken) {
            const decodedJwt = parseJwt(user.accessToken);
            if (decodedJwt.exp * 1000 < Date.now()) {
                localStorage.removeItem('user');
                toast.warning('Your token expired');
                state.signOut();
            }
        }
    }, [location, state])
     */

    return null;
};

export default AuthVerify;