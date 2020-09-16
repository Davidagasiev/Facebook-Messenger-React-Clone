import { configureStore } from '@reduxjs/toolkit';

import messages from "../features/Messages/MessagesSlice";
import currentUser from "../features/Users/CurrentUserSlice";

export default configureStore({
  reducer: {
    messages,
    currentUser
  },
});
