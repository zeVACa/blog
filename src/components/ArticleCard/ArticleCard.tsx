import styles from './ArticleCard.module.scss';
import { IArticle } from '../../types.d';
import ArticleHeader from '../ArticleHeader';

interface IProps {
  article: IArticle;
}

function ArticleCard({ article }: IProps) {
  return (
    <div className={styles.articleCard}>
      <ArticleHeader
        title={article.title}
        tagList={article.tagList}
        authorImage={article.author.image}
        slug={article.slug}
        authorUsername={article.author.username}
        createdAt={article.createdAt}
      />
      <p className={styles.description}>
        {article.description.length > 300
          ? `${article.description.slice(0, 300)}...`
          : article.description}
      </p>
    </div>
  );
}

export default ArticleCard;
