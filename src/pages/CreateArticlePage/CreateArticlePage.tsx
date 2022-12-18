/* eslint-disable */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateArticleForm from '../../components/forms/CreateArticleForm';
import articlesApi from '../../services/articlesApi';
import { IArticleCreated } from '../../types';
import styles from './CreateArticlePage.module.scss';

function CreateArticlePage() {
  const [createArticleRequest, { data, isSuccess, error }] = articlesApi.useCreateArticleMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success('Article has created successfully');
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error('Article not created. Something went wrong!');
    }
  }, [error]);

  const onSubmitArticleHandler = (article: IArticleCreated) => {
    createArticleRequest(article);
  };

  return (
    <div className='container'>
      <div className={styles.article}>
        <h3 className={styles.title}>Create new article</h3>
        <CreateArticleForm onSubmitArticleHandler={onSubmitArticleHandler} />
      </div>
    </div>
  );
}

export default CreateArticlePage;
