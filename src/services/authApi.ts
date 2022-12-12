// import { IUser } from '../types.d';
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
  }),
});

export default authApi;
