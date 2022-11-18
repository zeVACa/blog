import { useState } from 'react';
import { Pagination } from 'antd';
import styles from './ArticlesPage.module.scss';
import ArticleCard from '../../components/ArticleCard';
import 'antd/dist/antd.min.css';
import articlesApi from '../../services/articlesApi';
import { IArticle } from '../../types.d';

/* eslint-disable */

function ArticlesPage() {
  const [page, setPage] = useState(1);
  const articlesLimit = 5;
  const { data, isLoading } = articlesApi.useGetArticlesQuery({ page, limit: articlesLimit });

  console.log(page);
  console.log('data', data?.articles);

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            <div>
              {data?.articles.map((article: IArticle) => (
                <ArticleCard
                  article={article}
                  key={`${article.author} ${article.updatedAt} ${article.slug}`}
                />
              ))}
            </div>
            <Pagination
              pageSize={articlesLimit}
              current={page}
              showSizeChanger={false}
              total={data?.articlesCount}
              onChange={(page) => setPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ArticlesPage;
