import { configureStore } from '@reduxjs/toolkit';

import messages from "../features/Messages/MessagesSlice";
import currentUser from "../features/Users/CurrentUserSlice";
import users from "../features/Users/UsersSlice";

export default configureStore({
  reducer: {
    messages,
    currentUser,
    users
  },
});
