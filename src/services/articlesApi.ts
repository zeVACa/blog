import { IArticle, IArticles, IArticleCreated } from '../types.d';
import { getTokenFromLocalStorage } from '../utils/tokenApi';
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
    createArticle: build.mutation<{ article: IArticle }, IArticleCreated>({
      query: (body) => ({
        method: 'post',
        url: '/articles',
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    deleteArticle: build.mutation<void, string>({
      query: (slug) => ({
        method: 'delete',
        url: `/articles/${slug}`,
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    editArticle: build.mutation<void, string>({
      query: (slug) => ({
        method: 'put',
        url: `/articles/${slug}`,
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
});

export default articlesApi;
