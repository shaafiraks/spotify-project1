import { createSlice } from "@reduxjs/toolkit";

export const ListIDSlice = createSlice({
  name: "listid",
  initialState: {
    listIDValue: "",
  },
  reducers: {
    setListID: (state, action) => {
      state.listIDValue = action.payload;
    },
  },
});

export const { setListID } = ListIDSlice.actions;

export default ListIDSlice.reducer;
