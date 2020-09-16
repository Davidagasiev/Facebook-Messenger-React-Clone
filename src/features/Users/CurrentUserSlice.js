import {createSlice} from "@reduxjs/toolkit";


const slice = createSlice({
    name: "currentUser",

    initialState: {
        currentUser: null
    },

    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: {

    }
});

export const { setCurrentUser } = slice.actions;

export const CurrentUserSelector = state => state.currentUser.currentUser;

export default slice.reducer;