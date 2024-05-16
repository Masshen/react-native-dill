import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userData {
  current: any;
  profile: any;
  list: any[];
  all: any[];
  roles: string[];
  title: string;
}

const initialState: userData = {
  current: {},
  list: [],
  profile: {},
  roles: [],
  all: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.current = action.payload;
    },
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<any[]>) => {
      state.all = action.payload;
    },
    setUserRoles: (state, action: PayloadAction<any[]>) => {
      state.roles = action.payload;
    },
    setAppTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});
export const {
  setUser,
  setUserProfile,
  setUsers,
  setAppTitle,
  setUserRoles,
  setAllUsers,
} = userSlice.actions;
export default userSlice.reducer;
