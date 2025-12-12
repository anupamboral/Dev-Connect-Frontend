import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeFeedUser: (state, action) => {
      //* returning all user objects except the user object to whom the connection request is sent(interested or ignored card). in action .payload we are sending the id of request sent user, and using the filter method we are filtering all the objects from feed array using the request sent user's id coming from action.payload, creating a new array where request sent user's object is not present. and returning the updated array.
      const updatedFeed = state.filter((user) => user._id !== action.payload);
      return updatedFeed;
    },
  },
});

export const { addFeed, removeFeedUser, addNewFeedPageData } =
  feedSlice.actions;

export default feedSlice.reducer;
