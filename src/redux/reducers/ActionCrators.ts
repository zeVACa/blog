import { AppDispatch } from '../store';

const getArticles = (page: number) => async (dispatch: AppDispatch) => {
  const res = await fetch(`https://blog.kata.academy/api/articles?offset=${(page - 1) * 5}`);
  dispatch(res);
};

export default getArticles;
