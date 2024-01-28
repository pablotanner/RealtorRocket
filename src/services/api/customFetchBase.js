import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import authSlice from "../auth/authSlice.js";
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

// eslint-disable-next-line no-undef
const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
})

const customFetchBase = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    console.log("RESULT", result);
    if (result.error && result.error.status === 401) {
        if(!mutex.isLocked()){
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery(
                    '/refresh',
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    // Retry the initial request
                    result = await baseQuery(args, api, extraOptions);
                }
                else {
                    api.dispatch(authSlice.actions.logout());
                    window.location.href = '/login';
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