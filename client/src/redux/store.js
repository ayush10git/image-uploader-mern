import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { imageAPI } from "./api/imageAPI";

const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [imageAPI.reducerPath]: imageAPI.reducer
  },
  preloadedState: {
    [userReducer.name]: { user: loadUserFromStorage(), loading: false },
  },
  middleware: (mid) => mid().concat(userAPI.middleware, imageAPI.middleware),
});
