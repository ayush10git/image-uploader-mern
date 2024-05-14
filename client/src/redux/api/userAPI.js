import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const server = "http://localhost:8000/api/v1";

export const userAPI = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/users/`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["users"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["users"],
    }),
    logout: builder.mutation({
      query: (accessToken) => ({
        url: "logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const getUser = async (accessToken) => {
  try {
    const { data } = await axios.get(`${server}/users/current-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  userAPI;
