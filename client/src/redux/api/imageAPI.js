import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const server = "http://localhost:8000/api/v1";

export const imageAPI = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/images/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["images"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["images"],
    }),
    viewImage: builder.mutation({
      query: (imageId) => ({
        url: `view/${imageId}`,
        method: "POST",
      }),
      invalidatesTags: ["images"],
    }),
    deleteImage: builder.mutation({
      query: (imageId) => ({
        url: `delete/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["images"],
    }),
  }),
});

export const getAllImages = async () => {
  try {
    const { data } = await axios.get(`${server}/images/get-all`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getMyImages = async (accessToken) => {
  try {
    const { data } = await axios.get(`${server}/images/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const {
  useUploadImageMutation,
  useGetAllImagesQuery,
  useGetMyImagesQuery,
  useViewImageMutation,
  useDeleteImageMutation,
} = imageAPI;
