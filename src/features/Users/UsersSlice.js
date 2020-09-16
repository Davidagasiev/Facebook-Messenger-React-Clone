import {createSlice} from "@reduxjs/toolkit";


const slice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        updateUsers: (state, action) => {
            state.users = action.payload;
        }
    },
    extraReducers: {

    }
});

export const { updateUsers } = slice.actions;

export const UsersSelector = state => state.users.users;

export default slice.reducer;