import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import avatar from '../../images/avatar.png';

function Header() {
  return (
    <div className={styles.header}>
      <Link to='/' className={styles.brand}>
        Realworld Blog
      </Link>
      <div className={styles.right}>
        <button className={styles.createArticleButton} type='button'>
          Create article
        </button>
        <div className={styles.profile}>
          <span className={styles.profileName}>John Doe</span>
          <img src={avatar} alt='avatar' />
        </div>
        <button className={styles.logOutButton} type='button'>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
