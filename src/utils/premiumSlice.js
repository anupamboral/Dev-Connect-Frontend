import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPremiumUser: false,
  membershipStatus: "",
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    addPremiumStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { addPremiumStatus } = premiumSlice.actions;
export default premiumSlice.reducer;
