import {createSlice} from "@reduxjs/toolkit";


const slice = createSlice({
    name: "messages",
    initialState: {
        messages: []
    },
    reducers: {
        updateMessages: (state, action) => {
            state.messages = action.payload;
        }
    },
    extraReducers: {

    }
});

export const { updateMessages } = slice.actions;

export const MessageSelector = state => state.messages.messages;

export default slice.reducer;