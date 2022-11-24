import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import avatar from '../../images/avatar.png';

function Header() {
  const [isLogedIn] = useState<boolean>(true);
  return (
    <div className={styles.header}>
      <Link to='/' className={styles.brand}>
        Realworld Blog
      </Link>
      <div className={styles.right}>
        {isLogedIn ? (
          <>
            <Link className={styles.createArticleButton} to='/create-article'>
              Create article
            </Link>
            <div className={styles.profile}>
              <Link className={styles.profileName} to='/profile'>
                John Doe
                <img src={avatar} alt='avatar' className={styles.avatar} />
              </Link>
            </div>
            <button className={styles.logOutButton} type='button'>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to='/sign-in' className={styles.signInButton}>
              Sign In
            </Link>
            <Link to='/sign-up' className={styles.signUpButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
