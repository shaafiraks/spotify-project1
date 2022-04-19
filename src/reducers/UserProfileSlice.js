import { createSlice } from "@reduxjs/toolkit";

export const UserProfileSlice = createSlice({
  name: "userprofile",
  initialState: {
    setUserProfileValue: "",
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.setUserProfileValue = action.payload;
    },
  },
});

export const { setUserProfile } = UserProfileSlice.actions;

export default UserProfileSlice.reducer;
