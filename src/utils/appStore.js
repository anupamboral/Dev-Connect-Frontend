import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connectionsSlice";
import requestsSlice from "./requestsSlice";
import premiumSlice from "./premiumSlice";

//* creating the store
const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionsSlice,
    requests: requestsSlice,
    premium: premiumSlice,
  },
});
export default appStore;
