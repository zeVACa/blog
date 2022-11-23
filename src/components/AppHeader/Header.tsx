import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import avatar from '../../images/avatar.png';

function Header() {
  const [isLogedIn] = useState<boolean>(false);
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
              <span className={styles.profileName}>John Doe</span>
              <img src={avatar} alt='avatar' />
            </div>
            <button className={styles.logOutButton} type='button'>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className={styles.signInButton}>
              Sign In
            </Link>
            <Link to='/register' className={styles.signUpButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
