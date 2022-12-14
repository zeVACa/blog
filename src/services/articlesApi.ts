import { IArticle, IArticles } from '../types.d';
import baseApi from './baseApi';

const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<IArticles, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: '/articles',
        params: { offset: (page - 1) * limit, limit },
      }),
      providesTags: (res) =>
        res?.articles
          ? [
              ...res.articles.map(({ slug }) => ({
                type: 'Articles' as const,
                id: slug,
              })),
              { type: 'Articles', id: 'LIST' },
            ]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticle: build.query<{ article: IArticle }, { slug: string | undefined }>({
      query: ({ slug }) => ({
        url: `articles/${slug}`,
      }),
    }),
  }),
});

export default articlesApi;
