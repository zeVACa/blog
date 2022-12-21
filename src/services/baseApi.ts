import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles', 'User', 'ArticleDetails'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  endpoints: () => ({}),
});

export default baseApi;
