import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Likes from '../Likes';
import styles from './ArticleCard.module.scss';
import { IArticle } from '../../types.d';

interface IProps {
  article: IArticle;
}

function ArticleCard({ article }: IProps) {
  const [hasErrorOnImageLoad, setHasErrorOnImageLoad] = useState(false);
  return (
    <div className={styles.articleCard}>
      <div className={styles.header}>
        <div>
          <div className={styles.flexRow}>
            <Link className={styles.title} to='/'>
              {article.title.length > 140 ? `${article.title.slice(0, 140)}...` : article.title}
            </Link>
            <Likes />
          </div>
          <div className={styles.tagsArea}>
            {article.tagList
              .filter((tag) => tag)
              .slice(0, 8)
              .map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag.length > 20 ? `${tag.slice(0, 20)}...` : tag}
                </span>
              ))}
            {article.tagList.length > 8 && <span className={styles.tag}>...</span>}
          </div>
          <p className={styles.description}>
            {article.description.length > 300
              ? `${article.description.slice(0, 300)}...`
              : article.description}
          </p>
        </div>
        <div className={styles.userInfo}>
          <div>
            <div className={styles.userName}>{article.author.username}</div>
            <div className={styles.date}>{format(new Date(article.createdAt), 'PP')}</div>
          </div>
          <img
            src={
              hasErrorOnImageLoad
                ? 'https://static.productionready.io/images/smiley-cyrus.jpg'
                : article.author.image
            }
            onError={() => {
              setHasErrorOnImageLoad(true);
            }}
            alt='avatar'
            className={styles.userAvatar}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
