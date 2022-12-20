/* eslint-disable */

import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { toast } from 'react-toastify';
import classNames from 'classnames';
import styles from './ArticlePage.module.scss';
import ArticleHeader from '../../components/ArticleHeader';
import Spinner from '../../components/Spinner';
import articlesApi from '../../services/articlesApi';
import { useAppSelector } from '../../redux/store';
import { Popconfirm } from 'antd';

function ArticlePage() {
  const { slug } = useParams();
  const { data, isLoading } = articlesApi.useGetArticleQuery({ slug });
  const navigate = useNavigate();
  const [deleteArticleRequest, { isSuccess, error }] = articlesApi.useDeleteArticleMutation();

  const { username } = useAppSelector((selector) => selector.user);

  const { article } = data ?? {};

  useEffect(() => {
    if (isSuccess && data) {
      console.log('isSuccess', isSuccess);
      console.log('data', data);
      toast.success('Article has deleted successfully!');
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong! Article has not deleted.');
    }
  }, [error]);

  const onDeleteArticle = () => {
    if (slug) deleteArticleRequest(slug);
  };

  return (
    <div className='container'>
      {isLoading && <Spinner />}
      {!isLoading && article && (
        <div className={styles.article}>
          <ArticleHeader
            title={article.title}
            tagList={article.tagList}
            authorImage={article.author.image}
            slug={article.slug}
            authorUsername={article.author.username}
            createdAt={article.createdAt}
          />
          <div className={styles.descriptionButtonsRow}>
            <p className={styles.shortDescription}>{article.description}</p>
            {article.author.username === username && (
              <div>
                <Popconfirm
                  title='Are you sure to delete this article?'
                  okText='Yes'
                  cancelText='No'
                  placement='right'
                  onConfirm={() => onDeleteArticle()}
                >
                  <input
                    type='button'
                    value='Delete'
                    className={classNames(styles.button, styles.deleteButton)}
                  />
                </Popconfirm>
                <Link to={`/articles/${slug}/edit`}>
                  <input
                    type='button'
                    value='Edit'
                    className={classNames(styles.button, styles.editButton)}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className={styles.fullDescriptionBody}>
            <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
