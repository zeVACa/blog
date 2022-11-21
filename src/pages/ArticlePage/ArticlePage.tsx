import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import styles from './ArticlePage.module.scss';
import ArticleHeader from '../../components/ArticleHeader';
import Spiner from '../../components/Spiner';
import articlesApi from '../../services/articlesApi';

function ArticlePage() {
  const { id } = useParams();
  const { data, isLoading } = articlesApi.useGetArticleQuery({ slug: id });

  const { article } = data ?? {};

  return (
    <div className='container'>
      {isLoading && <Spiner />}
      {!isLoading && article && (
        <div className={styles.article}>
          <ArticleHeader
            title={article.title}
            tagList={article.tagList}
            authorImage={article.author.username}
            slug={article.slug}
            authorUsername={article.author.username}
            createdAt={article.createdAt}
          />
          <p className={styles.shortDescription}>{article.description}</p>
          <div className={styles.fullDescriptionBody}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
