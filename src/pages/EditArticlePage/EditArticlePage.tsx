/* eslint-disable */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateArticleForm from '../../components/forms/CreateArticleForm';
import Spinner from '../../components/Spinner';
import '../../index.scss';
import { useAppSelector } from '../../redux/store';
import articlesApi from '../../services/articlesApi';
import { IArticleCreated } from '../../types';
import styles from './EditArticlePage.module.scss';

function EditArticlePage() {
  const { slug } = useParams();
  const { data: fetchedArticleData, isLoading: isArticleLoading } = articlesApi.useGetArticleQuery({
    slug,
  });

  const { username } = useAppSelector((selector) => selector.user);

  const [
    editArticleRequest,
    { data, isSuccess: isArticleCreatedSuccessfully, error: editArticleError },
  ] = articlesApi.useCreateArticleMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isArticleCreatedSuccessfully && data) {
      toast.success('Article has edited successfully!');
      navigate('/');
    }
  }, [isArticleCreatedSuccessfully]);

  useEffect(() => {
    if (editArticleError) {
      toast.error('Article has not edited. Something went wrong!');
    }
  }, [editArticleError]);

  const onSubmitArticleHandler = (article: IArticleCreated) => {
    editArticleRequest(article);
  };

  if (isArticleLoading || !fetchedArticleData) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  if (username !== fetchedArticleData.article.author.username) {
    return (
      <div className={styles.accessDeniedMessage}>
        <p>Sorry, but you cannot edit other users' articles!</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className={styles.article}>
        <h3 className={styles.title}>Edit article</h3>
        <CreateArticleForm
          onSubmitArticleHandler={onSubmitArticleHandler}
          fetchedArticleData={{
            title: fetchedArticleData.article.title,
            description: fetchedArticleData.article.description,
            text: fetchedArticleData.article.body,
            tagList: fetchedArticleData.article.tagList.map((tag: string) => ({ name: tag })),
          }}
        />
      </div>
    </div>
  );
}

export default EditArticlePage;