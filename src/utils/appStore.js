import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
//* creating the store
const appStore = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default appStore;
