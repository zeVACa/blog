import { configureStore } from '@reduxjs/toolkit';
import articlesApi from '../services/articlesApi';
import userSlice from './reducers/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
