/* eslint-disable */

import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './ArticlesPage.module.scss';
import ArticleCard from '../../components/ArticleCard';
import 'antd/dist/antd.min.css';
import articlesApi from '../../services/articlesApi';
import { IArticle } from '../../types.d';
import Spinner from '../../components/Spinner/Spinner';
import ERoutes from '../../routes';

function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const articlesLimit = 5;
  const { data, isLoading, isError } = articlesApi.useGetArticlesQuery({
    page,
    limit: articlesLimit,
  });

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${ERoutes.ARTICLES}?page=${page}`);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        {isError && <h3>При загрузке данных произошла ошибка. Пожалуйста, обновите страницу</h3>}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data?.articles.map((article: IArticle) => (
              <ArticleCard
                article={article}
                key={`${article.author} ${article.updatedAt} ${
                  article.slug
                } ${article.tagList.join()}`}
              />
            ))}
            {data?.articles?.length && (
              <div className={styles.flexCenter}>
                <Pagination
                  pageSize={articlesLimit}
                  current={page}
                  showSizeChanger={false}
                  total={data?.articlesCount}
                  onChange={(newPageNumber) => {
                    setPage(newPageNumber);

                    const params = new URLSearchParams({
                      page: newPageNumber,
                    } as any);

                    setSearchParams(params);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ArticlesPage;
