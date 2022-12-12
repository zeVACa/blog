export interface IUser {
  username: null | string;
  email: null | string;
  token: null | string;
  image?: null | string;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}

export interface IArticles {
  articles: IArticle[];
  articlesCount: number;
}
