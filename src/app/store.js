import { configureStore } from '@reduxjs/toolkit';

import messages from "../features/Messages/MessagesSlice";
import currentUser from "../features/Users/CurrentUserSlice";
import users from "../features/Users/UsersSlice";
import groups from "../features/Groups/GroupsSlice.js"

export default configureStore({
  reducer: {
    messages,
    groups,
    currentUser,
    users
  },
});
