import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
