// import { IUser } from '../types.d';
import { getTokenFromLocalStorage } from '../utils/tokenApi';
import baseApi from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { user: { username: string; email: string; token: string; image: string } },
      { user: { email: string; password: string } }
    >({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    register: build.mutation<
      { user: { username: string; email: string; token: string } },
      {
        user: {
          username: string;
          email: string;
          password: string;
        };
      }
    >({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: build.query<
      { user: { username: string; email: string; token: string; image: string } },
      null
    >({
      query: () => ({
        url: '/user',
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }),
    }),
  }),
});

export default authApi;
