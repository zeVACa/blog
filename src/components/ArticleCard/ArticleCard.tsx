import { Link } from 'react-router-dom';
import Likes from '../Likes';
import styles from './ArticleCard.module.scss';
import avatar from '../../images/avatar.png';

function ArticleCard() {
  return (
    <div className={styles.articleCard}>
      <div className={styles.header}>
        <div>
          <div className={styles.flexRow}>
            <Link className={styles.title} to='/'>
              Some article title
            </Link>
            <Likes />
          </div>
          <div className={styles.tagsArea}>
            <span className={styles.tag}>tag 1</span>
            <span className={styles.tag}>tag 2</span>
            <span className={styles.tag}>tag 3</span>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
          </p>
        </div>
        <div className={styles.userInfo}>
          <div>
            <div className={styles.userName}>John Doe</div>
            <div className={styles.date}>March 5, 2020 </div>
          </div>
          <img src={avatar} alt='avatar' className={styles.userAvatar} />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
