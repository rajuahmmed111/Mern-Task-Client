/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";


const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data: any) => {
        return {
          url: `users/create`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
