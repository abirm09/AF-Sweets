import baseApi from "../Api/baseApi";

const userAPi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: (data: any) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: body => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
    }),
    profile: builder.query({
      query: () => "/api/user/profile",
    }),
    logout: builder.mutation({
      query: body => ({
        url: "/api/user/logout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useProfileQuery,
  useLogoutMutation,
} = userAPi;
