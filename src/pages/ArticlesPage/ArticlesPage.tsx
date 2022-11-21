import { useState } from 'react';
import { Pagination } from 'antd';
import styles from './ArticlesPage.module.scss';
import ArticleCard from '../../components/ArticleCard';
import 'antd/dist/antd.min.css';
import articlesApi from '../../services/articlesApi';
import { IArticle } from '../../types.d';
import Spiner from '../../components/Spiner/Spiner';

function ArticlesPage() {
  const [page, setPage] = useState(1);
  const articlesLimit = 5;
  const { data, isLoading, isError } = articlesApi.useGetArticlesQuery({
    page,
    limit: articlesLimit,
  });

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        {isError && <h3>При загрузке данных произошла ошибка. Пожалуйста, обновите страницу</h3>}
        {isLoading ? (
          <Spiner />
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
