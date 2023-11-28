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
    addSale: builder.mutation({
      query: body => ({
        url: "/api/sales/add-sales",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddNewSweetMutation, useAllSweetsQuery, useAddSaleMutation } =
  sweetApi;
