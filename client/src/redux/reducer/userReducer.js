import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: true,
  userReducer: undefined,
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
      userExist: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      },
      userNotExist: (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("user");
      },
    },
  });
  

export const { userExist, userNotExist } = userReducer.actions;
export default userReducer.reducer;
