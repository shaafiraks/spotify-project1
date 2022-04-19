import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./SearchSlice";
import accountSlice from "./AccountSlice";
import UserProfileSlice from "./UserProfileSlice";
import ListIDSlice from "./ListIDSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    account: accountSlice,
    userprofile: UserProfileSlice,
    listid: ListIDSlice,
  },
});
