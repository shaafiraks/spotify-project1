import { createSlice } from "@reduxjs/toolkit";

export const ListIDSlice = createSlice({
  name: "listid",
  initialState: {
    setSearchValue: "",
  },
  reducers: {
    setListID: (state, action) => {
      state.setSliceIDValue = action.payload;
    },
  },
});

export const { setListID } = ListIDSlice.actions;

export default ListIDSlice.reducer;
