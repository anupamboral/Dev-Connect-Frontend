import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      //* from the state connection requests , this filter method will  remove that connection request doc which id is matching with action.payload._id(so which request is accepted or rejected) and filter out all the requests which are in pending state except the connection request that is accepted or rejected,so newRequest will only include  the remaining pending requests.
      const newRequests = state.filter(
        (request) => request._id !== action.payload
      );
      return newRequests; //* returning updated requests(removed reviewed request)
    },
  },
});

export const { addRequests, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
