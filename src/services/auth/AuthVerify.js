import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./authSlice.js";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = () => {
    const location = useLocation();
    const state = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const localState = localStorage.getItem('tokens');

    if (localState && !state.tokenDetails.accessToken) {
        const { accessToken, refreshToken } = JSON.parse(localState);
        dispatch(setToken({ accessToken, refreshToken }));
    }
    else if (!localState && state.tokenDetails.accessToken) {
        localStorage.setItem('tokens', JSON.stringify(state.tokenDetails));
    }

    /*
    // Check for user in local storage
    useEffect(() => {
        if (state.user) return;
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);
            if (user?.accessToken && user?.username && user?.role) {
                state.signIn(user);
            }
        }
    }, [state]);

     */

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
    }, [location, state]);

    return <span style={{ position: 'absolute' }}></span>;
};

export default AuthVerify;