import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {authApi} from "../api/authApi.js";
import {endOfYesterday, isAfter, isBefore} from "date-fns";
import {moneyParser} from "../../utils/formatters.js";

const eventsAdapter = createEntityAdapter({
    selectId: (event) => event.id,
    sortComparer: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
})

const initialState = eventsAdapter.getInitialState({
})


const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: eventsAdapter.addOne,
        removeEvent: eventsAdapter.removeOne,
        updateEvent: eventsAdapter.updateOne,
        addManyEvents: eventsAdapter.addMany,
        removeManyEvents: eventsAdapter.removeMany,
        updateManyEvents: eventsAdapter.updateMany,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getLeases.matchFulfilled,
            (state,action) => {
                const leases = action.payload.data;

                const leaseEvents = [];

                leases.forEach(lease => {
                    if (lease.startDate) {
                        leaseEvents.push({
                            id: lease.id + '-start',
                            title: 'Lease Start',
                            date: lease.startDate,
                            category: 'lease'
                        })
                    }
                    if (lease.endDate) {
                        leaseEvents.push({
                            id: lease.id + '-end',
                            title: 'Lease End',
                            date: lease.endDate,
                            category: 'lease'
                        })
                    }
                    if (lease.paymentSchedule) {
                        lease.paymentSchedule.forEach((paymentSchedule) => {
                            leaseEvents.push({
                                id: paymentSchedule.id,
                                title: `Payment Deadline for Lease ${paymentSchedule.leaseId}`,
                                description: `Amount: ${moneyParser(paymentSchedule?.amountDue)}`,
                                date: paymentSchedule.dueDate,
                                category: "rent"
                            })
                        })
                    }
                })
                eventsAdapter.addMany(state, leaseEvents);
            }
        )
    }
})


export const eventsReducer = eventSlice.reducer;

export const {
    selectAll: selectAllEvents,
    selectById: selectEventById,
    selectIds: selectEventIds,
} = eventsAdapter.getSelectors(state => state.events);


export const selectEventsByCategory = createSelector(
    [selectAllEvents],
    (events) => {
        const eventsByCategory = {};
        events.map(event => {
            if (!eventsByCategory[event.category]) {
                eventsByCategory[event.category] = [];
            }
            eventsByCategory[event.category].push(event);
        })
        return eventsByCategory;
    }
);

export const selectFutureEvents = createSelector(
    [selectAllEvents],
    (events) => events.filter(event => isAfter(new Date(event.date), endOfYesterday() )).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
)

export const selectEventsForRange = createSelector(
    [selectAllEvents, (_, dateRange) => (dateRange)],
    (events, dateRange) => {
        const start = dateRange.from;
        const end = dateRange.to;

        return events.filter(event => {
            const eventDate = new Date(event.date);
            return isAfter(eventDate,new Date(start)) && isBefore(eventDate, new Date(end));
        })
    }
);