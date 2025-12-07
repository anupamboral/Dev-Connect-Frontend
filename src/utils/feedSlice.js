import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeFeedUser: (state, action) => {
      const updatedFeed = state.filter((user) => user._id !== action.payload);
      return updatedFeed;
    },
  },
});

export const { addFeed, removeFeedUser, addNewFeedPageData } =
  feedSlice.actions;

export default feedSlice.reducer;
