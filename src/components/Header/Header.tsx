import styles from './Header.module.scss';
import avatar from '../../images/avatar.png';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.brand}>Realworld Blog</div>
      <div className={styles.right}>
        <button className={styles.createArticleButton}>Create article</button>
        <div className={styles.profile}>
          <span className={styles.profileName}>John Doe</span>
          <img src={avatar} alt='avatar' />
        </div>
        <button className={styles.logOutButton}>Log Out</button>
      </div>
    </div>
  );
};

export default Header;
