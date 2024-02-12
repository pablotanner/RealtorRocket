import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "../api/authApi.js";

const initialState = {
    lease: [],
    maintenance: [],
    rent: [],
    other: []
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getLeases.matchFulfilled,
            (state,action) => {
                const leases = action.payload.data;
                leases.forEach(lease => {
                    try{
                        if (lease.startDate) {
                            state.lease.push(
                                {
                                    date: lease.startDate,
                                    title: "Lease Start Date",
                                    leaseId: lease.id
                                }
                            )
                        }
                        if (lease.endDate) {
                            state.lease.push(
                                {
                                    date: lease.endDate,
                                    title: "Lease End Date",
                                    leaseId: lease.id
                                }
                            )
                        }
                    }
                    catch (e) {
                        // Do nothing
                    }
                })
                // Sort the lease array by date (newest first)
                state.lease.sort((a,b) => new Date(b.date) - new Date(a.date))
            }
        )
    }
})


export const eventsReducer = eventSlice.reducer;


export const getAllEvents = (state) => {
    const events = state.events;
    return Object.keys(events).reduce((acc, key) => {
        acc[key] = events[key].map(event => ({
            ...event, // Spread to copy properties of the event
            date: new Date(event.date) // Create a new object with the date converted
        }));
        return acc;
    }, {});
}


// Map events to only contain the date
export const getEventDates = (state) => {
    const events = getAllEvents(state);
    return Object.keys(events).reduce((acc, key) => {
        acc[key] = events[key].map(event => event.date);
        return acc;
    }, {})
}

export const getEventsForRange = (state, start, end) => {
    const events = getAllEvents(state);
    if (!start || !end) {
        return events;
    }
    return Object.keys(events).reduce((acc, key) => {
        acc[key] = events[key].filter(event => event.date >= start && event.date <= end);
        return acc;
    }, {})

}
