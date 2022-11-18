import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticles } from '../types.d';

const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  endpoints: (build) => ({
    getArticles: build.query<IArticles, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: '/articles',
        params: { offset: (page - 1) * limit, limit },
      }),
    }),
  }),
});

export default articlesApi;
