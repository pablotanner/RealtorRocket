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



export const selectGroupedMessages = createSelector(
    selectAllMessages,
    (messages) => {
        const chats = {};
        messages.forEach((message) => {
            const participantKey = [message.senderId, message.receiverId].sort().join('-');
            if (!chats[participantKey]) {
                chats[participantKey] = [];
            }
            chats[participantKey].push(message);
        });
        return chats;
    }
)