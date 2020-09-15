import { configureStore } from '@reduxjs/toolkit';

import messages from "../features/Messages/MessagesSlice";

export default configureStore({
  reducer: {
    messages
  },
});
