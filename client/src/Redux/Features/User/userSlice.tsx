import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, isLoading: true };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: any, { payload }: PayloadAction) => {
      state.user = payload;
    },
    clearUser: (state: any) => {
      state.user = null;
    },
    toggleLoading: (state: any, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setUser, clearUser, toggleLoading } = userSlice.actions;

export default userSlice.reducer;
