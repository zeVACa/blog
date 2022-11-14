import styles from './ArticlesPage.module.scss';
import ArticleCard from '../../components/ArticleCard';

function ArticlesPage() {
  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
}

export default ArticlesPage;
