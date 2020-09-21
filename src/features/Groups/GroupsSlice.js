import {createSlice} from "@reduxjs/toolkit";


const slice = createSlice({
    name: "groups",
    initialState: {
        groups: []
    },
    reducers: {
        updateGroups: (state, action) => {
            state.groups = action.payload;
        }
    },
    extraReducers: {

    }
});

export const { updateGroups } = slice.actions;

export const GroupsSelector = state => state.groups.groups;

export default slice.reducer;