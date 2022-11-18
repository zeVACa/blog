import { createSlice } from '@reduxjs/toolkit';
import { IArticle } from '../../types.d';

interface IState {
  data: IArticle[];
  articlesCount: number;
}

const initialState: IState = {
  data: [],
  articlesCount: 0,
};

interface IAction {
  type: string;
  payload: IArticle[];
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action: IAction) {
      state.data.push(...action.payload);
    },
  },
});

export const { setArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
