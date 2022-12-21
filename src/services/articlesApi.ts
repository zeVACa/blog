import { IArticle, IArticles, IArticleCreated } from '../types.d';
import { getTokenFromLocalStorage } from '../utils/tokenApi';
import baseApi from './baseApi';

const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<IArticles, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
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
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        url: `articles/${slug}`,
      }),
      providesTags: ['ArticleDetails'],
    }),
    createArticle: build.mutation<{ article: IArticle }, IArticleCreated>({
      query: (body) => ({
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        method: 'post',
        url: '/articles',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    editArticle: build.mutation<{ article: IArticle }, { body: IArticleCreated; slug: string }>({
      query: ({ body, slug }) => ({
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        method: 'put',
        url: `/articles/${slug}`,
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
    deleteArticle: build.mutation<void, string>({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        method: 'delete',
        url: `/articles/${slug}`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
    likeArticle: build.mutation<{ article: IArticle }, string>({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        method: 'post',
        url: `/articles/${slug}/favorite`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
    removeLikeFromArticle: build.mutation<{ article: IArticle }, string>({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        method: 'delete',
        url: `/articles/${slug}/favorite`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
  }),
});

export default articlesApi;
