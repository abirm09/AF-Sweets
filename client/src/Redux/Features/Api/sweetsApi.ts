import baseApi from "./baseApi";

const sweetApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNewSweet: builder.mutation({
      query: body => ({
        url: "/api/sweets/add-new-sweet",
        method: "POST",
        body,
      }),
    }),
    allSweets: builder.query({
      query: () => "/api/sweets/all-sweets-info",
    }),
  }),
});

export const { useAddNewSweetMutation, useAllSweetsQuery } = sweetApi;
