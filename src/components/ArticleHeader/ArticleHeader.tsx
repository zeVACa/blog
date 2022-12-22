import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './ArticleHeader.module.scss';
import Likes from '../Likes';
import ERoutes from '../../routes';

interface IProps {
  title: string;
  tagList: string[];
  authorImage: string;
  slug: string;
  authorUsername: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
}

function ArticleHeader({
  title,
  tagList,
  authorImage,
  slug,
  authorUsername,
  createdAt,
  likesCount,
  isLiked,
}: IProps) {
  const [hasErrorOnImageLoad, setHasErrorOnImageLoad] = useState<boolean>(false);
  const { slug: slugParam } = useParams();

  const isFullArticlePage = !!slugParam;

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.flexRow}>
          <Link className={styles.title} to={`${ERoutes.ARTICLES}/${slug}`}>
            {!isFullArticlePage && title?.length > 110 ? `${title.slice(0, 110)}...` : title}
          </Link>
          <div className={styles.likesWrapper}>
            <Likes likesCount={likesCount} isLiked={isLiked} slug={slug} />
          </div>
        </div>
        <div className={styles.tagsArea}>
          {tagList
            .filter((tag) => tag !== '')
            .slice(0, !isFullArticlePage ? 8 : 100)
            .map((tag) => (
              <span className={styles.tag} key={Math.random()}>
                {!isFullArticlePage && tag?.length > 20 ? `${tag.slice(0, 20)}...` : tag}
              </span>
            ))}
          {!isFullArticlePage && tagList?.length > 8 && <span className={styles.tag}>...</span>}
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
