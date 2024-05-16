import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface themeData {
  mode: "dark" | "light";
  isConnected: boolean;
}

const initialState: themeData = {
  mode: "light",
  isConnected: true,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.mode = action.payload;
    },
    setConnection: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});
export const { setTheme, setConnection } = themeSlice.actions;
export default themeSlice.reducer;
