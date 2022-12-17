/* eslint-disable */

import CreateArticleForm from '../../components/forms/CreateArticleForm';
import styles from './CreateArticlePage.module.scss';

function CreateArticlePage() {
  return (
    <div className='container'>
      <div className={styles.article}>
        <h3 className={styles.title}>Create new article</h3>
        <CreateArticleForm />
      </div>
    </div>
  );
}

export default CreateArticlePage;
