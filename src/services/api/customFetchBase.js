import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {logout} from "../auth/authSlice.js";
import { Mutex } from 'async-mutex';
import {logoutUser} from "../auth/authActions.js";

const mutex = new Mutex();



// eslint-disable-next-line no-undef
const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, {getState}) => {
        const accessToken = getState().authSlice?.accessToken;
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        else if (refreshToken) {
            headers.set('Authorization', `Bearer ${refreshToken}`);
        }
        return headers;
    },
})

const customFetchBase = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error.status === 401 || result.error.status === 403) ) {
        if(!mutex.isLocked()){
            const release = await mutex.acquire();
            try {

                // Try to refresh the token
                   const refreshResult = await api.endpoints.refresh.initiate({}, {
                        signal: extraOptions?.signal,
                        meta: {
                            arg: {},
                            requestId: extraOptions?.requestId,
                            requestStatus: 'pending',
                        },
                    });

                if (refreshResult.data) {
                    // Retry the initial request
                    result = await baseQuery(args, api, extraOptions);
                }
                else {
                    logoutUser();
                    // Add toastify notification here
                }
            }
            finally {
                release();
            }
        }
        else {
            // Wait for mutex to be available
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
}


export default customFetchBase;