export interface IUser {
  name: string;
  surname: string;
  email: string;
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
