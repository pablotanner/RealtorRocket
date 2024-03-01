import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {authApi} from "../api/authApi.js";
import {moneyParser} from "../../utils/formatters.js";

const messageAdapter = createEntityAdapter({
    selectId: (message) => message.id,
    sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp),
})

const initialState = messageAdapter.getInitialState({
})


const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messageAdapter.addOne,
        removeMessage: messageAdapter.removeOne,
        updateMessage: messageAdapter.updateOne,
        addManyMessages: messageAdapter.addMany,
        removeManyMessages: messageAdapter.removeMany,
        updateManyMessages: messageAdapter.updateMany,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getMessages.matchFulfilled,
            (state,action) => {
                const messages = action.payload.data;
                messageAdapter.addMany(state, messages);
            }
        )
    }
})


export const messagesReducer = messageSlice.reducer;

export const {
    selectAll: selectAllMessages,
    selectById: selectMessageById,
    selectIds: selectMessageIds,
} = messageAdapter.getSelectors(state => state.messages);


export const {
    addMessage,
    removeMessage,
    updateMessage,
    addManyMessages,
    removeManyMessages,
    updateManyMessages,
} = messageSlice.actions;




// Returns an object where all messages are grouped by userId (where the receiverId or senderId is the userId)
export const selectMessagesByUser = createSelector(
    selectAllMessages,
    (messages) => {
        if (!messages || messages.length === 0) {
            return {}
        }
        const messagesByUser = {};
        messages.forEach((message) => {
            if (!messagesByUser[message.receiverId]) {
                messagesByUser[message.receiverId] = [];
            }
            if (!messagesByUser[message.senderId]) {
                messagesByUser[message.senderId] = [];
            }
            messagesByUser[message.receiverId].push(message);
            messagesByUser[message.senderId].push(message);
        })
        return messagesByUser;
    }
)