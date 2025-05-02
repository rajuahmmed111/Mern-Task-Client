/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    // credentials: "include",
    // prepareHeaders: (headers: any) => {
    //   // Check if we're in the browser environment before accessing localStorage
    //   if (typeof window !== "undefined") {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //       headers.set("authorization", JSON.parse(token));
    //     }
    //   } else {
    //     console.log("Running on the server; localStorage not accessible");
    //   }
    //   return headers;
    // },
  }),
  endpoints: () => ({}),
  tagTypes: ["Users", "Auth"],
});
