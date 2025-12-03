import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connections";
import requestsSlice from "./requests";
//* creating the store
const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionsSlice,
    requests: requestsSlice,
  },
});
export default appStore;
