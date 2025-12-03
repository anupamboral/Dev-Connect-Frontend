import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: () => {
      return null;
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
