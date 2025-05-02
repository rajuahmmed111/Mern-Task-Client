/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // logout
    logout: builder.mutation({
      query: () => {
        return {
          url: `/auth/logout`,
          method: "POST",
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // forgot password
    forgottenPassword: builder.mutation({
      query: (data: any) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (data: any) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // change password
    changePassword: builder.mutation({
      query: (data: any) => {
        return {
          url: `/auth/change-password`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgottenPasswordMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = authApi;
