import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../../Utils/utility";
const baseApi = createApi({
  reducerPath: "base",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: () => ({}),
});

export default baseApi;
