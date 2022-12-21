/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/store';
import articlesApi from '../../services/articlesApi';
import styles from './Likes.module.scss';

interface IProps {
  likesCount: number;
  isLiked: boolean;
  slug: string;
}

function Likes({ likesCount, isLiked, slug }: IProps) {
  const [likeArticleRequest, { isError: isLikeRequestError }] =
    articlesApi.useLikeArticleMutation();
  const [removeLikeFromArticleRequest, { isError: isRemoveLikeRequestError }] =
    articlesApi.useRemoveLikeFromArticleMutation();

  const { username } = useAppSelector((selector) => selector.user);

  useEffect(() => {
    if (isLikeRequestError || isRemoveLikeRequestError) {
      toast.error('Like has not toggled. Something went wrong!');
    }
  }, [isLikeRequestError, isRemoveLikeRequestError]);

  const toggleLike = () => {
    if (!username) {
      toast.info('If you want to like, you need to be logged in.');
      return;
    }

    if (!isLiked) {
      likeArticleRequest(slug);
    } else {
      removeLikeFromArticleRequest(slug);
    }
  };

  return (
    <div className={styles.likes}>
      <label htmlFor={`likes-${slug}`} className={styles.iconWrapper}>
        <input
          type='checkbox'
          className={styles.realCheckbox}
          id={`likes-${slug}`}
          checked={isLiked && !!username}
          onChange={() => {}}
          disabled={!username}
        />
        <span className={styles.fakeCheckbox} onClick={toggleLike} onKeyDown={toggleLike} />
      </label>
      <span className={styles.likesCount}>{likesCount}</span>
    </div>
  );
}

export default Likes;
