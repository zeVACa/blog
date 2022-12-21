// import { IUser } from '../types.d';
import { getTokenFromLocalStorage } from '../utils/tokenApi';
import baseApi from './baseApi';

interface IUserResponse {
  user: { username: string; email: string; image: string; token: string };
}

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IUserResponse, { user: { email: string; password: string } }>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'User'],
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
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'User'],
    }),
    getUser: build.query<IUserResponse, null>({
      query: () => ({
        url: '/user',
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }),
    }),
    editUser: build.mutation<
      IUserResponse,
      { user: { username: string; email: string; image: string; password: string } }
    >({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
});

export default userApi;
