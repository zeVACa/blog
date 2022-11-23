import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import styles from './ArticleHeader.module.scss';
import Likes from '../Likes';

interface IProps {
  title: string;
  tagList: string[];
  authorImage: string;
  slug: string;
  authorUsername: string;
  createdAt: string;
}

function ArticleHeader({ title, tagList, authorImage, slug, authorUsername, createdAt }: IProps) {
  const [hasErrorOnImageLoad, setHasErrorOnImageLoad] = useState(false);

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.flexRow}>
          <Link className={styles.title} to={`/articles/${slug}`}>
            {title.length > 140 ? `${title.slice(0, 140)}...` : title}
          </Link>
          <Likes />
        </div>
        <div className={styles.tagsArea}>
          {tagList
            .filter((tag) => tag)
            .slice(0, 8)
            .map((tag) => (
              <span className={styles.tag} key={uuid()}>
                {tag.length > 20 ? `${tag.slice(0, 20)}...` : tag}
              </span>
            ))}
          {tagList.length > 8 && <span className={styles.tag}>...</span>}
        </div>
      </div>
      <div className={styles.userInfo}>
        <div>
          <div className={styles.userName}>{authorUsername}</div>
          <div className={styles.date}>{format(new Date(createdAt), 'PP')}</div>
        </div>
        <img
          src={
            hasErrorOnImageLoad
              ? 'https://static.productionready.io/images/smiley-cyrus.jpg'
              : authorImage
          }
          onError={() => {
            setHasErrorOnImageLoad(true);
          }}
          alt='avatar'
          className={styles.userAvatar}
        />
      </div>
    </div>
  );
}

export default ArticleHeader;
